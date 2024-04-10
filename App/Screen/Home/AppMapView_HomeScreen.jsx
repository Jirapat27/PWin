import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, TouchableOpacity, PanResponder } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useNavigation } from "@react-navigation/native";
import MapViewStyle from '../../Utils/MapViewStyle.json';
import { UserLocationContext } from '../../Context/UserLocationContext';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from "expo-location";
import MapViewDirections from "react-native-maps-directions";
import markerWin from './../../../assets/images/Win-Mark.png';
import Header from "./Header";
import CalculateButton from "../Calculate/CalculateButton";
import AddPlaceButton from "../AddPlaces/AddPlaceButton";
import LogOutButton from "../Login/LogOut";
import BottomSheets from '../../Component/BottomSheets';
import HamburgerMenu from '../Menu/HamburgerMenu';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
const GOOGLE_MAPS_APIKEY = "AIzaSyC2PzPPkZ7--zDeI8azWxX4jHkJfQBahFY";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [showState, setShowState] = useState(false);
  const [myLocation, setMyLocation] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [closestMarker, setClosestMarker] = useState(null);
  const navigation = useNavigation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (searchLocation) {
      setLocation({
        latitude: searchLocation.lat,
        longitude: searchLocation.lng,
      });
    }
  }, [searchLocation]);

  //*------------clear seach bar------------------*
  const inputRef = useRef(null);
  const clearSearchInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.clear(); // Clear the text input
    }
  };

  const handleNearByClick = () => {
    setShowState(!showState);
    //console.log("MyLocation lat", myLocationNearByLat);
    //console.log("MyLocation long", myLocationNearByLong);
    // console.log(" closestMarker Lat : ", closestMarkerLat);
    // console.log("closestMarkerDet long", closestMarkerLong);

    getCurrentLocation();
    if (myLocation && places.length > 0) {
      findClosestMarker();
      console.log("Have MyLocati0on" , myLocation)
      console.log("can find Closest", closestMarker)
    }
    
   // findClosestMarker();
  };
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
        console.log("วินที่ใกล้: ", closestMarker);
      }
    });
    setClosestMarker(closestMarker);
    // console.log("วินที่ใกล้ที่สุด: ", closestMarker.latitude);
    // console.log("วินที่ใกล้ที่สุด: ", closestMarker.longitude);
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
        console.log("location >>>>> ");

      } catch (error) {
        setErrorMsg("Error getting location");
        console.log("-------cant get locaation-----------");
      }
    })( [myLocation]);
  };

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
      <View style={styles.menuContainer}>
        <HamburgerMenu isOpen={menuOpen} onPress={toggleMenu} />
      </View>
        {menuOpen && (
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => navigation.navigate('LogInScreen')}>
              <Text style={styles.loginText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Howto')}>
              <Text style={styles.HowToText}>วิธีใช้</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RateService')}>
              <Text style={styles.RateServiceText}>อัตราการคิดค่าบริการ</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Report')}>
              <Text style={styles.ReportText}>รายงาน</Text>
            </TouchableOpacity>
          </View>
        )}
      <View style={styles.headerContainer}>
        <Header />
        <View style={styles.searchBarContainer}>
            <GooglePlacesAutocomplete
              ref={inputRef}
              placeholder="ค้นหาสถานที่"
              fetchDetails={true}
              onPress={(data, details = null) => {
                setSearchLocation(details?.geometry?.location);
              }}
              query={{
                key: "AIzaSyBNRNzLV-WydX3b96FZOe2rwi4Oe4W5kGg",
                language: "th",
                components: "country:th",
              }}
              styles={styles.SearchPlace}
              enablePoweredByContainer={false}
              searchedLocation={(location) =>
                setLocation({
                  latitude: location.lat,
                  longitude: location.lng,
                })
              }
            >
              <Ionicons name="search" size={35} style={styles.searchIcon} />
            </GooglePlacesAutocomplete>
          <TouchableOpacity onPress={clearSearchInput} style={styles.clearButton}>
            <Ionicons name="close" size={25} color="#A7A7A7" />
          </TouchableOpacity>
          </View>
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

        {myLocation && closestMarker &&  (
            <MapViewDirections
              origin={{
                latitude: myLocation.coords.latitude,
                longitude: myLocation.coords.longitude,
                // latitude: 13.7068,
                // longitude: 100.3811,
              }} //"latitude": 13.7068, "longitude": 100.3811
              destination={{
                latitude: closestMarker.latitude,
                longitude: closestMarker.longitude,
                // latitude: 13.7132,
                // longitude: 100.4082,
              }} //"latitude": 13.7132, "longitude": 100.4082
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={6}
              strokeColor="#FF9A62"
            />
        )}
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
        <TouchableOpacity
          style={styles.nearButton.container}
          onPress={handleNearByClick}
        >
          <Text style={styles.nearButton.text}>ใกล้ที่สุด</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    zIndex: 12,
    left: 10,
  },
  menu: {
    position: "absolute",
    zIndex: 11,
    backgroundColor: "white",
    width: "75%",
    height: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loginText: {
    marginTop: 100,
    marginLeft: 75,
    color: "#FF9A62",
    fontSize: 32,
  },
  HowToText: {
    marginTop: 45,
    marginLeft: 25,
    color: "black",
    fontSize: 24,
  },
  RateServiceText: {
    marginTop: 20,
    marginLeft: 25,
    color: "black",
    fontSize: 24,
  },
  ReportText: {
    marginTop: 20,
    marginLeft: 25,
    color: "black",
    fontSize: 24,
  },
  container: {
    width: '100%',
    height: '100%',
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
    zIndex: -1,
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
  nearButton: {
    container: {
      flexDirection: "column",
      backgroundColor: "#FF9A62",
      padding: 10,
      borderRadius: 20,
      alignItems: "center",
      width: 125,
      height: 59,
    },
    text: {
      color: "#fff",
      fontSize: 24,
      fontWeight: "600",
      fontFamily: "BaiJamjuree-SemiBold",
    },
  },
  listView: {
    width: "100%",
    borderWidth: 1,
    height: 200,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    zIndex: 2,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "#FF9A62",
    alignItems: "flex-start",
  },
  SearchPlace: {
    textInput: {
      width: 300,
      height: 55,
      borderRadius: 10,
      paddingStart: 50,
      paddingEnd: 50,
      //paddingHorizontal: 50,
      backgroundColor: "white",
      fontSize: 20,
      fontFamily: "BaiJamjuree-Medium",
    },
    listView: {
      width: "100%",
      borderWidth: 1,
      height: 200,
      borderColor: "#ddd",
      borderRadius: 10,
      backgroundColor: "#fff",
      zIndex: 2,
    },
    description: {
      fontSize: 16,
    },
    row: {
      padding: 10,
    },
    searchIcon: {
      position: "absolute",
      top: 10,
      left: 10,
      color: "#FF9A62",
      alignItems: "flex-start",
    },
  },
  clearButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 20,
  },
});