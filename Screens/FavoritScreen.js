import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../config/firebase";

const FavoriteScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's favorites
  const fetchFavorites = async () => {
    if (!auth.currentUser) {
      setLoading(false);
      return;
    }

    try {
      const userId = auth.currentUser.uid;
      const favoritesRef = collection(db, "favorites", userId, "movies");

      const querySnapshot = await getDocs(favoritesRef);
      const fetchedFavorites = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        firestoreId: doc.id,
      }));

      setFavorites(fetchedFavorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (movieId) => {
    try {
      const userId = auth.currentUser.uid;
      const movieRef = doc(
        db,
        "favorites",
        userId,
        "movies",
        movieId.toString()
      );

      await deleteDoc(movieRef);

      // Update local state
      setFavorites(favorites.filter((movie) => movie.movie.id !== movieId));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  // Fetch favorites when component mounts
  useEffect(() => {
    fetchFavorites();

    // Optional: Refetch when screen comes into focus
    const unsubscribe = navigation.addListener("focus", fetchFavorites);
    return unsubscribe;
  }, [navigation]);

  // Render individual movie item
  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate("MovieDetail", { movie: item.movie })}
    >
      <Image
        source={{
          uri: item.movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.movie.poster_path}`
            : "https://via.placeholder.com/150",
        }}
        style={styles.moviePoster}
      />
      <View style={styles.movieDetails}>
        <View style={styles.movieTextContainer}>
          <Text style={styles.movieTitle} numberOfLines={2}>
            {item.movie.title}
          </Text>
          <Text style={styles.movieGenre} numberOfLines={1}>
            {item.movie.release_date?.slice(0, 4) || "N/A"}
          </Text>
        </View>
        <View style={styles.movieActions}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.movieRating}>
              {item.movie.vote_average.toFixed(1)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => removeFromFavorites(item.movie.id)}
            style={styles.removeButton}
          >
            <Ionicons name="trash" size={20} color="#E50914" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E50914" />
        <Text style={styles.loadingText}>Loading Favorites...</Text>
      </SafeAreaView>
    );
  }

  // Render empty state
  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={100} color="#666" />
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Explore movies and add them to your favorites!
        </Text>
        <TouchableOpacity
          style={styles.exploreButton}
          onPress={() => navigation.navigate("Search")}
        >
          <Text style={styles.exploreButtonText}>Explore Movies</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>
          {favorites.length} Movie{favorites.length !== 1 ? "s" : ""}
        </Text>
      </View>

      <FlatList
        data={favorites}
        renderItem={renderFavoriteItem}
        keyExtractor={(item) => item.movie.id.toString()}
        contentContainerStyle={styles.movieList}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  headerContainer: {
    padding: 20,
    backgroundColor: "#1E1E1E",
  },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#888",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loadingText: {
    color: "white",
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  emptyTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
  emptySubtitle: {
    color: "#888",
    textAlign: "center",
    marginTop: 10,
  },
  exploreButton: {
    marginTop: 20,
    backgroundColor: "#E50914",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  exploreButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  movieList: {
    paddingHorizontal: 15,
  },
  movieItem: {
    flexDirection: "row",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  moviePoster: {
    width: 120,
    height: 180,
    resizeMode: "cover",
  },
  movieDetails: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 15,
  },
  movieTextContainer: {
    flex: 1,
  },
  movieTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieGenre: {
    color: "#888",
    fontSize: 14,
  },
  movieActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  movieRating: {
    color: "#FFD700",
    marginLeft: 5,
    fontSize: 14,
  },
  removeButton: {
    padding: 5,
  },
});

export default FavoriteScreen;
