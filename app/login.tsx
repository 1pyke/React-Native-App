import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAppDispatch } from "./store";
import { useRouter } from "expo-router";
import { LoginProps } from "../types";
import { userData } from "../features/counter/counterSlice";
import zenHrLogo from "../assets/ZenHR-Logo.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import axios, { AxiosResponse } from "axios";
import { Loginresponse } from "../interfaces/loginresponse";

WebBrowser.maybeCompleteAuthSession();

const Login: React.FC<LoginProps> = ({
  emailType,
  passwordType,
  userInfoType,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [email, setEmail] = useState(emailType);
  const [password, setPassword] = useState(passwordType);
  const showInvalidCredentialsAlert = () => {
    Alert.alert(
      "Invalid Credentials",
      "Please enter a valid email and password."
    );
  };
  const [userInfo, setUserInfo] = useState(userInfoType); // after u get the user info from google

  // Google Sign in Here But Not Working Because of the redirect URL tried to give the useProxy true but still
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "31973751438-ohcb7mfappqtkgnvkvrbeq0tscgcl19e.apps.googleusercontent.com",
    iosClientId:
      "31973751438-4pqfdcsg7pkouoerpvfns2n9i1sg0r4u.apps.googleusercontent.com",
    androidClientId:
      "31973751438-dgte9bdv937dqdj4ijb8bd9j6p3f95aa.apps.googleusercontent.com", // got this key for SH-1 fingerpring form keystore JDK
    redirectUri: "https://auth.expo.io/@liethzaitoun/zenhrApp",
    ...{ useProxy: true },
  });
  useEffect(() => {
    handleSignInWithGoogle();
  }, [response]);
  const handleSignInWithGoogle = async () => {
    const user = await AsyncStorage.getItem("username");
    if (!user) {
      if (response?.type == "success" && response.authentication?.accessToken) {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  };
  const getUserInfo = async (token: string) => {
    if (!token) return;
    try {
      const response: AxiosResponse<Loginresponse> = await axios.get(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user: Loginresponse = response.data;
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (e) {
      console.log(e);
    }
  };

  // Sign in with Google logic ends here
  const handleLogin = () => {
    // Save credentials to AsyncStorage
    try {
      dispatch(userData({ username: email, password: password }));
      AsyncStorage.setItem("username", email);
      AsyncStorage.setItem("password", password);
      if (email && password) {
        router.push("/home");
      } else {
        showInvalidCredentialsAlert();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={zenHrLogo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.googleLoginButton}
        onPress={() => promptAsync()}
      >
        <FontAwesome
          name="google"
          size={20}
          color="#DB4437"
          style={styles.googleIcon}
        />
        <Text style={styles.googleLoginButtonText}>Google</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#000",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 28,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    color: "white",
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#06b9b6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  googleLoginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#06b9b6",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    position: "relative",
  },
  googleIcon: {
    position: "absolute",
    left: 16,
  },
  googleLoginButtonText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});

export default Login;
