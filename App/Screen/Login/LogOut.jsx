import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function LogoutButton() {
  const navigation = useNavigation();

  const handleLogoutPress = async () => {
    try {
      await signOut(auth);
      // Navigate to the login screen or any other screen as needed
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error during logout:', error.message);
      // Handle logout failure as needed
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLogoutPress}>
      <Image
        source={require('./../../../assets/images/Win-Mark.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FF9A62', // Customize the background color
    borderRadius: 10,
    alignItems: 'center',
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  image: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 5,
  },
});