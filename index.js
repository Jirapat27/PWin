import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AppMapView_HomeScreen from "./App/Screen/Home/AppMapView_HomeScreen";
import HomeScreen_SBmerge from "./App/Screen/Home/HomeScreen_SBmerge";
import LandingPage from "./App/Screen/LandingPage/LandingPage";
import CalculateScreen from "./App/Screen/Calculate/CalculateScreen";
import AddPlaceScreen from "./App/Screen/AddPlaces/AddPlaceScreen";
import LogInScreen from "./App/Screen/Login/LogInScreen";
import SignUpScreen from "./App/Screen/Login/SignUpScreen";
import LogInScreen_HamMenu from "./App/Screen/Login/LogInScreen_HamMenu";
import SignUpScreen_HamMenu from "./App/Screen/Login/SignUpScreen";
import LogInScreen_comment from "./App/Screen/Login/LogInScreen_comment";
import SignUpScreen_comment from "./App/Screen/Login/SignUpScreen_comment";
import ForgetPasswordScreen from "./App/Screen/Login/ForgetPasswordScreen";
import AddDetailScreen from "./App/Screen/AddPlaces/AddDetailScreen";
import CommentForm from "./App/Component/CommentForm";
import ChoosePlace from "./App/Screen/Calculate/ChoosePlace";
import ChooseWin from "./App/Screen/Calculate/ChooseWin";
import ReportWin from "./App/Screen/Menu/ReportWin";
import ReportApp from "./App/Screen/Menu/ReportApp";
import Howto from "./App/Screen/Menu/Howto";
import PageScreen from "./App/Screen/Menu/PageScreen";
import PageScreen2 from "./App/Screen/Menu/PageScreen2";
import RateService from "./App/Screen/Menu/RateService";

const Stack = createStackNavigator();

export default function AppIndex() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen"
        screenOptions={{headerShown: false,}}>
        <Stack.Screen name="LandingPage" 
          component={LandingPage} />
        <Stack.Screen name="HomeScreen_SBmerge" 
          component={HomeScreen_SBmerge} />
        <Stack.Screen name="AppMapView_HomeScreen" 
          component={AppMapView_HomeScreen} />
        <Stack.Screen name="CalculateScreen"
          component={CalculateScreen} />
        <Stack.Screen name="AddDetailScreen" 
          component={AddDetailScreen} />
        <Stack.Screen name="AddPlaceScreen"
          component={AddPlaceScreen} />
        <Stack.Screen name="LogInScreen"
          component={LogInScreen}/> 
        <Stack.Screen name="SignUpScreen" 
          component={SignUpScreen}/>
        <Stack.Screen name="LogInScreen_HamMenu"
          component={LogInScreen_HamMenu}/> 
        <Stack.Screen name="SignUpScreen_HamMenu" 
          component={SignUpScreen_HamMenu}/>
        <Stack.Screen name="LogInScreen_comment"
          component={LogInScreen_comment}/> 
        <Stack.Screen name="SignUpScreen_comment" 
          component={SignUpScreen_comment}/>
        <Stack.Screen name="ForgetPasswordScreen"
          component={ForgetPasswordScreen}/>
        <Stack.Screen name="CommentForm"
          component={CommentForm}/>
        <Stack.Screen name="ChoosePlace"
          component={ChoosePlace} />
        <Stack.Screen name="ChooseWin"
          component={ChooseWin} />
        <Stack.Screen name="ReportWin"
          component={ReportWin}/>
        <Stack.Screen name="ReportApp"
          component={ReportApp}/>
        <Stack.Screen name="Howto"
          component={Howto}/>
        <Stack.Screen name="PageScreen"
          component={PageScreen}/>
        <Stack.Screen name="PageScreen2"
          component={PageScreen2}/>
        <Stack.Screen name="RateService"
          component={RateService}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
