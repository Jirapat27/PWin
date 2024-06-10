import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Dimensions, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { format } from 'date-fns';

import Logo from '../images/Logo.png';

const screenWidth = Dimensions.get('window').width;

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('รหัสผ่านไม่ตรงกัน!');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        
        const userData = {
          username: username,
          email: email,
          profilePic: "https://firebasestorage.googleapis.com/v0/b/pwin-da6c3.appspot.com/o/profile%2FProfile.png?alt=media&token=68e3fbb6-1033-4eac-9337-c343584880df",
          uid: user.uid,
          timestamp: timestamp,
        };

        // เพิ่มข้อมูลผู้ใช้ลงใน Realtime Database
        database()
          .ref(`/users/${user.uid}`)
          .set(userData)
          .then(() => {
            Alert.alert('สร้างผู้ใช้สำเร็จแล้ว!');
            navigation.navigate('Login');
          })
          .catch(error => {
            Alert.alert('เกิดข้อผิดพลาด', error.message);
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('อีเมลนี้ถูกใช้งานแล้ว!');
        } else {
          Alert.alert('เกิดข้อผิดพลาด', error.message);
        }
      });
  };

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>ลงทะเบียน</Text>
      <Text style={styles.inputheader}>ชื่อผู้ใช้</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
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
      <Text style={styles.inputheader}>ยืนยันรหัสผ่าน</Text>
      <TextInput
        style={styles.input}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpButtonText}>ลงทะเบียน</Text>
      </TouchableOpacity>
      <Text style={styles.logInSentence}>
            มีบัญชีแล้ว? {' '}
        <Text style={styles.logInText} onPress={handleLoginPress}>
              เข้าสู่ระบบ
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
  signUpButton: {
    backgroundColor: '#FF9A62',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 13,
    borderRadius: 10,
    fontWeight: 'bold',
    width: 333,
    height: 53,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  logInText: {
    marginLeft: 10,
    color: '#7B7B7B',
    textDecorationLine: 'underline',
    fontWeight: 'semibold',
  },
  logInSentence: {
    marginTop: 28,
    fontSize: 14,
    color: '#B0B0B0',
    fontWeight: 'semibold',
  },
});

export default SignUpScreen;
