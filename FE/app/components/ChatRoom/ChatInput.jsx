import React, {useState} from 'react';
import { StyleSheet, View , Text, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Input} from 'react-native';
import ChatRoom from './ChatRoom';
import Chat from "./ChatRoom/Chat";

/**
 * 
 * @param props = 
 * @returns 
 */
function ChatRoomInput(props) {
    const [userInput, setUserInput] = useState("");

    const onChangeText = (inputText) => {
        setUserInput(inputText);
    };

    function sendMessage(){
        
        //TODO 1: Send this to Server
        
        
        
        //TODO 2: Send this to ChatRoom to print
        const message = {
            content: userInput,
            time: new Date().toLocaleString(),
            isMyChat: true
        }

        props.addMessage(message);

        setUserInput("");
    }
    
    return (
        <View style={styles.roomContainer}>
        <TextInput
            onChangeText={onChangeText}
            value={userInput}
            placeholder="Type Here..."
            style={styles.input}
            onSubmitEditing={sendMessage}
        />
        </View>
);}

const styles = StyleSheet.create({
    roomContainer:{
        flex:1,
        backgroundColor:"#EAE4D5",
        width:"80%",
        alignSelf:"center",
        borderRadius:10,
    },
    input:{
        paddingHorizontal: 8,
    }
});

export default ChatRoomInput;