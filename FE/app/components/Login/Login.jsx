import React, {useState, useEffect} from "react";
import {View, SafeAreaView, StyleSheet, Text, Platform, StatusBar, TextInput, Button} from "react-native";


function Login({navigation}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    
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

        // Set the errors and update form validity
        console.log("Email:", errors.email, "// Password:", errors.password)
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
    };

    const handleSubmit = () => {
        if (isFormValid) {

            // Form is valid, perform the submission logic
            console.log('Form submitted successfully!');
        } else {
            
            // Form is invalid, display error messages
            console.log('Form has errors. Please correct them.');
        }
    };



    return (<SafeAreaView style={styles.loginContainer}>
        <View style = {styles.welcomeBox}><Text style={styles.welcomeMessage}>Welcome!</Text></View>
        <View style = {{flex:1}}>
            <TextInput placeholder="Email" onChange={setEmail} style={styles.input}></TextInput>
            <TextInput placeholder="Passwod" onChange={setPassword} style={styles.input}></TextInput>
        </View>
        <View style = {styles.buttonBox}>
            <View style = {styles.buttonRow}>
            <Button color="#2C2C2C" onPress={validateForm} title="Login"/>
            <Button color="#2C2C2C" onPress={()=>{navigation.navigate("RegisterScreen")}} title="register"/>
            </View>

        </View>
    </SafeAreaView>)
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