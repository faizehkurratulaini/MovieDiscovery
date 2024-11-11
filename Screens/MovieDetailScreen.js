import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc, deleteDoc } from "firebase/firestore";

export default function MovieDetailScreen({ route }) {
  const { movie } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    const auth = getAuth();
    const db = getFirestore();
    const userId = auth.currentUser.uid;
    const movieRef = doc(db, `users/${userId}/favorites/${movie.id}`);

    try {
      if (isFavorite) {
        await deleteDoc(movieRef);
      } else {
        await setDoc(movieRef, movie);
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.backdrop}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
        }}
      />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{movie.title}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color="#E50914"
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.rating}>⭐ {movie.vote_average}/10</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
        <Text style={styles.releaseDate}>
          Release Date: {movie.release_date}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backdrop: {
    width: "100%",
    height: 250,
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    flex: 1,
    marginRight: 10,
  },
  rating: {
    color: "#ffd700",
    fontSize: 16,
    marginBottom: 15,
  },
  overview: {
    color: "white",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  releaseDate: {
    color: "#888",
    fontSize: 14,
  },
});
