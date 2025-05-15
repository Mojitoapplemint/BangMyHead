import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RegisterScreen from './components/Login/RegisterScreen';
import Login from './components/Login/Login';
import Home from './components/ChatRoomList/Home';

const RegisterStack = createNativeStackNavigator();

function App(){
    return <NavigationContainer>
        <RegisterStack.Navigator>
            <RegisterStack.Screen component={Login} name="Login" options={{headerShown:false}}/>
            <RegisterStack.Screen component={RegisterScreen} name="RegisterScreen" options={{title:"Register", animation:"slide_from_bottom"}}/>
            <RegisterStack.Screen component={Home} name="Home" options={{headerShown:false, animation:"modal"}}/>

        </RegisterStack.Navigator>
    </NavigationContainer>
}

export default App;