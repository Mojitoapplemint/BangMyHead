import React from 'react';
import { StyleSheet, View , Text} from 'react-native';
/**
 * @param {*} props 
 * @returns 
 */
function Chat(props) {
    console.log(props)

    return(
        <View style={{...getChatContainerStyle()}}>
            <View style={{...getChatBoxStyle(), ...styles.chatBox, }}>
                <Text style={styles.text}>{props.content}</Text>
                {/* <Text style={styles.isViewed}>{props.isViewed}</Text> */}
            </View>
                <Text className="" style={{...styles.time, alignSelf:props.isMyChat ? "flex-start":"flex-end"}}>{props.time}</Text>
        </View>
    );

    function getChatBoxStyle(){
        return {
            paddingHorizontal:'3%',
            paddingVertical:'2%',
            backgroundColor: props.isMyChat ? "#B6B09F" : "#222831",
            
            minWidth:'20%',
            borderTopLeftRadius:props.isMyChat ? 10 :0,
            borderBottomLeftRadius:props.isMyChat ? 10:0,
            borderTopRightRadius:props.isMyChat ? 0:10,
            borderBottomRightRadius:props.isMyChat ? 0:10,        
        }
    }

    function getChatContainerStyle(){
        return{
            alignSelf: props.isMyChat ? "flex-end": "flex-start", 
            marginBottom:'7%', 
            maxWidth:'80%', 
            marginHorizontal:'5%', 
            alignItems:"flex-end"
    }
    
}}

const styles = StyleSheet.create({
    chatBox:{
    }, 
    text:{
        color:"white",
        textShadowColor:"black",
        textShadowRadius: 2,
        fontSize:15,
        
    },
    time:{
        fontSize:10,
        marginTop:3,
        marginHorizontal:7
    },
    isViewed:{

    }
});

export default Chat;