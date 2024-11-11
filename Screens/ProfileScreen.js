// screens/ProfileScreen.js
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";

export default function ProfileScreen({ navigation }) {
  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Sign Out",
        onPress: async () => {
          try {
            await signOut(auth);
            navigation.replace("Login");
          } catch (error) {
            console.error("Error signing out:", error);
            alert("Error signing out");
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>{auth.currentUser?.email}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Favorites")}
      >
        <Text style={styles.buttonText}>My Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signOutButton]}
        onPress={handleSignOut}
      >
        <Text style={[styles.buttonText, styles.signOutButtonText]}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  emailText: {
    fontSize: 18,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: "white",
    borderColor: "#ff0000",
    borderWidth: 2,
    marginTop: 20,
  },
  signOutButtonText: {
    color: "#ff0000",
  },
});
