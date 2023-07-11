import { Redirect } from "expo-router";
import { LogBox, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./store";
import { userData } from "../features/counter/counterSlice";
import { IsLoginedIn } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore Warnings log notifications

const Index: React.FC<IsLoginedIn> = ({ loggedin = false, Loading = true }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(loggedin ?? Loading);
  const [isLoading, setIsLoading] = useState(Loading);
  const dispatch = useAppDispatch();
  const retrieveData = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const password = await AsyncStorage.getItem("password");
      const profileImage = await AsyncStorage.getItem("profileImage");
      if (username !== null && password !== null) {
        dispatch(
          // used this dummy data incase the login by google did notworked
          userData({
            username,
            password,
            email: "liethzaitoun999@gmail.com",
            profileImage: profileImage
              ? profileImage
              : "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
            phoneNumber: "+962770122711",
            location: {},
          })
        );
        setIsLoggedIn(true); //  to redirect to home Screen
      } else {
        dispatch(
          // add login data to the store
          userData({
            username: "",
            password: "",
            email: "",
            profileImage:
              "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
            phoneNumber: "",
            location: {},
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
  const getLocationPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    let currentLocation = await Location.getCurrentPositionAsync({});
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    dispatch(userData({ location: currentLocation }));
  };
  useEffect(() => {
    getLocationPermissions();
    retrieveData();
  }, []);

  // Wait for data retrieval before rendering the component
  if (isLoading) {
    return <ActivityIndicator size="large" color="#06b9b6" />;
  }

  return isLoggedIn ? (
    <Redirect href={"/home"} />
  ) : (
    <Redirect href={"/login"} />
  );
};
export default Index;
