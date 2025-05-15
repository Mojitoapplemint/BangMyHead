import React, {useState, useEffect} from "react";
import {View, SafeAreaView, StyleSheet, Text, Platform, StatusBar, TextInput, Button} from "react-native";


function Login({navigation}){


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isAuthenticated, setAuthenticated] = useState(false);
    
    function validateForm() {
        let errors = {};

        // Validate email field
        if (!email) {
            errors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = 'Email is invalid.';
        }

        // Validate password field
        if (!password) {
            errors.password = 'Password is required.';
        } else if (password.length < 6) {
            errors.password = 'Password must be at least 6 characters.';
        }

        //TODO Ask Server to check email and password

        // Set the errors and update form validity
        setErrors(errors);
        setAuthenticated(Object.keys(errors).length === 0);
        setEmail("");
        setPassword("");
        
        return isAuthenticated
    };

    return (<SafeAreaView style={styles.loginContainer}>
        {/* <Button onPress={(isAuthenticated)=>{ isAuthenticated && navigation.navigate("Home")}} title="Login"/> */}
        <View style = {styles.welcomeBox}><Text style={styles.welcomeMessage}>Welcome!</Text></View>
        <View style = {{flex:1}}>
            <TextInput value={email} placeholder="Email" onChange={setEmail} style={styles.input}></TextInput>
            <TextInput value={password} placeholder="Passwod" onChange={setPassword} style={styles.input}></TextInput>
        </View>
        <View style = {styles.buttonBox}>
            <View style = {styles.buttonRow}>
            <Button color="#2C2C2C" onPress={()=>{navigation.navigate("Home")}} title="Login"/>
            <Button color="#2C2C2C" onPress={()=>{navigation.navigate("RegisterScreen")}} title="register"/>
            </View>

        </View>
    </SafeAreaView>);
}

const styles = StyleSheet.create({
    loginContainer:{
        flex:1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    welcomeBox:{
        flex:2,
        justifyContent:"center",
        paddingBottom:"10%"
    },
    buttonBox:{
        flex:1,

        width:"60%",
        alignSelf:"center"
    },
    buttonRow:{

        flexDirection:"row",
        flex:1,
        alignItems:"flex-start",
        justifyContent:"space-evenly",
    },
    welcomeMessage:{
        fontSize:30,
        alignSelf:"center"
    },
    input:{
        width:"60%",
        backgroundColor: "#EAE4D5",
        alignSelf:"center",
        marginVertical:"3%",
        borderWidth:3,
        borderRadius:10,
    }

})

export default Login;