import { View, Text, BackHandler, StyleSheet, handlePress, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import AppMapView_MarkOnly from "../Home/AppMapView_MarkOnly";
import AddButton from "./AddButton";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserLocationContext } from "../../Context/UserLocationContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

const latitudeDelta = 0.04;
const longitudeDelta = 0.05;

export default function AddPlaceScreen() {

  const route = useRoute();
  const { username } = route.params;
  console.log(username);

  const { location, setLocation } = useContext(UserLocationContext);
  const [searchLocation, setSearchLocation] = useState(null);

  useEffect(() => {
    if (searchLocation) {
      setLocation({
        latitude: searchLocation.lat,
        longitude: searchLocation.lng,
      });
    }
  }, [searchLocation]);

  const inputRef = useRef(null);
  const clearSearchInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.clear(); 
    }
  };

  const [region, setRegion] = useState({
    latitude: 13.651325176901599,
    longitude: 100.49643743453701,
    latitudeDelta,
    longitudeDelta,
  });

  const [latitude, setLatitude] = useState(region.latitude);
  const [longitude, setLongitude] = useState(region.longitude);

  const onChangeValue = (newRegion) => {
    const { latitude, longitude } = newRegion;
    console.log(newRegion);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    setLatitude(latitude);
    setLongitude(longitude);
    setRegion(newRegion);
  };

  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('AppMapView_HomeScreen');
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);
  
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>เพิ่มสถานที่ตั้ง</Text>
      </View>
      <View style={styles.headerContainer}>
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
                styles={styles.SeachPlace}
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
        </View>
      <AppMapView_MarkOnly
        initialRegion={region}
        onRegionChangeComplete={onChangeValue}
      />
      <View style={styles.buttomContainer}>
        <AddButton onPress={handlePress} lat={latitude} long = {longitude} username={username}/>
      </View>
      <View style={styles.pinposition}>
        <Image
          style={styles.pin}
          source={require("./../../../assets/images/MapPin.png")}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  pinposition: {
    top: "56%",
    left: "49.7%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
  },
  pin: {
    height: 50,
    width: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
  },
  head: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 106,
    width: "85%",
    paddingHorizontal: 10,
    height: "auto",
  },
  buttomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 750,
    width: "100%",
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
  SeachPlace: {
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