/* import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";


import * as Location from "expo-location";
import { UserLocationContext } from "./App/Context/UserLocationContext";

import AppIndex from "./index";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [fontsLoaded] = useFonts({
    "BaiJamjuree-Medium": require("./assets/fonts/BaiJamjuree-Medium.ttf"),
    "BaiJamjuree-Bold": require("./assets/fonts/BaiJamjuree-Bold.ttf"),
    "BaiJamjuree-Regular": require("./assets/fonts/BaiJamjuree-Regular.ttf"),
    "BaiJamjuree-SemiBold": require("./assets/fonts/BaiJamjuree-SemiBold.ttf"),
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      console.log( location.coords);
    }
  }, [location]);


  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserLocationContext.Provider
     value={{ location, setLocation }}>
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AppIndex />
        <StatusBar style="auto" />
    </View>
    </UserLocationContext.Provider>
      
  );
}

 */

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions"; // Import Permissions
import { UserLocationContext } from "./App/Context/UserLocationContext";
import AppIndex from "./index";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "BaiJamjuree-Medium": require("./assets/fonts/BaiJamjuree-Medium.ttf"),
    "BaiJamjuree-Bold": require("./assets/fonts/BaiJamjuree-Bold.ttf"),
    "BaiJamjuree-Regular": require("./assets/fonts/BaiJamjuree-Regular.ttf"),
    "BaiJamjuree-SemiBold": require("./assets/fonts/BaiJamjuree-SemiBold.ttf"),
  });
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Request location permission
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } catch (error) {
        setErrorMsg("Failed to get location");
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      console.log("Latitude:", location.latitude);
      console.log("Longitude:", location.longitude);
    }
  }, [location]);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <AppIndex />
        <StatusBar style="auto" />
      </View>
    </UserLocationContext.Provider>
  );
}
