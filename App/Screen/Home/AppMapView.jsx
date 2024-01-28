import { View, Text, Image, StyleSheet } from "react-native";
import React, { useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "./../../Utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";

export default function AppMapView() {
  const { location, setLocation } = useContext(UserLocationContext);
  return (
    <View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={{
          /* latitude: location?.latitude,
          longitude: location?.longtitude,
          latitudeDelta: 13.707686, 
          longtitudeDelta: 100.375140, */
          latitude: 13.7563,
          longitude: 100.5018,
          latitudeDelta: 0.04, 
          longtitudeDelta: 0.05
        }}
        /*showsUserLocation*/
      >
        <Marker
          coordinate={{
            latitude: location?.latitude || 13.707686, // Default to 0 if latitude is undefined
            longitude: location?.longitude || 100.375140, // Default to 0 if longitude is undefined
          }}
        >
          <Image
            source={require("./../../../assets/images/Win-Mark.png")}
            style={{ width: 60, height: 60 }}
          />
        </Marker>
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
