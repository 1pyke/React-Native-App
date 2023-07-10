import { Redirect } from "expo-router";
import { LogBox, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "./store";
import { userData } from "../features/counter/counterSlice";
import { IsLoginedIn } from "../types";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore Warnings log notifications

const Index: React.FC<IsLoginedIn> = ({ loggedin = false, Loading = true }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedin ?? Loading);
  const [isLoading, setIsLoading] = useState(Loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const retrieveData = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const password = await AsyncStorage.getItem("password");
        const profileImage = await AsyncStorage.getItem("profileImage");
        if (username !== null && password !== null) {
          dispatch(
            userData({
              username,
              password,
              email: "liethzaitoun999@gmail.com",
              profileImage: profileImage
                ? profileImage
                : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
              phoneNumber: "+962770122711",
              location: "",
            })
          );
          setIsLoggedIn(true);
        } else {
          dispatch(
            userData({
              username: "",
              password: "",
              email: "",
              profileImage:
                "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
              phoneNumber: "",
              location: "",
            })
          );
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };
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
