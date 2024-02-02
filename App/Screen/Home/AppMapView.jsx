import { View, StyleSheet } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "./../../Utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";

export default function AppMapView() {
  const { location } = useContext(UserLocationContext);

  const defaultRegion = {
    latitude: 13.651325176901599,
    longitude: 100.49643743453701,
    latitudeDelta: 0.04,
    longitudeDelta: 0.05,
  };

  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={
              defaultRegion
              }
      >
        <Marker
          coordinate={{
            latitude: defaultRegion.latitude,
            longitude: defaultRegion.longitude,
          }}
        />
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
