import { View, StyleSheet, Text, TouchableOpacity  } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import AppMapView from "./AppMapView";
import { StatusBar } from "expo-status-bar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NearButton from "./NearButton";
import CalculateButton from "../Calculate/CalculateButton";
import AddPlaceButton from "../AddPlaces/AddPlaceButton"; 
import LogOutButton from "../Login/LogOut";
import HamburgerMenu from "../Menu/HamburgerMenu";

export default function HomeScreen() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigation = useNavigation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
          <HamburgerMenu onPress={toggleMenu} />
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
        <SearchBar />
        <View style={styles.rightButton}>
          <CalculateButton onPress={() => console.log(">>กดปุ่ม คำนวณ<<")} />
          <AddPlaceButton onPress={() => console.log(">>กดปุ่ม เพิ่ม<<")} />
          <LogOutButton onPress={() => console.log(">>กดปุ่ม ออกจากบัญชี<<")} />
        </View>
      </View>
      <AppMapView />
      <View style={styles.buttomContainer}>
        <NearButton onPress={() => console.log(">>กดปุ่ม ใกล้ที่สุด<<")} />
      </View>
      <StatusBar style="auto" />
    </View>
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
