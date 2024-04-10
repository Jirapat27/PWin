import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HomeScreen from "./App/Screen/Home/HomeScreen";
import LandingPage from "./App/Screen/LandingPage/LandingPage";
import CalculateScreen from "./App/Screen/Calculate/CalculateScreen";
import AddPlaceScreen from "./App/Screen/AddPlaces/AddPlaceScreen";
import LogInScreen from "./App/Screen/Login/LogInScreen";
import SignUpScreen from "./App/Screen/Login/SignUpScreen";
import ForgetPasswordScreen from "./App/Screen/Login/ForgetPasswordScreen";
import AddDetailScreen from "./App/Screen/AddPlaces/AddDetailScreen";
import Howto from "./App/Screen/Menu/Howto";
import RateService from "./App/Screen/Menu/RateService";

const Stack = createStackNavigator();

export default function AppIndex() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen"
        screenOptions={{headerShown: false,}}>
        <Stack.Screen name="LandingPage" 
          component={LandingPage} />
          <Stack.Screen name="HomeScreen" 
          component={HomeScreen} />
        <Stack.Screen name="CalculateScreen"
          component={CalculateScreen} />
        <Stack.Screen name="AddDetailScreen" 
          component={AddDetailScreen} />
        <Stack.Screen name="AddPlaceScreen"
          component={AddPlaceScreen} />
        <Stack.Screen name="LogInScreen"
          component={LogInScreen}
          screenOptions={{headerShown: true,}} /> 
        <Stack.Screen name="SignUpScreen" 
          component={SignUpScreen} 
          screenOptions={{headerShown: true,}} />
        <Stack.Screen name="ForgetPasswordScreen" 
          component={ForgetPasswordScreen} 
          screenOptions={{headerShown: true,}} />
        <Stack.Screen name="Howto" 
          component={Howto} 
          screenOptions={{headerShown: true,}} />
        <Stack.Screen name="RateService" 
          component={RateService} 
          screenOptions={{headerShown: true,}} />  
        </Stack.Navigator>
    </NavigationContainer>
  );
}
