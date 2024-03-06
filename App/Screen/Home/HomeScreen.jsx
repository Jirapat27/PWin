import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  PanResponder,
} from "react-native";
import AppMapView from "./AppMapView";
import { StatusBar } from "expo-status-bar";
import Header from "./Header";
import SearchBar from "./SearchBar";
import NearButton from "./NearButton";
import CalculateButton from "../Calculate/CalculateButton";
import AddPlaceButton from "../AddPlaces/AddPlaceButton";
import BottomSheets from "../../Component/BottomSheets";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const [sheetHeight, setSheetHeight] = useState(
    Dimensions.get("window").height / 2
  );
  const [tempHeight, setTempHeight] = useState(
    Dimensions.get("window").height / 2
  );
  const [autoClose, setAutoClose] = useState(false);
  const [pan] = useState(new Animated.ValueXY());

  useEffect(() => {
    Animated.timing(animation, {
      toValue: showBottomSheet ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showBottomSheet]);

  const toggleBottomSheet = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  const closeBottomSheet = () => {
    setShowBottomSheet(false);
    setSheetHeight(Dimensions.get("window").height / 2);
    setTempHeight(Dimensions.get("window").height / 2);
    setAutoClose(false);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (_, gesture) => {
      if (tempHeight > Dimensions.get("window").height / 2) {
        setSheetHeight(tempHeight);
      } else {
        setSheetHeight(Dimensions.get("window").height / 2);
      }
    },
    onPanResponderMove: (_, gesture) => {
      const newHeight = tempHeight - gesture.dy; // Subtract gesture.dy instead of adding
      if (newHeight >= Dimensions.get("window").height / 2) {
        setSheetHeight(newHeight);
        setTempHeight(newHeight);
      }
  
      if (gesture.moveY >= 100 && gesture.dy > 0) { // Adjust the threshold to your preference (e.g., 100)
        setAutoClose(true);
      } else {
        setAutoClose(false);
      }
    },
    onPanResponderRelease: (_, gesture) => {
      if (autoClose) {
        setShowBottomSheet(false);
      } else {
        // If the gesture is still active, continue updating the height based on the last gesture
        const newHeight = tempHeight - gesture.dy;
        if (newHeight >= Dimensions.get("window").height / 2) {
          setSheetHeight(newHeight);
          setTempHeight(newHeight);
        }
      }
  
      // Reset the gesture values
      pan.setValue({ x: 0, y: 0 });
    },
  });
  

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <View style={styles.headerContainer}>
          <Header />
          <SearchBar />
          <View style={styles.rightButton}>
            <CalculateButton onPress={() => console.log("Calculate pressed")} />
            <AddPlaceButton onPress={() => console.log("Add Place pressed")} />
            <TouchableOpacity style={styles.button} onPress={toggleBottomSheet}>
              <Text>Test</Text>
            </TouchableOpacity>
          </View>
        </View>

        <AppMapView onPress={closeBottomSheet} />
        <View style={styles.buttomContainer}>
          <NearButton onPress={() => console.log("Near pressed")} />
        </View>

        {showBottomSheet && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={closeBottomSheet}
          />
        )}
        <Animated.View
          style={[
            styles.sheet,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [Dimensions.get("window").height, 0],
                  }),
                },
              ],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={[styles.bottomSheetContent, { height: sheetHeight }]}>
            <BottomSheets onClose={closeBottomSheet} />
          </View>
        </Animated.View>
      </SafeAreaProvider>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    position: "absolute",
    zIndex: 10,
    padding: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
  buttomContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 750,
    width: "100%",
  },
  rightButton: {
    flexDirection: "column",
    alignItems: "flex-end",
  },
  sheet: {
    backgroundColor: "white",
    padding: 16,
    width: "100%",
    position: "absolute",
    bottom: 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 999,
  },
  button: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheetContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
