import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform} from 'react-native';
import React from "react";
import ChatRoomList from './ChatRoomList';
import ChatRoomListHeader from './ChatRoomListHeader';

function Home() {
    return (
    <SafeAreaView style={styles.homeContainer}>
      <View style={styles.container}>
          <View style={styles.header}><ChatRoomListHeader /></View>
          <View style={styles.lists}><ChatRoomList /></View>
          <View style={styles.footer}></View>
      </View>
    </SafeAreaView>);
}

//<ChatListHeader style={styles.header}/>
const styles = StyleSheet.create({
    homeContainer:{
        flex:1,
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    container:{
            flex:1,
        },
    header:{
        flex:1,
        justifyContent:"flex-end",
        backgroundColor:"#B6B09F"
    },
    lists:{
        backgroundColor:"#F2F2F2",
        flex:9
    },
    footer:{
        backgroundColor:"#B6B09F",
        flex:1
    }

})

export default Home;

