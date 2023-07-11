import React from "react";
import { View, StyleSheet } from "react-native";
import { GoogleMapType } from "../interfaces/googleMap";
import MapView, { Marker } from "react-native-maps";

const GoogleMap: React.FC<GoogleMapType> = ({ latitude, longitude }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude, longitude }} title="Location" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
});

export default GoogleMap;
