import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewStyle from "../../Utils/MapViewStyle.json";
import { UserLocationContext } from "../../Context/UserLocationContext";
import { ref, onValue } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import markerWin from "./../../../assets/images/Win-Mark.png";
import BottomSheets from "../../Component/BottomSheets";
import * as Location from "expo-location";
export default function AppMapView({
  initialRegion,
  onRegionChangeComplete,
  SheetHeight,
  bottomSheetHeight,
}) {
  const { location } = useContext(UserLocationContext);
  const [closestMarker, setClosestMarker] = useState(null);
  const [places, setPlaces] = useState([]);
  const [myLocation, setMyLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [sheetHeight, setSheetHeight] = useState(
    Dimensions.get("window").height / 1.2
  );
  const [pan] = useState(new Animated.ValueXY());
  const [autoClose, setAutoClose] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [tempHeight, setTempHeight] = useState(
    Dimensions.get("window").height / 1.2
  );
  const [sheetPlaces, setSheetPlaces] = useState({});

  /*------------ calculate distance between two coordinates------------------*/
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180); // Convert degrees to radians
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  /*----------  find the closest marker to the user's location----------------*/
  const findClosestMarker = () => {
    if (!myLocation) return;
    let minDistance = Infinity;
    let closestMarker = null;
    places.forEach((place) => {
      const distance = calculateDistance(
        myLocation.coords.latitude,
        myLocation.coords.longitude,
        place.latitude,
        place.longitude
      );
      if (distance < minDistance) {
        minDistance = distance;
        closestMarker = place;
      }
    });
    setClosestMarker(closestMarker);
  };

  /*----------------- get the current location-----------------------*/
  const getCurrentLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let myLocation = await Location.getCurrentPositionAsync({});
        setMyLocation(myLocation);
        //console.log("location :",myLocation);
        console.log("my current lat :", myLocation.coords.latitude);
        console.log("my current long :", myLocation.coords.longitude);
      } catch (error) {
        setErrorMsg("Error getting location");
        console.log("cant get locaation");
      }
    })();
  };


  useEffect(() => {
    const fetchData = async () => {
      const placesRef = ref(db, "MarkWin/");
      onValue(placesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const placesArray = Object.values(data);
          setPlaces(placesArray);
        } else {
          console.log(data, "no data");
        }
      });
    };
    fetchData();
    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (myLocation && places.length > 0) {
      findClosestMarker();
      console.log("วินที่ใกล้ที่สุด: ", closestMarker);
      //console.log("วินที่ใกล้ที่สุด: ", closestMarker.latitude);
      //console.log("วินที่ใกล้ที่สุด: ", closestMarker.longitude);
      //console.log("วินที่ใกล้ที่สุด: ", closestMarker.name);
    }
  }, [myLocation, places]);

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

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const toggleBottomSheet = (place) => {
    setShowBottomSheet(!showBottomSheet);
    if (!showBottomSheet) {
      setSheetHeight(Dimensions.get("window").height / 0.65);
      setTempHeight(Dimensions.get("window").height / 0.65);
      setSheetPlaces(place);
    } else {
      setSheetHeight(bottomSheetHeight);
      setTempHeight(bottomSheetHeight);
    }
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
    setSheetHeight(Dimensions.get("window").height / 1.2);
    setTempHeight(Dimensions.get("window").height / 1.2);
    setAutoClose(false);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gesture) => {
      if (tempHeight > Dimensions.get("window").height / 1.2) {
        setSheetHeight(tempHeight);
      } else {
        setSheetHeight(Dimensions.get("window").height / 1.2);
      }
    },
    onPanResponderMove: (_, gesture) => {
      const newHeight = tempHeight - gesture.dy;
      if (newHeight >= Dimensions.get("window").height / 1.2) {
        setSheetHeight(newHeight);
        setTempHeight(newHeight);
      }
      if (gesture.moveY >= 700 && gesture.dy > 0) {
        setAutoClose(true);
        setSheetHeight(Dimensions.get("window").height / 1.2);
      } else {
        setAutoClose(false);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (autoClose) {
        setShowBottomSheet(false);
      } else {
        const newHeight = tempHeight - gesture.dy;
        if (newHeight >= Dimensions.get("window").height / 1.2) {
          setSheetHeight(newHeight);
          setTempHeight(newHeight);
        }
      }
      pan.setValue({ x: 0, y: 0 });
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <SafeAreaProvider style={styles.container}> */}
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
              coordinate={{
                latitude: place.latitude,
                longitude: place.longitude,
              }}
              onPress={() => toggleBottomSheet(place)}
              image={markerWin}
            />
          ))}
        </MapView>
        {showBottomSheet && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeBottomSheet}
          />
        )}
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get("window").height, 0],
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={[styles.bottomSheetContent, { height: sheetHeight }]}>
            <BottomSheets
              sheetPlaces={sheetPlaces}
              onClose={closeBottomSheet}
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
  buttomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 750,
    width: "100%",
  },
  rightButton: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  sheet: {
    backgroundColor: "white",
    padding: 16,
    width: "100%",
    position: "absolute",
    bottom: 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 9999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100000000,
  },
});
