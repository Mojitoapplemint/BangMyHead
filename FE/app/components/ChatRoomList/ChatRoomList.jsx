import React , {useState} from 'react';
import { StyleSheet, View , Text, Button, FlatList, TouchableOpacity} from 'react-native';
import ChatRoomListHeader from './ChatRoomListHeader';
import ChatRoomBanner from './ChatRoomBanner';

function ChatRoomList(){
    const [chats, setChats] = useState([
        <ChatRoomBanner title="Test Chat" lastTime="1 day ago" numUnViewed="2"/>,
        <ChatRoomBanner title="Test Chat" lastTime="1 day ago" numUnViewed="2"/>,
        <ChatRoomBanner title="Test Chat" lastTime="1 day ago" numUnViewed="2"/>,
        <ChatRoomBanner title="Test Chat" lastTime="1 day ago" numUnViewed="2"/>,
        <ChatRoomBanner title="Test Chat" lastTime="1 day ago" numUnViewed="2"/>,
        <ChatRoomBanner title="Test Chat" lastTime="1 day ago" numUnViewed="2"/>,
        <ChatRoomBanner title="Test Chat" lastTime="1 day ago" numUnViewed="2"/>,
        <ChatRoomBanner title="Test Chat" lastTime="1 day ago" numUnViewed="2"/>,
    ]);


    function addNewChat(){

    }

    return (
        <View style={styles.listContainer}>
        <FlatList
            data={chats}
            renderItem={({item})=>(<TouchableOpacity style={styles.banner}>{item}</TouchableOpacity>)}
        />
    </View>
    );
}

const styles = StyleSheet.create({
    banner:{
        backgroundColor:"white",
        flex:1,
        padding:30,
        marginBottom:10,
        borderRadius:10,
    },
    listContainer:{
        padding:10,
        
    }
})

export default ChatRoomList;