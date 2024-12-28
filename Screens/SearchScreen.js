import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const API_KEY = "2ebd4a3c40598e3260684246f606ed9a";
const BASE_URL = "https://api.themoviedb.org/3";

const SearchScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (searchQuery.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          searchQuery
        )}&language=en-US&page=1`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderMovieItem = ({ item }) => (
    <TouchableOpacity
      style={styles.movieItem}
      onPress={() => navigation.navigate("MovieDetail", { movie: item })}
    >
      <Image
        source={{
          uri: item.poster_path
            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
            : "https://via.placeholder.com/150",
        }}
        style={styles.moviePoster}
      />
      <View style={styles.movieInfo}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.movieRating}>
          ⭐ {item.vote_average.toFixed(1)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search movies..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={searchMovies}
        />
        <TouchableOpacity onPress={searchMovies} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.movieList}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#1E1E1E",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#2C2C2C",
    color: "white",
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: "#E50914",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  movieList: {
    paddingHorizontal: 10,
  },
  movieItem: {
    flex: 1,
    margin: 5,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    overflow: "hidden",
  },
  moviePoster: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  movieInfo: {
    padding: 10,
  },
  movieTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  movieRating: {
    color: "#E50914",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchScreen;
