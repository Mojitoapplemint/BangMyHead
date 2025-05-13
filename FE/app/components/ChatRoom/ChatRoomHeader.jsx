import React from 'react';
import { StyleSheet, View , Text, Button, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

function ChatRoomHeader(props){
    return(
        <View style={{...styles.header}}>
            <View style={{flex:1, flexDirection:"row", alignItems:"center"}}>
                <TouchableOpacity style={styles.backButton}><Icon name="left" size={30} color="black"/></TouchableOpacity>
                <Text style={styles.title}>Chat Title</Text>
            </View>
            <View style={{flex:1, flexDirection:"row", justifyContent:"flex-end", alignItems:"center"}}>
                <TouchableOpacity style={styles.button}><Icon name="plus" size={30} color="white"/></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Entypo name="dots-three-vertical" size={30} color="white"/></TouchableOpacity>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        flexDirection: "row",
        flex:1,
        paddingTop:20,
        alignItems:"center",
        justifyContent:"space-between"
        
    },
    title:{
        fontSize:20,
    },
    backButton:{
        height:40,
        width:40,
        borderRadius: 10,
        alignItems:"center",
        justifyContent:"center",
    },
    button:{
        backgroundColor: '#000000',
        height:40,
        width:40,
        borderRadius: 10,
        alignItems:"center",
        justifyContent:"center",
        marginLeft:10
    },
});

export default ChatRoomHeader;