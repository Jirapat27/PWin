import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, Alert, TouchableOpacity, KeyboardAvoidingView, BackHandler } from "react-native";
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
      navigation.navigate("AppMapView_HomeScreen");
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
        Alert.alert("คำเตือน", "โปรดกรอกข้อมูลในฟิลด์ทั้งหมด");
        return;
      }

      // ตรวจสอบความเท่าเทียมของรหัสผ่าน
      if (password !== confirmPassword) {
        setError("รหัสผ่านไม่ตรงกัน");
        return;
      }

      // ตรวจสอบความยาวของรหัสผ่าน
      if (password.length < 8 || password.length > 12) {
        setError("รหัสผ่านต้องมีความยาว 8-12 ตัวอักษร");
        return;
      }

      setLoading(true);

      // Create a new user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store additional user information in the database
      const userPath = ref(db, 'users/' + user.uid); // Use ref to specify the user-specific path
      const additionalUserInfo = {
        uid: user.uid,
        username: username,
        email: email,
      }

      await set(userPath, additionalUserInfo);

      console.log("สร้างบัญชีเรียบร้อยแล้ว!");

      // Fetch username from database
      const snapshot = await get(userPath);
      const userData = snapshot.val();
      const fetchedUsername = userData.username;

      navigation.navigate('AddPlaceScreen', { username: fetchedUsername });
    } catch (error) {
      console.log("ไม่สามารถสร้างบัญชีได้:", error.message);
      setError(`ไม่สามารถสร้างบัญชีได้: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => navigation.navigate("AppMapView_HomeScreen")}>
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
        <Text style={styles.logInSentence}>
        มีบัญชี PWin แล้ว? {' '}
        <Text style={styles.logInText} onPress={handleLogInPress}>
        เข้าสู่ระบบ
        </Text>
      </Text>
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
  logInText: {
    marginLeft: 10,
    color: '#7B7B7B',
    textDecorationLine: 'underline',
  },
  logInSentence: {
    fontSize:16,
    color:'#B0B0B0',
    fontFamily: 'BaiJamjuree-Bold',
  },
});