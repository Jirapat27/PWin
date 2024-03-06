import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { getDocs, query, where, collection } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';

const LogIn = () => {
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  
  const handleSignUpPress = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleLoginPress = async () => {
    try {
      // Check if username or email is empty
      if (!userInput) {
        Alert.alert('Error', 'Username or Email is required');
        return;
      }

      // Check if password is empty
      if (!password) {
        Alert.alert('Error', 'Password is required');
        return;
      }

      // Query the 'users' collection in Firestore
      const q = query(collection(db, 'users'), where('email', '==', userInput));
      const querySnapshot = await getDocs(q);

      // Check if user exists
      if (querySnapshot.size > 0) {
        // User exists, now attempt to sign in with Firebase authentication
        const authResult = await auth.signInWithEmailAndPassword(userInput, password);

        // If authentication is successful, navigate to the main app screen
        if (authResult.user) {
          console.log('Login successful');
          navigation.navigate('AddPlaceScreen');
        } else {
          console.log('Authentication failed');
          // Handle authentication failure as needed
        }
      } else {
        console.log('User does not exist');
        // Handle case where user does not exist
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle other errors as needed
      Alert.alert('Error', `Login failed: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ลงชื่อเข้าใช้ PWin</Text>
      <TextInput
        style={styles.inputContainer}
        placeholder="ที่อยู่อีเมล หรือ ชื่อผู้ใช้"
        onChangeText={(input) => setUserInput(input)}
      />
      <TextInput
        style={styles.inputContainer}
        placeholder="รหัสผ่าน"
        secureTextEntry
        onChangeText={(pass) => setPassword(pass)}
      />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>
      <Text style={styles.signUpSentence}>
        ยังไม่มีบัญชี PWin?{' '}
          <Text style={styles.signUpText} onPress={handleSignUpPress}>สร้างบัญชีที่นี้</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    
  },
  header: {
    fontSize: 24,
    color: "#FF8A48",
    marginBottom: 30,
  },
  inputContainer: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: "#FF8A48",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  signUpText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  signUpSentence: {
    fontStyle: 'italic',
    marginTop: 20,
  }
});

export default LogIn;
