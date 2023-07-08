import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useState } from "react";

const home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const repos = [
    {
      id: 1,
      title: "Eatly Project",
      description:
        "Eatly is a web application built with React that aims to revolutionize the way people discover and explore food. With an immersive user interface and captivating animations, Eatly provides an engaging and interactive experience for users to satisfy their culinary cravings.",
      url: "https://github.com/facebook/react-native",
    },
    {
      id: 2,
      title: "React Native",
      description:
        "React Native is a JavaScript library for building user interfaces.",
      url: "https://github.com/facebook/react-native",
    },
    {
      id: 3,
      title: "React Native",
      description:
        "React Native is a JavaScript library for building user interfaces.",
      url: "https://github.com/facebook/react-native",
    },
    {
      id: 4,
      title: "React Native",
      description:
        "React Native is a JavaScript library for building user interfaces.",
      url: "https://github.com/facebook/react-native",
    },
  ];
  const handleLoadMore = () => {
    console.log("test");
  };
  const handelMoreDetails = () => {
    console.log("test");
  };
  return (
    <View style={{ backgroundColor: "#000" }}>
      <FlatList
        data={repos}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.card}>
            <Image style={styles.image} source={{ uri: item.url }} />
            <View style={styles.cardDetails}>
              <Text style={styles.title}>{item.title}</Text>
              <Text numberOfLines={2} style={styles.description}>
                {item?.description}
              </Text>
              <TouchableOpacity
                onPress={() => handelMoreDetails()}
                style={styles.favoriteButton}
              >
                <Text style={styles.favoriteButtonText}>See More Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loaderContainer}
            />
          ) : (
            <TouchableOpacity onPress={handleLoadMore}>
              <Text>Please Wait a Secound</Text>
            </TouchableOpacity>
          )
        }
        onEndReachedThreshold={0.5}
        onEndReached={handleLoadMore}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  cardDetails: {
    flex: 1,
    padding: 10,
  },
  favoritesButton: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: "3%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  favoriteButton: {
    backgroundColor: "#4E86B4",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  favoriteButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  loaderContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
});

export default home;
