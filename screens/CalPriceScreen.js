import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewStyle from '../MapViewStyle.json';

import MarkWin from '../images/Win-Mark.png'; // Import the image for the origin marker
import myCurrentLocation from '../images/myCurrentLocation.png';
import backButton from '../images/backButton.png';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC2PzPPkZ7--zDeI8azWxX4jHkJfQBahFY';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const CalPriceScreen = ({ navigation, route }) => {
  const { winData, destinationCoor } = route.params; // Receive winCoor from route.params
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(0);
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapRef = useRef(null);

  const getCurrentLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        if (mapRef.current) {
          const midPoint = {
            latitude: (winData.latitude + destinationCoor.latitude) / 2,
            longitude: (winData.longitude + destinationCoor.longitude) / 2,
          };
          mapRef.current.animateToRegion({
            latitude: midPoint.latitude,
            longitude: midPoint.longitude,
            latitudeDelta: Math.abs(destinationCoor.latitude - winData.latitude) * 2,
            longitudeDelta: Math.abs(destinationCoor.longitude - winData.longitude) * 2,
          });
        }
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, [winData, destinationCoor]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const origin = {
    latitude: winData.latitude,
    longitude: winData.longitude,
  };
  const destination = {
    latitude: destinationCoor.latitude,
    longitude: destinationCoor.longitude,
  };

  const handleReady = (result) => {
    setDistance(result.distance);
  };

  const handleConfirmPress = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    if (distance !== null) {
      let calculatedPrice = 0;
      if (distance <= 1) {
        calculatedPrice = 10;
      } else if (distance <= 2) {
        calculatedPrice = 20;
      } else if (distance <= 15) {
        calculatedPrice = 25 + (distance - 2) * 5;
      } else {
        calculatedPrice = 25 + 15 + (distance - 5) * 10;
      }
      // Round the price to the nearest 5 or 0
      const unitDigit = calculatedPrice % 10;
      calculatedPrice = unitDigit !== 0 ? (unitDigit <= 5 ? calculatedPrice - unitDigit : calculatedPrice + (10 - unitDigit)) : calculatedPrice;
      setPrice(prevPrice => {
        if (prevPrice !== calculatedPrice) {
          return calculatedPrice;
        }
        return prevPrice;
      });
    }
  }, [distance]); // Remove price from the dependency array

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={backButton} style={[styles.icon]} />
    </TouchableOpacity>
      <View style={styles.head}>
        <Text style={styles.title}>คำนวณราคา</Text>
        <Text style={styles.title}>จาก: {winData.name}</Text>
        <Text style={styles.title}>ถึง: ตำแหน่งปลายทาง</Text>
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: destinationCoor ? destinationCoor.latitude : 13.0, // Adjusted initial region
          longitude: destinationCoor ? destinationCoor.longitude : 101.0, // Adjusted initial region
          latitudeDelta: 0.0128,
          longitudeDelta: 0.0128,
        }}
        showsUserLocation={true}
        showsCompass={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
      >
        <Marker coordinate={origin} title={winData.name} image={MarkWin} />
        <Marker coordinate={destination} title="Destination" />
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={6}
          strokeColor="#FF9A62"
          onReady={handleReady}
          optimizeWaypoints={true} // Add this line
        />
      </MapView>
      <View style={styles.buttomContainer}>
        <View style={styles.leftSide}>
          <Text style={styles.sub}>ราคาโดยประมาณ</Text>
          <Text style={styles.sub}>ระยะทาง</Text>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.price}>{price} บาท</Text>
          <Text style={styles.distance}>
            {distance ? distance.toFixed(2) : 0} กิโลเมตร
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
        <Image source={myCurrentLocation} style={styles.locationImage} />
      </TouchableOpacity>
      <View style={styles.confirmContainer}>
        <TouchableOpacity style={styles.confirmButton.container} onPress={handleConfirmPress}>
          <Text style={styles.confirmButton.text}>ยืนยัน</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  icon:{
    width: 40,
    height: 40,
  },
  head: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    width: windowWidth,
    height: windowHeight * 0.16,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flexDirection: 'row',
    justifyContent: 'center',
    top: windowHeight * 0.03,
    color: 'black',
  },
  buttomContainer: {
    backgroundColor: '#EFEFEF',
    position: 'absolute',
    flexDirection: 'row',
    bottom: windowHeight * 0.001,
    width: windowWidth,
    height: windowHeight * 0.16,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    paddingBottom: windowHeight * 0.071,
  },
  containerConfirm: {
    flexDirection: 'column',
    backgroundColor: '#FF9A62',
    borderRadius: 10,
    alignItems: 'center', 
    justifyContent: 'center', 
    width: '80%',
    height: 55,
    position: 'absolute',
    bottom: windowHeight * 0.01, // Adjust the positioning here
    left: windowWidth * 0.1, // Center the button horizontally
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  sub: {
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Bold',
    color: 'black',
  },
  rightSide: {
  },  
  leftSide: {
  },
  price: {
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Bold',
    color: 'black',
  },
  distance: {
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Regular',
    color: 'black',
  },
  confirmContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: windowWidth * 0.025,
    width: '100%',
  },
  confirmButton: {
    container: {
      flexDirection: 'column',
      backgroundColor: '#FF9A62',
      padding: 10,
      borderRadius: 20,
      alignItems: 'center',
      height: 59,
      width: windowWidth * 0.645,
    },
    text: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'semibold',
      fontFamily: 'BaiJamjuree-SemiBold',
    },
  },
  locationButton: {
    position: 'absolute',
    top: windowHeight * 0.75,
    right: windowWidth * 0.03,
    backgroundColor: '#FF9A62',
    borderWidth: 0.33,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});

export default CalPriceScreen;
