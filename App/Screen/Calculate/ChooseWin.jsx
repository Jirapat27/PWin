// import React, { useState, useEffect } from "react";
// import { Text, TextInput, TouchableOpacity, Image, View, StyleSheet, } from "react-native";
// import { StatusBar } from "expo-status-bar";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { useContext } from "react/cjs/react.development";
// import { UserLocationContext } from "../../Context/UserLocationContext";

// import AppMapView_MarkOnly from "../Home/AppMapView_MarkOnly";
// const ChooseWin = () => {
//   const navigation = useNavigation();

//   const { location, setLocation } = useContext(UserLocationContext);
//   const [searchLocation, setSearchLocation] = useState(null);
//   const [selectedMarker, setSelectedMarker] = useState(null);

//   useEffect(() => {
//     console.log("selectedMarker",selectedMarker);
//   },[selectedMarker]);

//   const handleMarkerPress = (data) => {
//     setSelectedMarker(data);
//   };
//   const route = useRoute();

//   // Extract latitude and longitude from route params
//   const { destinationLat, destinationLong, placeLat, placeLong } = route.params;
  
//   const handlePress = () => {
//     const data = {
//       destinationLat: destinationLat,
//       destinationLong: destinationLong,
//       placeLat: selectedMarker.latitude,
//       placeLong: selectedMarker.longitude,
//       place: selectedMarker
//     }
//     console.log(data);
//     navigation.navigate("CalculateScreen", data);
    
//   };

//   useEffect(() => {
//     console.log("Destination's Latitude:", destinationLat);
//     console.log("Destination's Longitude:", destinationLong);
//     // You can use Destination's latitude and longitude here as needed
//   }, [destinationLat, destinationLong]);

//   useEffect(() => {
//     if (searchLocation) {
//       setLocation({
//         latitude: searchLocation.lat,
//         longitude: searchLocation.lng,
//       });
//     }
//   }, [searchLocation]);
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <GooglePlacesAutocomplete
//             placeholder="ค้นหาสถานที่"
//             fetchDetails={true}
//             onPress={(data, details = null) => {
//               setSearchLocation(details?.geometry?.location);
//             }}
//             query={{
//               key: "AIzaSyBNRNzLV-WydX3b96FZOe2rwi4Oe4W5kGg",
//               language: "th",
//               components: "country:th",
//             }}
//             //styles={styles}
//             enablePoweredByContainer={false}
//             searchedLocation={(location) =>
//               setLocation({
//                 latitude: location.lat,
//                 longitude: location.lng,
//               })
//             }
//           ></GooglePlacesAutocomplete>
//         </View>

//         <AppMapView_MarkOnly onMarkerPress={handleMarkerPress}/>

//         <View style={styles.buttomContainer}>
//           <TouchableOpacity
//             style={styles.containerConfirm}
//             onPress={handlePress}
//           >
//             <Text style={styles.text}>เลือกจุดวินมอเตอร์ไซค์</Text>
//           </TouchableOpacity>
//         </View>

