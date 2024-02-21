import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AppMapView from "../Home/AppMapView";
import AddButton from "./AddButton";
import { StatusBar } from "expo-status-bar";

const latitudeDelta = 0.04;
const longitudeDelta = 0.05;

export default function AddPlaceScreen() {
  const [region, setRegion] = useState({
    latitude: 13.651325176901599,
    longitude: 100.49643743453701,
    latitudeDelta,
    longitudeDelta,
  });

  const onChangeValue = (newRegion) => {
    const { latitude, longitude } = newRegion;
    console.log(newRegion);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);
    setRegion(newRegion);
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>เพิ่มสถานที่ตั้ง</Text>
      </View>
      <View style={styles.headerContainer}></View>
      <AppMapView
        initialRegion={region}
        onRegionChangeComplete={onChangeValue}
      />
      <View style={styles.buttomContainer}>
        <AddButton onPress={() => console.log(">>กดปุ่ม ยืนยันสถานที่<<")} />
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
    top: "50%",
    left: "50%",
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
});
