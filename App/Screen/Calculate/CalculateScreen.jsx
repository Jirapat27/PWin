import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import MapViewDirections from "react-native-maps-directions";
import { StatusBar } from "expo-status-bar";
import AppMapView_Calculate from "../Home/AppMapView_Calculate";
import MapView, { Marker } from "react-native-maps";

 const GOOGLE_MAPS_APIKEY = "AIzaSyC2PzPPkZ7--zDeI8azWxX4jHkJfQBahFY";
// //*--------------this code **********************----
export default function CalculateScreen({ onMarkerPress }) {
  const navigation = useNavigation();
  const route = useRoute();
  const { destinationLat, destinationLong, placeLat, placeLong, place } =
    route.params;

  const origin = {
    latitude: placeLat,
    longitude: placeLong,
  };
  const destination = {
    latitude: destinationLat,
    longitude: destinationLong,
  };

  const handlePress = () => {
    navigation.navigate("AppMapView_HomeScreen");
  };

  const handleReady = (result) => {
    setDistance(result.distance);
    console.log("Distance:", result.distance); // Log the distance
  };

  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    
    if (distance !== null) {
      if (distance <= 1) {
        setPrice(10);
      } else if (distance <= 2) {
        setPrice(20);
      } else if (distance <= 5) {
        setPrice(25 + (distance - 2) * 5);
      } else if (distance <= 15) {
        setPrice(25 + 15 + (distance - 5) * 10);
      }
    }
  }, [distance]);

  const [selectedMarker, setSelectedMarker] = useState(null);

  console.log("Confirmed Destination's Latitude:", destinationLat);
  console.log("Confirmed Destination's Longitude:", destinationLong);
  console.log("Confirmed P'Win Latitude:", placeLat);
  console.log("Confirmed P'Win Longitude:", placeLong);

  const handleMarkerPress = (data) => {
    setSelectedMarker(data);
  };

  return (
    <View style={styles.container}>

      <View style={styles.head}>
        <Text style={styles.title}>คำนวณราคา</Text>
        

        {place && (
          <View style={styles.leftSide}>
            <Text style={styles.title}>จาก: <Text style={styles.subtitle}>{place.name}</Text>
          </Text>
          </View>        

        )}
        <Text style={styles.title}>
          ถึง: <Text style={styles.subtitle}>ตำแหน่งปลายทาง</Text>
        </Text>
      </View>

      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: origin.latitude,
          longitude: destination.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={origin} title={place.name}>
          <Image source={require('./../../../assets/images/Win-Mark.png')} style={{ width: 40, height: 40 }} />
        </Marker>
        <Marker coordinate={destination} title="Destination" pinColor="red" />
        
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={6}
          strokeColor="#FF9A62"
          //mode="bicycling"
          onReady={handleReady}
        />
      </MapView> 

      <View style={styles.buttomContainer}>
        <View style={styles.leftSide}>
          <Text style={styles.sub}>ราคาโดยประมาณ</Text>
          <Text style={styles.sub}>ระยะทาง</Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.price}>{price} บาท</Text>
          <Text style={styles.distance}>{distance ? distance.toFixed(2) : 0} กิโลเมตร</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.containerConfirm} onPress={handlePress}>
          <Text style={styles.text}>ตกลง</Text>
        </TouchableOpacity>
        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontFamily: "BaiJamjuree-Bold",
  },
  sub: {
    fontSize: 20,
    fontFamily: "BaiJamjuree-Bold",
  },
  rightSide: {

  },
  leftSide: {
    
  },
  price: {
    fontSize: 20,
    fontFamily: "BaiJamjuree-Bold",
  },
  distance: {
    fontSize: 20,
    fontFamily: "BaiJamjuree-Regular",
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    top: 50,
  },
  head: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    height: "20%",  
  },
  up_con: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30, 
  },
  buttomContainer: {
    backgroundColor: "#EFEFEF",
    position: "absolute",
    flexDirection: "row",
    top: 700,
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingBottom: 45,
  },
  containerConfirm: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF8A48",
    alignItems: "center", 
    width:"80%",
    height:55,
    left: "50%",
    bottom: 10,
    transform: [{ translateX: -160 }],
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
});