import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, PanResponder } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewStyle from '../../Utils/MapViewStyle.json';
import { UserLocationContext } from '../../Context/UserLocationContext';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import markerWin from './../../../assets/images/Win-Mark.png';
import Header from "./Header";
import SearchBar from "./SearchBar";
import NearButton from "./NearButton";
import CalculateButton from "../Calculate/CalculateButton";
import AddPlaceButton from "../AddPlaces/AddPlaceButton";
import LogOutButton from "../Login/LogOut";
import BottomSheets from '../../Component/BottomSheets';

export default function AppMapView_HomeScreen() {
  const { location, setLocation } = useContext(UserLocationContext);
  const [places, setPlaces] = useState([]);
  const [sheetHeight, setSheetHeight] = useState(Dimensions.get('window').height / 1.2);
  const [pan] = useState(new Animated.ValueXY());
  const [autoClose, setAutoClose] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [tempHeight, setTempHeight] = useState(Dimensions.get('window').height / 1.2);
  const [sheetPlaces,setSheetPlaces] = useState({})
  const [showBottomSheet, setShowBottomSheet] = useState(false);

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
    latitudeDelta: 0.05, // Adjust this value to zoom level
    longitudeDelta: 0.05, // Adjust this value to zoom level
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

  const toggleBottomSheet = (place) => {
    setShowBottomSheet(!showBottomSheet);
    if (!showBottomSheet) {
      setSheetHeight(Dimensions.get('window').height / 0.65);
      setTempHeight(Dimensions.get('window').height / 0.65);
      setSheetPlaces(place)
    } else {
      setSheetHeight(bottomSheetHeight);
      setTempHeight(bottomSheetHeight);
    }
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
    setSheetHeight(Dimensions.get('window').height / 1.2);
    setTempHeight(Dimensions.get('window').height / 1.2);
    setAutoClose(false);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gesture) => {
      if (tempHeight > Dimensions.get('window').height / 1.2) {
        setSheetHeight(tempHeight);
      } else {
        setSheetHeight(Dimensions.get('window').height / 1.2);
      }
    },
    onPanResponderMove: (_, gesture) => {
      const newHeight = tempHeight - gesture.dy;
      if (newHeight >= Dimensions.get('window').height / 1.2) {
        setSheetHeight(newHeight);
        setTempHeight(newHeight);
      }
      if (gesture.moveY >= 700 && gesture.dy > 0) {
        setAutoClose(true);
        setSheetHeight(Dimensions.get('window').height / 1.2);
      } else {
        setAutoClose(false);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (autoClose) {
        setShowBottomSheet(false);
      } else {
        const newHeight = tempHeight - gesture.dy;
        if (newHeight >= Dimensions.get('window').height / 1.2) {
          setSheetHeight(newHeight);
          setTempHeight(newHeight);
        }
      }
      pan.setValue({ x: 0, y: 0 });
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header />
        <SearchBar
          searchedLocation={(location) =>
            setLocation({
              latitude: location.lat,
              longitude: location.lng,
            })
          }
        />
        <View style={styles.rightButton}>
          <CalculateButton onPress={() => console.log(">>กดปุ่ม คำนวณ<<")} />
          <AddPlaceButton onPress={() => console.log(">>กดปุ่ม เพิ่ม<<")} />
          <LogOutButton onPress={() => console.log(">>กดปุ่ม ออกจากบัญชี<<")} />
        </View>
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        region={initialRegionFromLocation}
        showsUserLocation
        followsUserLocation
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            onPress={() => toggleBottomSheet(place)}
            image={markerWin}
          />
        ))}
      </MapView>
      {showBottomSheet && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeBottomSheet} />
      )}
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [Dimensions.get('window').height, 0],
                }),
              },
            ],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={[styles.bottomSheetContent, { height: sheetHeight }]}>
          <BottomSheets sheetPlaces={sheetPlaces} location={location} onClose={closeBottomSheet} />
        </View>
      </Animated.View>
      <View style={styles.buttomContainer}>
        <NearButton onPress={() => console.log(">>กดปุ่ม ใกล้ที่สุด<<")} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative', // Make the container relative
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Fill up the entire parent container
    zIndex: -1, // Set z-index to send the map to the bottom layer
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 0, // Display at the top of the screen
    padding: 40,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttomContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 20, // Display at the bottom of the screen
    width: '100%',
  },
  rightButton: {
    position: "absolute",
    flexDirection: "column", // Change to column to stack buttons vertically
    alignItems: "flex-end", // Align items to the end of the container
    top: 145, // Adjust top spacing as needed
    right: 10, // Adjust right spacing as needed
    zIndex: 10,
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