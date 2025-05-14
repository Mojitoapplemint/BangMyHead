import React, {useState, useEffect} from "react";
import {View, SafeAreaView, StyleSheet, Text, Platform, StatusBar, TextInput} from "react-native";


function Login(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    return (<SafeAreaView style={styles.loginContainer}>
        <View style = {styles.welcomeBox}><Text style={styles.welcomeMessage}>Welcome!</Text></View>
        <View style = {styles.loginBox}>
            <TextInput style={styles.username}></TextInput>
            <TextInput style={styles.password}></TextInput>

            </View>
        <View style = {styles.registerButtonBox}></View>
    </SafeAreaView>)
    
    useEffect(() => {

        // Trigger form validation when name, 
        // email, or password changes
        validateForm();
    }, [name, email, password]);

    const validateForm = () => {
        let errors = {};

        // Validate name field
        if (!name) {
            errors.name = 'Name is required.';
        }

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
}

const styles = StyleSheet.create({
    loginContainer:{
        flex:1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    welcomeBox:{
        flex:2,
        backgroundColor:"red",
        justifyContent:"flex-end",
        paddingBottom:"10%"
    },
    loginBox:{
        flex:1,
    },
    registerButtonBox:{
        flex:1,
        backgroundColor:"yellow",
    },
    welcomeMessage:{
        fontSize:30,
        alignSelf:"center"
    },
    username:{

    }

})

export default Login;