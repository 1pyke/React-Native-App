import React, { useEffect, useState } from "react";
import { useAppSelector } from "../store";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Button,
  ActivityIndicator,
} from "react-native";
import { ProfileProps } from "../../interfaces/Profile";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoogleMap from "../googleMap";

const Info: React.FC = () => {
  const data: ProfileProps = useAppSelector((state) => state.person.personData);
  const [editable, setEditable] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState(data.username);
  const [updatedImage, setUpdatedImage] = useState(data.profileImage ?? null);
  const [updatedPassword, setUpdatedPassword] = useState(data.password);
  const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(
    data.phoneNumber
  );
  const location = data.location;
  const { latitude, longitude } = location?.coords || {};

  useEffect(() => {
    handleImagePicker();
  }, []);

  const handleEditProfile = () => {
    setEditable(true);
  };

  const handleImagePicker = async () => {
    const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
    setHasGalleryPermission(
      galleryStatus.status === ImagePicker.PermissionStatus.GRANTED
    );
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      AsyncStorage.setItem("profileImage", result.assets[0].uri);
      setUpdatedImage(result.assets[0].uri);
    }
  };

  const handleSaveProfile = async () => {
    // Perform save/update logic here
    setEditable(false);
  };

  if (hasGalleryPermission === false) {
    return (
      <Text style={styles.container}>
        You need to allow access to your camera and gallery to edit your profile
      </Text>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: updatedImage }} style={styles.profileImage} />
        </View>
        <Button title="Change Image" onPress={pickImage} />
        {editable ? (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleSaveProfile}
          >
            <Text style={styles.editButtonText}>Save</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.profileFields}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={updatedUsername}
          onChangeText={setUpdatedUsername}
          editable={editable}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={updatedPassword}
          onChangeText={setUpdatedPassword}
          secureTextEntry={!editable}
          editable={editable}
        />
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          value={updatedPhoneNumber}
          onChangeText={setUpdatedPhoneNumber}
          editable={editable}
        />
        <Text style={styles.label}>Location</Text>
        {location?.coords ? (
          <GoogleMap latitude={latitude} longitude={longitude} />
        ) : (
          <View style={styles.loaderStyle}>
            <ActivityIndicator
              size="large"
              color="#0000ff"
              style={styles.loaderContainer}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
  },
  editButton: {
    backgroundColor: "#06b9b6",
    padding: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileFields: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#222",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    color: "#fff",
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

export default Info;
