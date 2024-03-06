import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth'; // Import the necessary Firebase function for password reset
import { auth } from '../../../firebaseConfig'; // Import Firebase auth
import { useNavigation } from '@react-navigation/native';
import CloseImage from "../../../assets/images/Close.png";
import Logo from "../../../assets/images/Logo.png";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPasswordPress = async () => {
    try {
      if (!email) {
        Alert.alert('Error', 'Please enter your email address');
        return;
      }

      await sendPasswordResetEmail(auth, email);

      Alert.alert('Success', 'An email with a password reset link has been sent to your email address. Please check your inbox.');
    } catch (error) {
      console.error('Error while resetting password:', error.message);
      Alert.alert('Error', `Password reset failed: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image source={CloseImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>Forgot Password</Text>
      <Text style={styles.instructions}>
        Enter your email address below. We'll send you an email with a link to reset your password.
      </Text>
      <TextInput
        style={styles.inputContainer}
        placeholder="Email Address"
        placeholderTextColor="#B0B0B0"
        onChangeText={(input) => setEmail(input)}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPasswordPress}>
        <Text style={styles.resetButtonText}>Reset Password</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={{ flex: 1, marginTop: 70, alignItems: 'center', paddingHorizontal: 30, fontFamily: 'BaiJamjuree-Medium' }}
        behavior={Platform.OS === 'android' ? 'padding' : 'height'} >
        <Image source={Logo} style={styles.logo} />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 70,
    fontFamily: 'BaiJamjuree-Medium',
  },
  header: {
    fontSize: 36,
    color: '#FF8A48',
    marginBottom: 30,
    fontFamily: 'BaiJamjuree-Bold',
  },
  close:{
    alignSelf:'flex-end',
  },
  instructions: {
    fontSize: 16,
    color: '#7B7B7B',
    marginBottom: 20,
    fontFamily: 'BaiJamjuree-Regular',
  },
  inputContainer: {
    height: 40,
    width: '100%',
    height: 54,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderColor: '#FF8A48',
    borderRadius: 8,
    paddingLeft: 10,
  },
  resetButton: {
    backgroundColor: '#FF8A48',
    width: '100%',
    height: 54,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'BaiJamjuree-Bold',
  },
  logo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 31,
    marginBottom:30,
    resizeMode: 'contain',
  }
});

export default ForgetPasswordScreen;
