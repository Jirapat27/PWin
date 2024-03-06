import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar() {
  return (
    <View>
      <GooglePlacesAutocomplete
        placeholder="ค้นหาจุดให้บริการวินมอเตอร์ไซค์"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyAO1Ne2CHMLgMd6bncyGiHMA8SrZtqxA9c",
          language: "th",
        }}
        styles={styles}
        enablePoweredByContainer={false}
      />
      <Ionicons
        name="search"
        size={35}
        style={styles.searchIcon}
      /> 
    </View>
  );
}
const styles = StyleSheet.create({
  textInput: {
    width: 300,
    height: 55,
    borderRadius: 10,
    paddingHorizontal: 50,
    backgroundColor: "white",
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Medium'
  },
  listView: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
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
    color: '#FF9A62',
    alignItems: "flex-start"
  },
});
