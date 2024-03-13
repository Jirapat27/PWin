import { View, StyleSheet, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "./../../Utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';

// Import the marker image
import markerWin from './../../../assets/images/Win-Mark.png';

export default function AppMapView({ initialRegion, onRegionChangeComplete }) {
  const { location } = useContext(UserLocationContext);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const placesRef = ref(db, 'MarkWin/');
      onValue(placesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const placesArray = Object.values(data);
          setPlaces(placesArray);
        } else {
          console.log(data,"nodata");
        }
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(places)
  },[places]);

  const defaultRegion = {
    latitude: 13.651325176901599,
    longitude: 100.49643743453701,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  };

  const region = location ? {
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  } : initialRegion || defaultRegion;
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const toggleBottomSheet = () => {
    setShowBottomSheet(!showBottomSheet);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation
        followsUserLocation
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
            description={`Latitude: ${place.latitude}, Longitude: ${place.longitude}`}
            onPress={toggleBottomSheet}
            image={markerWin}
          />
        ))}
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
