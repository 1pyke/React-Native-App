import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import zenHrLogo from "../assets/ZenHR-Logo.jpg";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

export type LoginProps = {
  emailType: string;
  passwordType: string;
};

const Login: React.FC<LoginProps> = ({ emailType, passwordType }) => {
  const [email, setEmail] = useState(emailType);
  const [password, setPassword] = useState(passwordType);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId:
      "551106287277-ve1c3vk8on77oqfknah63tmalue4bqrk.apps.googleusercontent.com",
    iosClientId:
      "551106287277-nge0hk1r6rmto6co33gee01d0b7o2urq.apps.googleusercontent.com",
  });

  const handleGoogleLogin = async () => {
    console.log("first");
    promptAsync();
  };

  const handleLogin = () => {
    // Save credentials to AsyncStorage
    try {
      AsyncStorage.setItem("username", email);
      AsyncStorage.setItem("password", password);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={zenHrLogo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="Username or email"
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
        onPress={handleGoogleLogin}
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