//         <StatusBar style="auto" />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   buttomContainer: {
//     position: "absolute",
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 750,
//     width: "100%",
//   },
//   containerConfirm: {
//     flexDirection: "column",
//     backgroundColor: "#FF9A62",
//     padding: 10,
//     borderRadius: 10,
//     alignItems: "center",
//     width: 320,
//     height: 55,
//   },
//   text: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "600",
//   },
//   container: {
//     width: "100%",
//     height: "100%",
//   },
//   pinposition: {
//     top: "50%",
//     left: "50%",
//     marginLeft: -24,
//     marginTop: -48,
//     position: "absolute",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 20,
//     marginTop: 50,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   head: {
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   headerContainer: {
//     position: "absolute",
//     zIndex: 10,
//     padding: 40,
//     width: "100%",
//     paddingHorizontal: 10,
//     height: "auto",
//   },
//   buttomContainer: {
//     position: "absolute",
//     flexDirection: "row",
//     justifyContent: "center",
//     marginTop: 750,
//     width: "100%",
//   },
//   textInput: {
//     width: 300,
//     height: 50,
//     borderRadius: 5,
//     paddingHorizontal: 50,
//     backgroundColor: "white",
//     fontSize: 20,
//     fontFamily: "BaiJamjuree-Medium",
//   },
//   listView: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     borderRadius: 5,
//     backgroundColor: "#fff",
//   },
//   pinposition: {
//     top: "50%",
//     left: "50%",
//     marginLeft: -24,
//     marginTop: -48,
//     position: "absolute",
//   },
//   pin: {
//     height: 50,
//     width: 50,
//   },
// });
// export default ChooseWin;

import React, { useState, useEffect, useRef, useContext } from "react";
import { Text, TextInput, TouchableOpacity, Image, View, StyleSheet, } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { UserLocationContext } from "../../Context/UserLocationContext";
import AppMapView_MarkSet from "../Home/AppMapView_MarkSet";

const ChooseWin = () => {
  const navigation = useNavigation();

  const { location, setLocation } = useContext(UserLocationContext);
  const [searchLocation, setSearchLocation] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const inputRef = useRef(null);
  const clearSearchInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.clear(); 
    }
  };

  useEffect(() => {
    console.log("selectedMarker",selectedMarker);
  },[selectedMarker]);

  const handleMarkerPress = (data) => {
    setSelectedMarker(data);
  };
  const route = useRoute();

  // Extract latitude and longitude from route params
  const { destinationLat, destinationLong, placeLat, placeLong } = route.params;
  
  const handlePress = () => {
    const data = {
      destinationLat: destinationLat,
      destinationLong: destinationLong,
      placeLat: selectedMarker.latitude,
      placeLong: selectedMarker.longitude,
      place: selectedMarker
    }
    console.log(data);
    navigation.navigate("CalculateScreen", data);
    
  };

  useEffect(() => {
    console.log("Destination's Latitude:", destinationLat);
    console.log("Destination's Longitude:", destinationLong);
    // You can use Destination's latitude and longitude here as needed
  }, [destinationLat, destinationLong]);

  useEffect(() => {
    if (searchLocation) {
      setLocation({
        latitude: searchLocation.lat,
        longitude: searchLocation.lng,
      });
    }
  }, [searchLocation]);
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.searchBarContainer}>
              <GooglePlacesAutocomplete
                ref={inputRef}
                placeholder="ค้นหาพื้นที่จุดวิน"
                fetchDetails={true}
                onPress={(data, details = null) => {
                  setSearchLocation(details?.geometry?.location);
                }}
                query={{
                  key: "AIzaSyBNRNzLV-WydX3b96FZOe2rwi4Oe4W5kGg",
                  language: "th",
                  components: "country:th",
                }}
                styles={styles.SearchPlace}
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
            <TouchableOpacity onPress={clearSearchInput} style={styles.clearButton}>
              <Ionicons name="close" size={25} color="#A7A7A7" />
            </TouchableOpacity>
          </View>
        </View>

        <AppMapView_MarkSet onMarkerPress={handleMarkerPress}/>

        <View style={styles.buttomContainer}>
          <TouchableOpacity
            style={styles.containerConfirm}
            onPress={handlePress}
          >
            <Text style={styles.text}>เลือกจุดวินมอเตอร์ไซค์</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 750,
    width: "100%",
  },
  containerConfirm: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 320,
    height: 55,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  container: {
    width: "100%",
    height: "100%",
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
    height: "auto",
  },
  buttomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 750,
    width: "100%",
  },
  textInput: {
    width: 300,
    height: 50,
    borderRadius: 5,
    paddingHorizontal: 50,
    backgroundColor: "white",
    fontSize: 20,
    fontFamily: "BaiJamjuree-Medium",
  },
  listView: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#fff",
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
  listView: {
    width: "100%",
    borderWidth: 1,
    height: 200,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fff",
    zIndex: 2,
  },
  searchIcon: {
    position: "absolute",
    top: 10,
    left: 10,
    color: "#FF9A62",
    alignItems: "flex-start",
  },
  SearchPlace: {
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
  },
  clearButton: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 20,
  },
});
export default ChooseWin;