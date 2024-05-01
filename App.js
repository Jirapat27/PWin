import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

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
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UserLocationContext.Provider value={{ location, setLocation }}>
        <AppIndex />
      </UserLocationContext.Provider>
      <StatusBar style="auto" />
    </View>
  );
}