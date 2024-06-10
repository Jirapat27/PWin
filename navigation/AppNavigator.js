// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen'; // Import SplashScreen component
import Map_HomeScreen from '../screens/Map_HomeScreen';
import AddPlaceScreen from '../screens/AddPlaceScreen';
import AddDetailsScreen from '../screens/AddDetailsScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChooseDestinationScreen from '../screens/ChooseDestinationScreen';
import ChooseWinScreen from '../screens/ChooseWinScreen';
import CalPriceScreen from '../screens/CalPriceScreen';
import ReportWin from '../screens/ReportWin';
import ReportApp from '../screens/ReportApp';
import Howto from '../screens/Howto';
import PageScreen from '../screens/PageScreen';
import PageScreen2 from '../screens/PageScreen2';
import RateService from '../screens/RateService';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Home" component={Map_HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AddDetails" component={AddDetailsScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="AddPlace" component={AddPlaceScreen} />
        <Stack.Screen name="ChooseDestination" component={ChooseDestinationScreen} />
        <Stack.Screen name="ChooseWin" component={ChooseWinScreen} />
        <Stack.Screen name="CalPrice" component={CalPriceScreen} />
        <Stack.Screen name="ReportWin" component={ReportWin}/>
        <Stack.Screen name="ReportApp" component={ReportApp}/>
        <Stack.Screen name="Howto" component={Howto}/>
        <Stack.Screen name="PageScreen" component={PageScreen}/>
        <Stack.Screen name="PageScreen2" component={PageScreen2}/>
        <Stack.Screen name="RateService" component={RateService}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
