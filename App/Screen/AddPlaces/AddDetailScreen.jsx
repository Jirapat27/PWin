import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import AddDetail from "./AddDetail";

export default function AddDetailScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>เพิ่มสถานที่ตั้ง</Text>
      </View>
      <AddDetail />
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      width: "100%",
      height: "100%",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 20,
      marginTop: 50,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    
    head:{
      flexDirection: 'row',
      justifyContent:'center',
    },
    headerContainer: {
      position: "absolute",
      zIndex: 10,
      padding: 40,
      width: "100%",
      paddingHorizontal: 10,
    },
  });