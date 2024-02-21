import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "./../../Utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";

export default function AppMapView({ initialRegion, onRegionChangeComplete }) {
  const { location } = useContext(UserLocationContext);

  const defaultRegion = {
    latitude: 13.651325176901599,
    longitude: 100.49643743453701,

  };

  const region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      }
    : initialRegion || defaultRegion;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete} // Pass the callback here
      >
        {location && (
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
