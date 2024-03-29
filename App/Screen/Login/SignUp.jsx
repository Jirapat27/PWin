import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, Alert, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../../../firebaseConfig';
import { ref, set, child } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import CloseImage from "../../../assets/images/Close.png";
import Logo from "../../../assets/images/Logo.png";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const signUp = async () => {
    try {
      setError(null); // Clear any previous error
  
      // Check if any field is empty
      if (!username || !email || !password || !confirmPassword) {
        Alert.alert("Warning", "Please fill in all fields.");
        return;
      }
  
      // Password match check
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
  
      // Password length check
      if (password.length < 8 || password.length > 12) {
        setError("Password must be 8-12 characters long");
        return;
      }
  
      setLoading(true);
  
      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Store additional user information in the database
      const userPath = child(ref(db), 'users/' + user.uid); // Use child to specify the user-specific path
      const additionalUserInfo = {
        uid: user.uid,
        username: username,
      };
  
      await set(userPath, additionalUserInfo);
  
      console.log("สร้างบัญชีผู้ใช้สำเร็จ!");
  
      navigation.navigate('AddPlaceScreen');
    } catch (error) {
      console.log("Failed to create account:", error.message);
      setError(`Failed to create account: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image source={CloseImage} />
        </TouchableOpacity>
      </View>
      <Text h4 style={styles.header}>ลงทะเบียน</Text>
      <Text style={[styles.name, { textAlign: 'left' }]}>ชื่อผู้ใช้</Text>
      <TextInput
        style={styles.inputContainer}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(username) => setUsername(username)}
      />
      <Text style={[styles.name, { textAlign: 'left' }]}>ที่อยู่อีเมล</Text>
      <TextInput
        style={styles.inputContainer}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(email) => setEmail(email)}
      />
      <Text style={[styles.name, { textAlign: 'left' }]}>รหัสผ่าน</Text>
      <TextInput
        style={styles.inputContainer}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(password) => setPassword(password)}
      />
      <Text style={[styles.name, { textAlign: 'left' }]}>ยืนยันรหัสผ่าน</Text>
      <TextInput
        style={styles.inputContainer}
        value={confirmPassword}
        secureTextEntry={true}
        placeholder="Confirm Password"
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
    marginTop:70,
    alignItems: "center",
    paddingHorizontal: 30,
    fontFamily: 'BaiJamjuree-Medium'
  },
  header: {
    fontSize: 36,
    color: "#FF8A48",
    marginBottom: 30,
    fontFamily: 'BaiJamjuree-Bold',
  },
  inputContainer: {
    height: 40,
    width:"100%",
    height:54,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderColor: '#FF8A48',
    borderRadius: 8,
    paddingLeft: 10,
  }, 
  signUpButton: {
    backgroundColor: "#FF8A48",
    width:"100%",
    height:54,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 12,
    marginTop: 10,
  },
  subtext: {
    color: 'gray',
    fontFamily: 'BaiJamjuree-Regular',
    marginBottom: 20,
    paddingBottom: 10,
  },
  name:{
    alignSelf: 'flex-start',
    fontFamily: 'BaiJamjuree-Regular',
    fontSize:16,
    color: "#FF8A48",
    marginBottom:10
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  signUpButtonText:{
    color: 'white',
    fontSize:22,
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
  },
  close:{
    alignSelf:'flex-end',
  },
});

export default SignUp;
