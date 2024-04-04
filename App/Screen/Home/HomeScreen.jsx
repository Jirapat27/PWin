import React , { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AppMapView from "./AppMapView";
import { StatusBar } from "expo-status-bar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NearButton from "./NearButton";
import CalculateButton from "../Calculate/CalculateButton";
import AddPlaceButton from "../AddPlaces/AddPlaceButton";
import LogOutButton from "../Login/LogOut";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserLocationContext } from "../../Context/UserLocationContext";

export default function HomeScreen() {

  const { location, setLocation } = useContext(UserLocationContext);
  useEffect(() => {
    location;
  }, [location]);

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
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
        <AppMapView  />
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
  buttomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 750,
    width: "100%",
    zIndex:1000000000000
  },
  rightButton: {
    position: "absolute",
    flexDirection: "column", // Change to column to stack buttons vertically
    alignItems: "flex-end", // Align items to the end of the container
    top: 145, // Adjust top spacing as needed
    right: 10, // Adjust right spacing as needed
    zIndex: 10,
  },
});