import React, {useState, useEffect} from "react";
import {View, SafeAreaView, StyleSheet, Text, Platform, StatusBar, TextInput, Button} from "react-native";

function RegisterScreen({navigator}){

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
    
            //TODO Ask Server to check the provided email is already being used

            // Set the errors and update form validity
            setErrors(errors);
            setAuthenticated(Object.keys(errors).length === 0);
            
            if(isAuthenticated){
                //TODO Post information to Server to save the user account
            }
            else{
                console.log("Email:", errors.email, "// Password:", errors.password)
                //TODO Print error message as UI
            }
        };

    return (<SafeAreaView style={{justifyContent:"center",alignItems:"center", flex:0.5}}>
                <TextInput placeholder="Email" onChange={setEmail} style={styles.input}></TextInput>
                <TextInput placeholder="Passwod" onChange={setPassword} style={styles.input}></TextInput>
            <View style = {{width:"30%"}}>
                <Button color="#2C2C2C" onPress={()=>{console.log("clicked")}} title="register"/>
            </View>
        </SafeAreaView>)
}


const styles = StyleSheet.create({
    input:{
        width:"60%",
        backgroundColor: "#EAE4D5",
        alignSelf:"center",
        marginBottom:"6%",
        borderWidth:3,
        borderRadius:10,
    }

})

export default RegisterScreen