import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HomeScreen from "./App/Screen/Home/HomeScreen";
import HomeScreen_SBmerge from "./App/Screen/Home/HomeScreen_SBmerge";
import LandingPage from "./App/Screen/LandingPage/LandingPage";
import CalculateScreen from "./App/Screen/Calculate/CalculateScreen";
import AddPlaceScreen from "./App/Screen/AddPlaces/AddPlaceScreen";
import AddPics from "./App/Screen/AddPlaces/AddPics";
import LogInScreen from "./App/Screen/Login/LogInScreen";
import SignUpScreen from "./App/Screen/Login/SignUpScreen";
import LogInScreen_cal from "./App/Screen/Login/LogInScreen_cal";
import SignUpScreen_cal from "./App/Screen/Login/SignUpScreen_cal";
import ForgetPasswordScreen from "./App/Screen/Login/ForgetPasswordScreen";
import AddDetailScreen from "./App/Screen/AddPlaces/AddDetailScreen";
import CommentForm from "./App/Component/CommentForm";
import Comment from "./App/Component/Comment";
import ChoosePlace from "./App/Screen/Calculate/ChoosePlace";
import ChooseWin from "./App/Screen/Calculate/ChooseWin";

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
        <Stack.Screen name="HomeScreen_SBmerge" 
          component={HomeScreen_SBmerge} />
        <Stack.Screen name="CalculateScreen"
          component={CalculateScreen} />
        <Stack.Screen name="AddDetailScreen" 
          component={AddDetailScreen} />
        <Stack.Screen name="AddPlaceScreen"
          component={AddPlaceScreen} />
        <Stack.Screen name="AddPics"
          component={AddPics} />
        <Stack.Screen name="LogInScreen"
          component={LogInScreen}/> 
        <Stack.Screen name="SignUpScreen" 
          component={SignUpScreen}/>
        <Stack.Screen name="LogInScreen_cal"
          component={LogInScreen_cal}/> 
        <Stack.Screen name="SignUpScreen_cal" 
          component={SignUpScreen_cal}/>
        <Stack.Screen name="ForgetPasswordScreen"
          component={ForgetPasswordScreen}/>
        <Stack.Screen name="CommentForm"
          component={CommentForm}/>
        <Stack.Screen name="Comment"
          component={Comment}/>
        <Stack.Screen name="ChoosePlace"
          component={ChoosePlace} />
        <Stack.Screen name="ChooseWin"
          component={ChooseWin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
