import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from "react";
import ChatRoomList from './ChatRoomList/ChatRoomList';
import ChatRoomListHeader from './ChatRoomList/ChatRoomListHeader';

function App() {
    return (
    <View style={{flex:1}}>
      <StatusBar style="light" />
      <View style={styles.container}>
          <View style={styles.header}><ChatRoomListHeader /></View>
          <View style={styles.lists}><ChatRoomList /></View>
          <View style={styles.footer}></View>
      </View>
    </View>);
}

//<ChatListHeader style={styles.header}/>
const styles = StyleSheet.create({
    container:{
    flex:1,
    },
    header:{
        paddingTop:50,
        flex:1,
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

export default App;

