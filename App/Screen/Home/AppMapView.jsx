import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Dimensions, Animated, TouchableOpacity, PanResponder } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewStyle from './../../Utils/MapViewStyle.json';
import { UserLocationContext } from '../../Context/UserLocationContext';
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import markerWin from './../../../assets/images/Win-Mark.png';
import Header from './Header';
import SearchBar from './SearchBar';
import NearButton from './NearButton';
import CalculateButton from '../Calculate/CalculateButton';
import AddPlaceButton from '../AddPlaces/AddPlaceButton';
import BottomSheets from '../../Component/BottomSheets';

export default function AppMapView({ initialRegion, onRegionChangeComplete, SheetHeight, bottomSheetHeight }) {
  const { location } = useContext(UserLocationContext);
  const [places, setPlaces] = useState([]);
  const [sheetHeight, setSheetHeight] = useState(Dimensions.get('window').height / 1.2);
  const [pan] = useState(new Animated.ValueXY());
  const [autoClose, setAutoClose] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [tempHeight, setTempHeight] = useState(Dimensions.get('window').height / 1.2);
  const [sheetPlaces,setSheetPlaces] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const placesRef = ref(db, 'MarkWin/');
      onValue(placesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const placesArray = Object.values(data);
          setPlaces(placesArray);
        } else {
          console.log(data, 'nodata');
        }
      });
    };
    fetchData();
    
  }, []);

  useEffect(() => {
    console.log(places,"places");
  }, [places]);

  const defaultRegion = {
    latitude: 13.651325176901599,
    longitude: 100.49643743453701,
    latitudeDelta: 0.01,
    longitudeDelta: 0.02,
  };

  const region = location
    ? {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.02,
      }
    : initialRegion || defaultRegion;

  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const toggleBottomSheet = (place) => {
    setShowBottomSheet(!showBottomSheet);
    if (!showBottomSheet) {
      setSheetHeight(Dimensions.get('window').height / 0.65);
      setTempHeight(Dimensions.get('window').height / 0.65);
      setSheetPlaces(place)
    } else {
      setSheetHeight(bottomSheetHeight);
      setTempHeight(bottomSheetHeight);
    }
  };


  const closeBottomSheet = () => {
    setShowBottomSheet(false);
    setSheetHeight(Dimensions.get('window').height / 1.2);
    setTempHeight(Dimensions.get('window').height / 1.2);
    setAutoClose(false);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gesture) => {
      if (tempHeight > Dimensions.get('window').height / 1.2) {
        setSheetHeight(tempHeight);
      } else {
        setSheetHeight(Dimensions.get('window').height / 1.2);
      }
    },
    onPanResponderMove: (_, gesture) => {
      const newHeight = tempHeight - gesture.dy;
      if (newHeight >= Dimensions.get('window').height / 1.2) {
        setSheetHeight(newHeight);
        setTempHeight(newHeight);
      }
      if (gesture.moveY >= 700 && gesture.dy > 0) {
        setAutoClose(true);
        setSheetHeight(Dimensions.get('window').height / 1.2);
      } else {
        setAutoClose(false);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (autoClose) {
        setShowBottomSheet(false);
      } else {
        const newHeight = tempHeight - gesture.dy;
        if (newHeight >= Dimensions.get('window').height / 1.2) {
          setSheetHeight(newHeight);
          setTempHeight(newHeight);
        }
      }
      pan.setValue({ x: 0, y: 0 });
    },
  });

  return (
    <SafeAreaProvider style={styles.container}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapViewStyle}
          region={region}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation
          followsUserLocation
        >
          {places.map((place, index) => (
            <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            
            onPress={() => toggleBottomSheet(place)}
            image={markerWin}
            />
          ))}
        </MapView>
        {showBottomSheet && (
          <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={closeBottomSheet} />
        )}
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get('window').height, 0],
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={[styles.bottomSheetContent, { height: sheetHeight }]}>
          <BottomSheets sheetPlaces={sheetPlaces} location={location} onClose={closeBottomSheet} />
          </View>
        </Animated.View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  headerContainer: {
    position: 'absolute',
    zIndex: 10,
    padding: 40,
    width: '100%',
    paddingHorizontal: 10,
  },
  buttomContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 750,
    width: '100%',
  },
  rightButton: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  sheet: {
    backgroundColor: 'white',
    padding: 16,
    width: '100%',
    position: 'absolute',
    bottom: 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100000000,
  },
});
