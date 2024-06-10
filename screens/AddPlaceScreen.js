import React, { useEffect, useState, useRef } from 'react';
import { View, Image, PermissionsAndroid, Platform, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewStyle from '../MapViewStyle.json';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation from '@react-native-community/geolocation';
import database from '@react-native-firebase/database';

import MarkWin from '../images/Win-Mark.png';
import MapPinIcon from '../images/MapPin.png';
import myCurrentLocation from '../images/myCurrentLocation.png';
import searchIcon from '../images/searchIcon.png';
import clearIcon from '../images/clearIcon.png';
import backButton from '../images/backButton.png';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AddPlaceScreen = ({ navigation, route }) => {
  const {username} = route.params;
  const [currentLocation, setCurrentLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchLocation, setSearchLocation] = useState(null);
  const [centerCoordinates, setCenterCoordinates] = useState(null);
  const mapRef = useRef(null);
  const inputRef = useRef(null);

  const clearSearchInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.clear();
    }
  };

  const setLocation = (location) => {
    if (mapRef.current && location) {
      mapRef.current.animateToRegion({
        latitude: location.lat,
        longitude: location.lng,
        latitudeDelta: 0.0128,
        longitudeDelta: 0.0128,
      });
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.0128,
            longitudeDelta: 0.0128,
          });
        }
      },
      (error) => {
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location to show it on the map.',
              buttonPositive: 'OK',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getCurrentLocation();
          } else {
            console.log('Location permission denied');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        getCurrentLocation();
      }
    };

    const fetchMarkers = async () => {
      try {
        const snapshot = await database().ref('/MarkWin').once('value');
        const data = snapshot.val();
        const markersArray = Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
          latitude: data[key].latitude,
          longitude: data[key].longitude,
          description: data[key].description,
          images: data[key].images,
        }));
        setMarkers(markersArray);
      } catch (error) {
        console.error(error);
      }
    };

    requestLocationPermission();
    fetchMarkers();
  }, []);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleRegionChangeComplete = (region) => {
    setCenterCoordinates({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  useEffect(() => {
    console.log(centerCoordinates); // This will log the updated value of winCoor
  }, [centerCoordinates]); // Run this effect whenever winCoor changes

  const confirmPlace = () => {
    if (centerCoordinates) {
      navigation.navigate('AddDetails', {
        placeCoor: {
          latitude: centerCoordinates.latitude,
          longitude: centerCoordinates.longitude,
        },
        username,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={backButton} style={[styles.icon]} />
    </TouchableOpacity>
      <View style={styles.MapPin.container}>
        <Image source={MapPinIcon} style={styles.MapPin.icon} />
      </View>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        customMapStyle={MapViewStyle}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation ? currentLocation.latitude : 13.0,
          longitude: currentLocation ? currentLocation.longitude : 101.0,
          latitudeDelta: 15.0,
          longitudeDelta: 15.0,
        }}
        showsUserLocation={true}
        showsCompass={false}
        showsMyLocationButton={false}
        toolbarEnabled={false}
        onRegionChangeComplete={handleRegionChangeComplete}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.name}
            image={MarkWin}
            onPress={() => handleMarkerPress(marker)}
          />
        ))}
      </MapView>
      <View style={styles.head}>
        <Text style={styles.title}>เพิ่มสถานที่ตั้ง</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <GooglePlacesAutocomplete
          ref={inputRef}
          placeholder="ค้นหาสถานที่"
          fetchDetails={true}
          onPress={(data, details = null) => {
            setSearchLocation(details?.geometry?.location);
            setCurrentLocation({
              latitude: details?.geometry?.location?.lat,
              longitude: details?.geometry?.location?.lng,
            });
            setLocation(details?.geometry?.location);
          }}
          query={{
            key: 'AIzaSyBNRNzLV-WydX3b96FZOe2rwi4Oe4W5kGg',
            language: 'th',
            components: 'country:th',
          }}
          styles={{
            container: {
              flex: 1,
            },
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
            },
            textInput: {
              paddingLeft: windowWidth * 0.111,
              paddingRight: windowWidth * 0.111,
              width: windowWidth  * 0.88,
              height: windowHeight * 0.05,
              color: '#5d5d5d',
              fontSize: 16,
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
          enablePoweredByContainer={false}
        >
          <Image source={searchIcon} style={[styles.searchIcon, { width: 20, height: 20 }]} />
          <TouchableOpacity onPress={clearSearchInput}>
            <Image source={clearIcon} style={[styles.clearIcon, { width: 20, height: 20 }]} />
          </TouchableOpacity>
        </GooglePlacesAutocomplete>
      </View>
      <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
        <Image source={myCurrentLocation} style={styles.locationImage} />
      </TouchableOpacity>
      <View style={styles.buttomContainer}>
        <TouchableOpacity style={styles.confirmButton.container} onPress={confirmPlace}>
          <Text style={styles.confirmButton.text}>ยืนยันสถานที่ตั้ง</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  MapPin: {
    container: {
      position: 'absolute',
      top: '48%',
      bottom: '52%',
      left: '49.8%',
      right: '50.2%',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 12,
    },
    icon: {
      width: 40,
      height: 40,
    },
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: windowHeight * 0.035,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'absolute',
    width: windowWidth,
    height: windowHeight * 0.16,
    backgroundColor: '#EFEFEF',
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
  },
  searchBarContainer: {
    position: 'absolute',
    top: windowHeight * 0.089,
    left: 0,
    right: 0,
    zIndex: 2,
    paddingHorizontal: 10,
  },
  searchIcon: {
    resizeMode: 'contain',
    position: 'absolute',
    top: windowHeight * 0.012,
    left: windowWidth * 0.024,
    alignItems: 'flex-start',
  },
  clearIcon: {
    position: 'absolute',
    bottom: windowHeight * 0.02,
    right: windowWidth * 0.024,
  },
  buttomContainer: {
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
    bottom: windowWidth * 0.05,
    right: windowWidth * 0.03,
    width: 40,
    height: 40,
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

export default AddPlaceScreen;

