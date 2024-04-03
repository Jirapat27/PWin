import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewStyle from '../../Utils/MapViewStyle.json';
import { UserLocationContext } from '../../Context/UserLocationContext';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import markerWin from './../../../assets/images/Win-Mark.png';

export default function AppMapView_MarkOnly({ initialRegion, onRegionChangeComplete, onMarkerPress }) {
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
          console.log(data, 'no data');
        }
      });
    };
    fetchData();
  }, []);

  const defaultRegion = {  
    latitude: 13.0, // Center latitude of Thailand
    longitude: 101.0, // Center longitude of Thailand
    latitudeDelta: 15.0, // Adjust this value to zoom level
    longitudeDelta: 15.0, // Adjust this value to zoom level
  };

  const calculateDelta = (locations) => {
    // Calculate the distance between the first and last location
    const latitudes = locations.map((location) => location.latitude);
    const longitudes = locations.map((location) => location.longitude);
    const maxLat = Math.max(...latitudes);
    const minLat = Math.min(...latitudes);
    const maxLng = Math.max(...longitudes);
    const minLng = Math.min(...longitudes);

    const deltaLat = maxLat - minLat;
    const deltaLng = maxLng - minLng;

    return {
      latitudeDelta: deltaLat + 0.015, // Add some padding
      longitudeDelta: deltaLng + 0.015,
    };
  };

  const initialRegionFromLocation = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        ...calculateDelta([location]), // Pass an array containing only the user's location
      }
    : defaultRegion;

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          region={initialRegionFromLocation}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation
          followsUserLocation
        >
          {places.map((place, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: place.latitude, longitude: place.longitude }}
              title={place.name}
              image={markerWin}
              onPress={() => onMarkerPress(place)}
            />
          ))}
        </MapView>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 40,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttomContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 750,
    width: '100%',
  },
  rightButton: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    width: '100%',
    position: 'absolute',
    bottom: 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 9999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000000,
  },
});