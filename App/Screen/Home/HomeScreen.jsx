import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import AppMapView from "./AppMapView";
import { StatusBar } from "expo-status-bar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NearButton from "./NearButton";
import CalculateButton from "../Calculate/CalculateButton";
import AddPlaceButton from "../AddPlaces/AddPlaceButton"; 
import AddPicsButton from "../AddPlaces/AddPicsButton"; 
import LogOutButton from "../Login/LogOut";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <View style={styles.headerContainer}>
          <Header />
          <SearchBar />
          <View style={styles.rightButton}>
            <CalculateButton onPress={() => console.log(">>กดปุ่ม คำนวณ<<")} />
            <AddPlaceButton onPress={() => console.log(">>กดปุ่ม เพิ่ม<<")} />
            <LogOutButton onPress={() => console.log(">>กดปุ่ม ออกจากบัญชี<<")} />
            <AddPicsButton onPress={() => console.log(">>กดปุ่ม เพิ่มรูป<<")} />
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