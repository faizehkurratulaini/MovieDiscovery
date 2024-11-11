import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { initializeApp } from "firebase/app";

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

initializeApp(firebaseConfig);

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
