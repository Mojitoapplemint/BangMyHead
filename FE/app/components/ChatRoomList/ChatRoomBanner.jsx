import React , {useState} from 'react';
import { StyleSheet, View , Text, Button} from 'react-native';
import ChatRoomListHeader from './ChatRoomListHeader';


/**
 * ChatRoomList에서 보여질 배너들; 클릭하면 대응하는 ChatRoom으로 이동동
 * @param {title: 타이틀
 *         lastAccess: 마지막으로 접속한 시간
 *         numUnViewed: 읽지않은 메세지 개수수} props
 * @returns 
 */
function ChatRoomBanner(props){
    return (
    <View style={styles.bannerContainer}>
        <View>
            <View ><Text style={styles.title}>{props.title}</Text></View>
            <View><Text>{props.lastAccess}</Text></View>
        </View>
        <View style={styles.unViewed}>
            <Text style={styles.numUnViewed}>{props.numUnViewed}</Text>
        </View>
    </View>
    );

}

    const styles = StyleSheet.create({
        title:{
            fontSize:20
        },
        bannerContainer:{
            flexDirection:"row",
            justifyContent:"space-between",
            alignItems:"center"
        },
        unViewed:{
            height:30,
            width:30,
            backgroundColor:"black",
            borderRadius:`50%`,
            justifyContent:"center",
            alignItems:"center"
        },
        numUnViewed:{
            color:"white",
            fontSize:20,
        }
    })

export default ChatRoomBanner;