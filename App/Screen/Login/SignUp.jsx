import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, Alert, TouchableOpacity, KeyboardAvoidingView, BackHandler, ScrollView, Platform, Dimensions } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../../firebaseConfig';
import { ref, set, get } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import CloseImage from "../../../assets/images/Close.png";
import Logo from "../../../assets/images/Logo.png";

export default function SignUp(){
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.navigate("LogInScreen");
      return true; // Prevent default behavior (exit app)
    });

    return () => backHandler.remove(); // Remove event listener on component unmount
  }, [navigation]);

  const handleLogInPress = () => {
    navigation.navigate('LogInScreen');
  };

  const signUp = async () => {
    try {
      setError(null); // Clear any previous error

      // Check if any field is empty
      if (!username || !email || !password || !confirmPassword) {
        Alert.alert("Warning", "Please fill in all fields");
        return;
      }

      // Check password equality
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Check password length
      if (password.length < 8 || password.length > 12) {
        setError("Password must be 8-12 characters long");
        return;
      }

      setLoading(true);

      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in the database
      const userPath = ref(db, 'users/' + user.uid);
      const additionalUserInfo = {
        uid: user.uid,
        username: username,
        email: email,
        profilePic: 'https://firebasestorage.googleapis.com/v0/b/pwin-da6c3.appspot.com/o/profile%2FProfile.png?alt=media&token=68e3fbb6-1033-4eac-9337-c343584880df',
      }

      await set(userPath, additionalUserInfo);

      console.log("Account created successfully!");

      // Fetch username from database
      const snapshot = await get(userPath);
      const userData = snapshot.val();
      const fetchedUsername = userData.username;

      navigation.navigate('AddPlaceScreen', { username: fetchedUsername });
    } catch (error) {
      console.log("Failed to create account:", error.message);
      setError(`Failed to create account: ${error.message}`);
    } finally {
      setLoading(false);
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
          <Text h4 style={styles.header}>ลงทะเบียน</Text>
          <Text style={[styles.name, { textAlign: 'left' }]}>    ชื่อผู้ใช้</Text>
          <TextInput
            style={styles.inputContainer}
            value={username}
            autoCapitalize="none"
            onChangeText={(username) => setUsername(username)}
          />
          <Text style={[styles.name, { textAlign: 'left' }]}>    ที่อยู่อีเมล</Text>
          <TextInput
            style={styles.inputContainer}
            value={email}
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
          />
          <Text style={[styles.name, { textAlign: 'left' }]}>    รหัสผ่าน</Text>
          <TextInput
            style={styles.inputContainer}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(password) => setPassword(password)}
          />
          <Text style={[styles.name, { textAlign: 'left' }]}>    ยืนยันรหัสผ่าน</Text>
          <TextInput
            style={styles.inputContainer}
            value={confirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
          />
          <Text style={styles.subtext}>รหัสผ่านต้องมีความยาว 8-12 ตัวอักษร</Text>
          
          {error && <Text style={styles.errorMessage}>{error}</Text>}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.signUpButton} onPress={signUp}>
              <Text style={styles.signUpButtonText}>สร้างบัญชี</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.logInSentence}>
            มีบัญชี PWin แล้ว? {' '}
            <Text style={styles.logInText} onPress={handleLogInPress}>
            เข้าสู่ระบบ
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
  },
  header: {
    fontSize: 28,
    color: "#FF8A48",
    marginBottom: 20,
    fontFamily: 'BaiJamjuree-Bold',
  },
  inputContainer: {
    width: "90%",
    height: 50,
    borderColor: '#FF8A48',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 8,
    paddingLeft: 10,
  },
  signUpButton: {
    backgroundColor: "#FF8A48",
    width: "90%",
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  subtext: {
    color: 'gray',
    fontFamily: 'BaiJamjuree-Regular',
  },
  name: {
    alignSelf: 'flex-start',
    fontFamily: 'BaiJamjuree-Regular',
    fontSize: 16,
    color: "#FF8A48",
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'BaiJamjuree-Bold',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: screenWidth * 0.8,
    height: 31,
    resizeMode: 'contain',
  },
  close: {
    alignSelf: 'flex-end',
  },
  logInText: {
    marginLeft: 10,
    color: '#7B7B7B',
    textDecorationLine: 'underline',
  },
  logInSentence: {
    marginTop: 10,
    fontSize: 16,
    color: '#B0B0B0',
    fontFamily: 'BaiJamjuree-Bold',
  },
});
