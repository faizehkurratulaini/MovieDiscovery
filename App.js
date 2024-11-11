import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { initializeApp } from "firebase/app";
import LoginScreen from "./Screens/LoginScreen";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5G3Es_JaxU2o1NFH15YCoYfk-812Y_o4",
  authDomain: "moviediscovery-ca954.firebaseapp.com",
  projectId: "moviediscovery-ca954",
  storageBucket: "moviediscovery-ca954.firebasestorage.app",
  messagingSenderId: "1020152708190",
  appId: "1:1020152708190:web:810feb65ae1cd9293948cf",
  measurementId: "G-HBTG6TPT6M",
};

// Initialize Firebase
initializeApp(firebaseConfig);

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
