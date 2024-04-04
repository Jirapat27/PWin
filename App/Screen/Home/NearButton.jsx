// import { Text, TouchableOpacity, StyleSheet } from "react-native";
// import React, { useEffect, useState } from "react";

// const NearButton = ({ onPress }) => {

//   const [location, setLocation] = useState(null);
//   const [errorMsg, setErrorMsg] = useState(null);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//     })();
//   }, []);

//   let text = 'Waiting..';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
//   }
//   return (
//     <TouchableOpacity style={styles.container} onPress={onPress}>
//       <Text style={styles.text}>ใกล้ที่สุด</Text>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "column",
//     backgroundColor: "#FF9A62",
//     padding: 10,
//     borderRadius: 20,
//     alignItems: "center",
//     width: 125,
//     height: 59,
//   },
//   text: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "600",
//     fontFamily: "BaiJamjuree-SemiBold",
//   },
// });

// export default NearButton;
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from 'expo-location'; // Import Location module

const NearButton = ({ onPress }) => {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log("location :",location);
        console.log("lat :", location.coords.latitude);
        console.log("long :", location.coords.longitude);
      } catch (error) {
        setErrorMsg('Error getting location');
        console.log("cant get locaation");
      }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.coords.latitude}, Longitude: ${location.coords.longitude}`;
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>ใกล้ที่สุด</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    width: 125,
    height: 59,
  },
  text: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    fontFamily: "BaiJamjuree-SemiBold",
  },
});

export default NearButton;
