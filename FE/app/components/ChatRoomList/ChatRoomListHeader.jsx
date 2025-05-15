import React from 'react';
import { StyleSheet, View , Text, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';


function ChatRoomListHeader(){
    return (
    <View style={styles.header}>
        <View>
            <Text style={styles.chat}>Chat</Text>
        </View>
        <View style={styles.control}>
            <TouchableOpacity style={styles.button}><Icon name="plus" size={30} color="white"/></TouchableOpacity>
            <TouchableOpacity style={styles.button}><AntDesign name="smileo" size={30} color="white"/></TouchableOpacity>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    header:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:20,
        paddingTop:0
    },
    control:{
        alignSelf:"center",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        backgroundColor: '#000000', // 버튼 배경색상 추가
        height:40,
        width:40,
        borderRadius: 10,
        alignItems:"center",
        justifyContent:"center",
        marginLeft:10
    },
    chat:{
        fontSize:20,
        fontWeight:500,
    color:"white"}

})

export default ChatRoomListHeader;