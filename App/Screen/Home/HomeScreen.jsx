import { Text, View, StyleSheet } from "react-native";
import React from "react";
import AppMapView from "./AppMapView";
import { StatusBar } from "expo-status-bar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NearButton from "./NearButton";
import CalculateButton from "../Calculate/CalculateButton";
import AddPlaceButton_notLoggedIn from "../AddPlaces/AddPlaceButton_notLoggedIn";
import AddPlaceButton_LoggedIn from "../AddPlaces/AddPlaceButton_LoggedIn";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        
        <Header />
        <SearchBar />
        <View style={styles.rightButton}>
          <CalculateButton onPress={() => console.log(">>กดปุ่ม คำนวณ<<")} />
          <AddPlaceButton_notLoggedIn onPress={() => console.log(">>กดปุ่ม ล็อกอินหากยังไม่เคย<<")} />
          <AddPlaceButton_LoggedIn onPress={() => console.log(">>กดปุ่ม เพิ่ม<<")} />
        </View>
        <View style={styles.buttomContainer}>
          <NearButton onPress={() => console.log(">>กดปุ่ม ใกล้สุด<<")} />
        </View>
      </View>
      <AppMapView />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
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
});
