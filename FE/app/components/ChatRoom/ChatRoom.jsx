import React, {useState} from 'react';
import { StyleSheet, FlatList,  View , TouchableOpacity, SafeAreaView, Platform, StatusBar} from 'react-native';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomInput from "./ChatRoomInput";
import Chat from "./Chat"
import SystemMessage from './SystemMessage';


/**
 * 실제 채팅창
 * @returns
 */
function ChatRoom() {
    const [messages, setMessage] = useState([]);
    
    function addMessage(data){
        setMessage((prevMessages)=>{
            const message = {...data, index:prevMessages.length}
            
            return [...prevMessages, <Chat key={message.index} content={message.content} time = {message.time} isMyChat={message.isMyChat}/>];
        })
        console.log(messages)
    }

    return (<SafeAreaView style={styles.chatRoomContainer}>

        <View style={{...styles.horizontalRule, flex:1}}>
            <ChatRoomHeader/>
        </View>
        <View style={{flex:9}}>
            <FlatList data={messages} renderItem={({item})=>(<View>{item}</View>)}
            />
            <SystemMessage></SystemMessage>
        </View>
        <View style={{flex:1, justifyContent:"flex-end"}}>
            <ChatRoomInput style={{flex:1}} addMessage = {addMessage}/>
        </View>
        
    </SafeAreaView>
)
;}

const styles = StyleSheet.create({
    chatRoomContainer:{
        flex:1,
        justifyContent:"space-between",
        backgroundColor: "F2F2F2",
        paddingBottom:20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        
    },
    horizontalRule: {
        borderBottomColor: '#aaa',
        borderBottomWidth: 2,
        margin: 10,
        marginHorizontal: 20,
        borderRadius:0
        
    },
});


export default ChatRoom;