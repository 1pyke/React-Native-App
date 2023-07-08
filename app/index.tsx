import { Redirect } from "expo-router";
import { LogBox, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppSelector } from "./store";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore Warnings log notifications

export type IsLoginedIn = {
  loggedin?: boolean;
  Loading?: boolean;
};

const Index: React.FC<IsLoginedIn> = ({
  loggedin = false,
  Loading = false,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedin ?? Loading);
  const [isLoading, setIsLoading] = useState(true);
  const data = useAppSelector((state) => state.person.isLogedIn);

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const password = await AsyncStorage.getItem("password");

        if (username !== null && password !== null) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    console.log(data);
    retrieveData();
  }, []);

  // Wait for data retrieval before rendering the component
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return isLoggedIn ? (
    <Redirect href={"/home"} />
  ) : (
    <Redirect href={"/login"} />
  );
};

export default Index;
