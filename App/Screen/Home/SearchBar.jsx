import { View, StyleSheet } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({searchedLocation}) {
  return (
    <View style={{ flex: 1 }}>

      <GooglePlacesAutocomplete
            placeholder="ค้นหาสถานที่"
            fetchDetails ={true}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              //console.log(data, details);
              searchedLocation(details?.geometry?.location)
            }}
            query={{
              key: "AIzaSyBNRNzLV-WydX3b96FZOe2rwi4Oe4W5kGg",
              language: "th",
              components: "country:th",
              
            }}
            styles={styles}
            
            enablePoweredByContainer={false}
          />
      <Ionicons name="search" size={35} style={styles.searchIcon} />
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
    fontFamily: "BaiJamjuree-Medium",
  },
  listView: {
    borderWidth: 1,
    height: 200,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  description: {
    fontSize: 16,
  },
  // row: {
  //   padding: 10,
  // },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "#FF9A62",
    alignItems: "flex-start",
  },
});
