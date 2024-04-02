import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const [drawerOpen, setDrawerOpen] = React.useState(false);
const handleDrawerToggle = () => {
  setDrawerOpen(!drawerOpen);
 };
const Stack = createStackNavigator();

export default function HamburgerMenu() {
  return (
      <View>
        <Text>Hamburger</Text>
      </View>
   );
}