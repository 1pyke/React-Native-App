import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Repository } from "../../interfaces/repository";

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [repository, setRepository] = useState<Repository[]>([]);
  const [searchQuery, setSearchQuery] = useState("is:public");
  const [page, setPage] = useState(1);

  const getRepositories = async () => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `https://api.github.com/search/repositories?q=${searchQuery}&page=${page}`
      );
      setRepository([...repository, ...result.data.items]);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRepositories();
  }, [page]);
  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const handelMoreDetails = () => {
    console.log("test");
  };
  const handleSearch = () => {
    setRepository([]);
    setPage(1);
    if (searchQuery.trim() === "") {
      setSearchQuery("is:public");
    } else {
      setSearchQuery(searchQuery.trim());
    }
    getRepositories();
  };
  const renderItem = ({ item }: { item: Repository }) => (
    <View key={item.id} style={styles.card}>
      <View style={styles.cardDetails}>
        <Text style={styles.title}>{item.name}</Text>
        <Text numberOfLines={2} style={styles.description}>
          {item?.description}
        </Text>
        <TouchableOpacity
          onPress={() => handelMoreDetails()}
          style={styles.repositoryButton}
        >
          <Text style={styles.repositoryButtonText}>See Repository</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderLoader = () => {
    return isLoading ? (
      <View style={styles.loaderStyle}>
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={styles.loaderContainer}
        />
      </View>
    ) : null;
  };
  return (
    <View style={{ backgroundColor: "#000", minHeight: "100%" }}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search repositories..."
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <FlatList
        data={repository}
        renderItem={renderItem}
        keyExtractor={(item) => item.node_id + item.id}
        ListFooterComponent={renderLoader}
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
  searchInput: {
    backgroundColor: "#f0f2f5",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  card: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#444",
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
    color: "#06b9b6",
  },
  description: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  repositoryButton: {
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  repositoryButtonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  loaderContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#CED0CE",
  },
  loaderStyle: {
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
