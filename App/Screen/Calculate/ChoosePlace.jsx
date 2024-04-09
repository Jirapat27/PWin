// import React, { useState, useEffect } from "react";
// import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
// import AppMapView_MarkOnly from "../Home/AppMapView_MarkOnly";
// import { StatusBar } from "expo-status-bar";
// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { Ionicons } from "@expo/vector-icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useNavigation } from "@react-navigation/native";
// import { useContext } from "react/cjs/react.development";
// import { UserLocationContext } from "../../Context/UserLocationContext";

// const ChoosePlace = ({onMarkerPress }) => {
//   const navigation = useNavigation();

//   const { location, setLocation } = useContext(UserLocationContext);
//   const [searchLocation, setSearchLocation] = useState(null);

//   const handlePress = () => {
//     navigation.navigate("ChooseWin", {
//       destinationLat: region.latitude,
//       destinationLong: region.longitude,
//     });
//   };
//   const [selectedMarker, setSelectedMarker] = useState(null);
//   useEffect(() => {
//     if (searchLocation) {
//       setLocation({
//         latitude: searchLocation.lat,
//         longitude: searchLocation.lng,
//       });
//     }
//   }, [searchLocation]);

//   const initialRegion = {
//     latitude: searchLocation?.latitude,
//     longitude: searchLocation?.longitude,
//   };

//   const [region, setRegion] = useState(initialRegion);

//   const onChangeValue = (newRegion) => {
//     const { latitude, longitude } = newRegion;
//     console.log("Desired Destination's Latitude:", latitude);
//     console.log("Desired Destination's Longitude:", longitude);
//     console.log(newRegion);
//     setRegion(newRegion);
//     console.log("newRegion:", newRegion);
//   };
//   const handleMarkerPress = (data) => {
//     setSelectedMarker(data);
//   };
//   return (
//     <SafeAreaView>
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <GooglePlacesAutocomplete
//             placeholder="ค้นหาจุดหมายปลายทาง"
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

//         <AppMapView_MarkOnly
//             onMarkerPress={handleMarkerPress} 
//             initialRegion={region}
//             onRegionChangeComplete={newRegion => {
//               onChangeValue(newRegion);
//               setRegion(newRegion);
//             }}
//         />
//         <View style={styles.pinposition}>
//           <Image
//             style={styles.pin}
//             source={require("./../../../assets/images/MapPin.png")}
//           />
//         </View>
//         <View style={styles.buttomContainer}>
//           <TouchableOpacity
//             style={styles.containerConfirm}
//             onPress={handlePress}
//           >
//             <Text style={styles.text}>ยืนยันปลายทาง</Text>
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

// export default ChoosePlace;


import React, { useState, useEffect, useRef, useContext } from "react";
import { Text, TouchableOpacity, Image, View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { UserLocationContext } from "../../Context/UserLocationContext";

import AppMapView_MarkOnly from "../Home/AppMapView_MarkOnly";
import AppMapView from "../Home/AppMapView";

const ChoosePlace = ({onMarkerPress}) => {
  const navigation = useNavigation();

  const { location, setLocation } = useContext(UserLocationContext);
  const [searchLocation, setSearchLocation] = useState(null);

  const inputRef = useRef(null);
  const clearSearchInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.clear(); 
    }
  };

  const handlePress = () => {
    navigation.navigate("ChooseWin", {
      destinationLat: region.latitude,
      destinationLong: region.longitude,
    });
  };
  const [selectedMarker, setSelectedMarker] = useState(null);
  useEffect(() => {
    if (searchLocation) {
      setLocation({
        latitude: searchLocation.lat,
        longitude: searchLocation.lng,
      });
    }
  }, [searchLocation]);

  const initialRegion = {
    latitude: searchLocation?.latitude,
    longitude: searchLocation?.longitude,
  };

  const [region, setRegion] = useState(initialRegion);

  const onChangeValue = (newRegion) => {
    const { latitude, longitude } = newRegion;
    console.log("Desired Destination's Latitude:", latitude);
    console.log("Desired Destination's Longitude:", longitude);
    // console.log(newRegion);
    // setRegion(newRegion);
    // console.log("newRegion:", newRegion);
  };
  const handleMarkerPress = (data) => {
    setSelectedMarker(data);
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <GooglePlacesAutocomplete 
            ref={inputRef}
            placeholder="ค้นหาจุดหมายปลายทาง"
            fetchDetails={true}
            onPress={(data, details = null) => {
              setSearchLocation(details?.geometry?.location);
            }}
            query={{
              key: "AIzaSyBNRNzLV-WydX3b96FZOe2rwi4Oe4W5kGg",
              language: "th",
              components: "country:th",
            }}
            //styles={styles}
            enablePoweredByContainer={false}
            searchedLocation={(location) =>
              setLocation({
                latitude: location.lat,
                longitude: location.lng,
              })
            }
          />
          <TouchableOpacity onPress={clearSearchInput} style={styles.clearButton}>
            <Ionicons name="close" size={25} color="#FF9A62" />
          </TouchableOpacity>
        </View>

        <AppMapView_MarkOnly
            onMarkerPress={handleMarkerPress} 
            initialRegion={region}
            onRegionChangeComplete={newRegion => {
              onChangeValue(newRegion);
              setRegion(newRegion);
            }}
        />
        <View style={styles.pinposition}>
          <Image
            style={styles.pin}
            source={require("./../../../assets/images/MapPin.png")}
          />
        </View>
        <View style={styles.buttomContainer}>
          <TouchableOpacity
            style={styles.containerConfirm}
            onPress={handlePress}
          >
            <Text style={styles.text}>ยืนยันปลายทาง</Text>
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
  pinposition: {
    top: "56%",
    left: "49.7%",
    marginLeft: -24,
    marginTop: -48,
    position: "absolute",
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
    marginTop: 550,
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
  clearButton: {
    position: "absolute",
    top: 48,
    right: 12,
    zIndex: 1,
  },
});


export default ChoosePlace;