import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, Alert, TouchableOpacity, KeyboardAvoidingView, BackHandler, ScrollView, Platform, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db, onValue } from '../../../firebaseConfig';
import { ref } from "firebase/database";
import CloseImage from "../../../assets/images/Close.png";
import Logo from "../../../assets/images/Logo.png";

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const handleSignUpPress = () => {
    navigation.navigate('SignUpScreen');
  };

  const handleForgetPasswordPress = () => {
    navigation.navigate('ForgetPasswordScreen');
  };

  const handleLoginPress = async () => {
    try {
      // Check if username or email is empty
      if (!email) {
        Alert.alert('เกิดข้อผิดพลาด', 'จำเป็นต้องใส่ อีเมล');
        return;
      }
  
      // Check if password is empty
      if (!password) {
        Alert.alert('เกิดข้อผิดพลาด', 'ยังไม่ได้กรอก รหัสผ่าน');
        return;
      }
  
      setLoading(true);
  
      const authResult = await signInWithEmailAndPassword(auth, email, password);
  
      // If authentication is successful, navigate to the main app screen
      if (authResult.user) {
        console.log('เข้าสู่ระบบสำเร็จ');
        // Fetch user data including username
        const userPath = ref(db, 'users/' + authResult.user.uid);
        onValue(userPath, (snapshot) => {
          const userData = snapshot.val();
          const username = userData.username; // Assuming 'username' is stored in your database
          console.log('Username:', username); // Log the username
          // Now, navigate to the AddPlaceScreen and pass username as a param
          navigation.navigate('AddPlaceScreen', { username: username });
        });
      } else {
        console.log('Authentication ไม่สำเร็จ');
        // Handle authentication failure as needed
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดระหว่างทำการเข้าสู่ระบบ:', error.message);
      Alert.alert('เกิดข้อผิดพลาด', `เข้าสู่ระบบไม่สำเร็จ: ${error.message}`);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.close}>
            <TouchableOpacity onPress={() => navigation.navigate("AppMapView_HomeScreen")}>
              <Image source={CloseImage} />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>ลงชื่อเข้าใช้</Text>
          <Text style={[styles.name, { textAlign: 'left' }]}>    อีเมล</Text>
          <TextInput
            style={styles.inputContainer}
            placeholderTextColor="#B0B0B0"
            onChangeText={(input) => setEmail(input)}
          />
          <Text style={[styles.name, { textAlign: 'left' }]}>    รหัสผ่าน</Text>
          <TextInput
            style={styles.inputContainer}
            secureTextEntry
            placeholderTextColor="#B0B0B0"
            onChangeText={(pass) => setPassword(pass)}
          />
           <Text style={styles.forget} onPress={handleForgetPasswordPress}>ลืมรหัสผ่าน ?</Text>
          {error && <Text style={styles.errorMessage}>{error}</Text>}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.logInButton} onPress={handleLoginPress}>
              <Text style={styles.logInButtonText}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
          )}
  
          <Text style={styles.signUpSentence}>
            ยังไม่มีบัญชี? {' '}
            <Text style={styles.signUpText} onPress={handleSignUpPress}>
              ลงทะเบียน
            </Text>
          </Text>
        </View>
      </ScrollView>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>
    </KeyboardAvoidingView>
  );
};

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: screenHeight * 0.05,
    fontFamily: 'BaiJamjuree-Medium'
  },
  close: {
    alignSelf: 'flex-end',
  },
  forget:{
    color: '#7B7B7B',
    fontSize: 16,
    fontFamily: 'BaiJamjuree-Bold',
    textDecorationLine: 'underline',
    alignSelf:'flex-end',
    marginRight: "5%",
  },
  header: {
    fontSize: 36,
    color: "#FF8A48",
    marginBottom: 30,
    fontFamily: 'BaiJamjuree-Bold',
  },
  inputContainer: {
    height: 40,
    width: "90%",
    height: 54,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderColor: '#FF8A48',
    borderRadius: 8,
    paddingLeft: 10,
  },
  logInButton: {
    backgroundColor: "#FF8A48",
    width: "90%",
    height: 54,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  logInButtonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'BaiJamjuree-Bold',
  },
  signUpText: {
    marginLeft: 10,
    color: '#7B7B7B',
    textDecorationLine: 'underline',
  },
  signUpSentence: {
    marginTop: 20,
    fontSize: 16,
    color: '#B0B0B0',
    fontFamily: 'BaiJamjuree-Bold',
  },
  name: {
    alignSelf: 'flex-start',
    fontFamily: 'BaiJamjuree-Regular',
    fontSize: 16,
    color: "#FF8A48",
    marginBottom: 10
  },
  logo: {
    width: screenWidth * 0.8,
    height: 31,
    resizeMode: 'contain',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  }
});
