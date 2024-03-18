import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ConfirmButton from "./ConfirmButton";
import { StatusBar } from "expo-status-bar";
import AppMapView from "../Home/AppMapView";


export default function CalculateScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>คำนวณราคา</Text>
        <Text style={styles.title}>จาก: <Text style={styles.subtitle}>โลตัส บ้านสวนธน</Text></Text>
        <Text style={styles.title}>ถึง: <Text style={styles.subtitle}>ตำแหน่งปลายทาง</Text></Text>
      </View>

      <AppMapView/>

        <View style={styles.buttomContainer}>
        <Text style={styles.buttomtitle}>ราคาโดยประมาณ <Text style={styles.buttomsubtitle}>30 บาท</Text></Text>
        <Text style={styles.buttomtitle}>ระยะทาง <Text style={styles.buttomsubtitle}>0.5 กม.</Text></Text>
        <Text/>
        <ConfirmButton />
        </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
      backgroundColor: "white",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'center',
      top: 50,
    },
    subtitle: {
      fontWeight: "normal",
      flexDirection: "column",
    },
    head:{
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: "#EFEFEF",
      height: "20%",
    },
    buttomContainer: {
      backgroundColor: "#EFEFEF",
      position: "absolute",
      flexDirection: "column",
      top: 700,
      width: "100%",
      height: "25%",
      alignItems: "center",
    },
    buttomtitle: {
      paddingLeft: 20,
      fontSize: 20,
      marginBottom: 10,
      top: 20,
    },
    buttomsubtitle: {
      fontWeight: "bold",
    }
  });