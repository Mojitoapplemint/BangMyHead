import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { instrument } from "@socket.io/admin-ui";
import db from "./utils/db.js";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve();
const app = express();

try {
  const connection = await db.getConnection();
  console.log("✅ MySQL 연결 성공!");
  connection.release();
} catch (err) {
  console.error("❌ MySQL 연결 실패:", err);
}

app.set("view engine", "pug");
app.use("/public", express.static(__dirname + "/src/public"));
app.set("views", __dirname + "/src/views");
app.get("/", (req, res) => res.render("home"));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io;

  const publicRooms = [];
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key);
    }
  });
  return publicRooms;
}

function countRoom(roomName) {
  return io.sockets.adapter.rooms.get(roomName)?.size;
}

io.on("connection", (socket) => {
  socket["nickname"] = "Anon";

  console.log(socket.id);

  socket.onAny((event) => {
    console.log(io.sockets.adapter);
    console.log(`Socket Event: ${event}`);
  });

  socket.emit("room_init", publicRooms());

  socket.on("enter_room", async (roomName, showRoom) => {
    try {
      // 1. 방 존재 여부 확인
      const [existing] = await db.query(
        "SELECT * FROM chat_rooms WHERE room_id = ?",
        [roomName]
      );
      if (existing.length === 0) {
        // 2. 없다면 방 생성
        await db.query("INSERT INTO chat_rooms (room_id) VALUES (?)", [
          roomName,
        ]);
      }

      // 3. 방 입장 처리
      socket.join(roomName);
      console.log(`[JOIN] ${socket.nickname} joined ${roomName}`);
      console.log(
        "📦 현재 방 구성원:",
        Array.from(io.sockets.adapter.rooms.get(roomName) || [])
      );
      console.log("🧾 내 소켓 ID:", socket.id);
      showRoom();

      // 4. 이전 메시지 불러오기
      const [messages] = await db.query(
        "SELECT sender_name, content, created_at FROM messages WHERE room_id = ? ORDER BY created_at ASC",
        [roomName]
      );
      socket.emit("chat_history", messages); // 클라이언트에서 이걸 받아 메시지 렌더링

      // 5. 입장 알림
      socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
      socket.emit("room_user_count", countRoom(roomName));

      await db.query(
        `INSERT INTO messages (room_id, sender_id, sender_name, content, message_type)
   VALUES (?, ?, ?, ?, 'system')`,
        [
          roomName,
          socket.userId ?? 0,
          socket.nickname,
          `${socket.nickname} entered the room.`,
        ]
      );

      io.sockets.emit("room_change", publicRooms());
    } catch (err) {
      console.error("❌ enter_room 처리 중 오류:", err);
    }
  });

  socket.on("disconnecting", async () => {
    try {
      for (const room of socket.rooms) {
        if (room === socket.id) continue; // 자기 개인 방은 제외

        // 1. 다른 유저에게 알림
        socket.to(room).emit("bye", socket.nickname, countRoom(room) - 1);

        // 2. DB에 system 메시지 저장
        await db.query(
          `INSERT INTO messages (room_id, sender_id, sender_name, content, message_type) VALUES (?, ?, ?, ?, 'system')`,
          [
            room,
            socket.userId ?? 0,
            socket.nickname,
            `${socket.nickname} left the room.`,
          ]
        );
      }
    } catch (err) {
      console.error("❌ bye 메시지 저장 중 오류:", err);
    }
  });

  socket.on("new_message", async (msg, roomName, done) => {
    try {
      // 메시지 DB에 저장
      await db.query(
        `INSERT INTO messages (room_id, sender_id, sender_name, content) VALUES (?, ?, ?, ?)`,
        [roomName, socket.userId ?? 0, socket.nickname, msg]
      );

      // 메시지 전송
      socket.to(roomName).emit("new_message", `${socket.nickname}: ${msg}`);
      done();
    } catch (err) {
      console.error("❌ 메시지 저장 중 오류:", err);
    }
  });

  socket.on("nickname", async (nickname, callback) => {
    socket.nickname = nickname;

    // const [rows] = await db.query("SELECT id FROM users WHERE nickname = ?", [nickname]);
    // if (rows.length > 0) {
    //   socket.userId = rows[0].id;
    // }

    if (callback) callback(); // nickname 설정 완료됨 → enter_room 실행 가능
  });

  socket.on("disconnect", () => {
    io.sockets.emit("room_change", publicRooms());
  });
});

const handleListen = () => console.log("Listening on http://localhost:3000");
server.listen(3000, handleListen);
