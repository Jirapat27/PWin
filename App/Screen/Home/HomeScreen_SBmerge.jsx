
import React, { useContext, useEffect, useState, useRef } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./Header";
import NearButton from "./NearButton";
import CalculateButton from "../Calculate/CalculateButton";
import AddPlaceButton from "../AddPlaces/AddPlaceButton";
import LogOutButton from "../Login/LogOut";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserLocationContext } from "../../Context/UserLocationContext";
import SearchBar from "./SearchBar"; // Import SearchBar component
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen_SBmerge() {
  //*------------clear seach bar------------------*
  const inputRef = useRef(null);
  const clearSearchInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.setAddressText(''); // Clear the text input
    }
  };
  /********location seacrh **************/
  const { location, setLocation } = useContext(UserLocationContext);
  const [searchLocation, setSearchLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  useEffect(() => {
    if (searchLocation) {
      setLocation({
        latitude: searchLocation.lat,
        longitude: searchLocation.lng,
      });
    }
  }, [searchLocation]);

  const initialRegion = {
    latitude: searchLocation?.latitude,
    longitude: searchLocation?.longitude,
  };

  const [region, setRegion] = useState(initialRegion);

  const onChangeValue = (newRegion) => {
    const { latitude, longitude } = newRegion;
    console.log("Desired Destination's Latitude:", latitude);
    console.log("Desired Destination's Longitude:", longitude);
    // console.log(newRegion);
    // setRegion(newRegion);
    // console.log("newRegion:", newRegion);
  };

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <View style={styles.headerContainer}>
          <Header />
          <View style={styles.searchBarContainer}>
            {/* Render the SearchBar component here */}
            <GooglePlacesAutocomplete
              ref={inputRef}
              placeholder="ค้นหาสถานที่"
              fetchDetails={true}
              onPress={(data, details = null) => {
                setSearchLocation(details?.geometry?.location);
                clearSearchInput();
              }}
              query={{
                key: "AIzaSyBNRNzLV-WydX3b96FZOe2rwi4Oe4W5kGg",
                language: "th",
                components: "country:th",
              }}
              styles={styles}
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
          </View>
          <View style={styles.rightButton}>
            <CalculateButton onPress={() => console.log(">>กดปุ่ม คำนวณ<<")} />
            <AddPlaceButton onPress={() => console.log(">>กดปุ่ม เพิ่ม<<")} />
            <LogOutButton
              onPress={() => console.log(">>กดปุ่ม ออกจากบัญชี<<")}
            />
          </View>
        </View>
        <AppMapView_HomeScreen
          initialRegion={region}
          onRegionChangeComplete={(newRegion) => {
            onChangeValue(newRegion);
            setRegion(newRegion);
          }}
        />
        <View style={styles.buttomContainer}>
          <NearButton onPress={() => console.log(">>กดปุ่ม ใกล้ที่สุด<<")} />
        </View>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  searchBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 2,
  },
  buttomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 750,
    width: "100%",
    zIndex: 1000000000000,
  },
  rightButton: {
    position: "absolute",
    flexDirection: "column",
    alignItems: "flex-end",
    top: 145,
    right: 10,
    zIndex: 1,
  },
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
  clearButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 3,
    color: "#FF9A62",
    //alignItems: "flex-end",
  },
});
