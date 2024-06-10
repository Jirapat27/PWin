/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';

import Logo from '../images/Logo.png';

const screenWidth = Dimensions.get('window').width;

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // ตรวจสอบสถานะการล็อกอินเมื่อหน้าจอนี้โหลดขึ้นมา
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Home'); // เปลี่ยนหน้าไป HomeScreen โดยไม่ให้ย้อนกลับได้
      }
    });
    return unsubscribe; // unsubscribe listener เมื่อ component ถูก unmount
  }, [navigation]);

  const handleLogin = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert('เข้าสู่ระบบสำเร็จ', 'กำลังเข้าสู่หน้าหลักอีกครั้ง');
        navigation.replace('Home'); // เปลี่ยนหน้าไป HomeScreen โดยไม่ให้ย้อนกลับได้
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          Alert.alert('เกิดข้อผิดพลาด', 'ที่อยู่อีเมลไม่ถูกต้อง!');
        } else if (error.code === 'auth/wrong-password') {
          Alert.alert('เกิดข้อผิดพลาด', 'รหัสผ่านไม่ถูกต้อง!');
        } else {
          Alert.alert('เกิดข้อผิดพลาด', error.message);
        }
      });
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>ลงชื่อเข้าใช้</Text>
      <Text style={styles.inputheader}>อีเมล</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <Text style={styles.inputheader}>รหัสผ่าน</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Text style={styles.forgot} onPress={handleForgotPasswordPress}>ลืมรหัสผ่าน ?</Text>
      <TouchableOpacity onPress={handleLogin} style={styles.logInButton}>
        <Text style={styles.logInButtonText}>เข้าสู่ระบบ</Text>
      </TouchableOpacity>
      <Text style={styles.signUpSentence}>
            ยังไม่มีบัญชี? {' '}
        <Text style={styles.signUpText} onPress={handleSignUpPress}>
              ลงทะเบียน
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 39,
  },
  logo: {
    width: screenWidth * 0.8,
    height: 77,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FF8A48',
  },
  inputheader: {
    fontSize: 16,
    color: '#FF8A48',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  input: {
    width: 333,
    height: 53,
    borderColor: '#FF7C33',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 25,
    paddingHorizontal: 12,
  },
  forgot:{
    color: '#7B7B7B',
    fontSize: 16,
    fontWeight: 'semibold',
    textDecorationLine: 'underline',
    alignSelf:'flex-end',
    marginRight: '5%',
    marginBottom: 17,
  },
  logInButton: {
    backgroundColor: '#FF9A62',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
    width: 333,
    height: 53,
  },
  logInButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  signUpText: {
    marginLeft: 10,
    color: '#7B7B7B',
    textDecorationLine: 'underline',
    fontWeight: 'semibold',
  },
  signUpSentence: {
    marginTop: 20,
    fontSize: 14,
    color: '#B0B0B0',
    fontWeight: 'semibold',
  },
});

export default LoginScreen;
