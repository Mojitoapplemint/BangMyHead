const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true;

const nameForm = document.getElementById("name");

nameForm.addEventListener("submit", function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = nameForm.querySelector("input");
  const nickname = input.value.trim();
  if (nickname !== "") {
    socket.emit("nickname", nickname);
  }
});

let roomName;

function addMessage(message) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");
  li.innerText = message;
  ul.appendChild(li);
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName}`;
  const msgForm = room.querySelector("#msg");
  msgForm.addEventListener("submit", handleMessageSubmit);
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("#msg input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function handleRoomSubmit(event) {
  event.preventDefault();

  const nicknameInput = nameForm.querySelector("input");
  const nickname = nicknameInput.value.trim();
  const input = form.querySelector("input");
  const room = input.value.trim();

  if (!nickname || !room) {
    alert("닉네임과 방 이름을 모두 입력해주세요.");
    return;
  }

  // nickname 등록 → 완료 후 enter_room 실행
  socket.emit("nickname", nickname, () => {
    socket.emit("enter_room", room, showRoom);
    roomName = room;
    input.value = "";
  });
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${user} arrived!`);
});

socket.on("bye", (left, newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
  addMessage(`${left} left!`);
});

socket.on("new_message", addMessage);

socket.on("room_init", (rooms) => {
  const roomList = welcome.querySelector("ul");
  if (rooms.length === 0) return;
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

socket.on("room_change", (rooms) => {
  const roomList = welcome.querySelector("ul");
  roomList.innerHTML = ""; // ✅ 기존 방 목록 초기화
  if (rooms.length === 0) return; // ✅ 방이 없을 경우 처리
  rooms.forEach((room) => {
    const li = document.createElement("li");
    li.innerText = room;
    roomList.append(li);
  });
});

socket.on("chat_history", (messages) => {
  messages.forEach((msg) => {
    addMessage(`${msg.sender_name}: ${msg.content}`);
  });
});

socket.on("room_user_count", (newCount) => {
  const h3 = room.querySelector("h3");
  h3.innerText = `Room ${roomName} (${newCount})`;
});
