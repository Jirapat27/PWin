import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';

import Logo from '../images/Logo.png';

const screenWidth = Dimensions.get('window').width;

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert('สำเร็จ', 'อีเมลสำหรับการรีเซ็ตรหัสผ่านถูกส่งเรียบร้อยแล้ว!');
        navigation.navigate('Login');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('เกิดข้อผิดพลาด','ไม่พบบัญชีผู้ใช้!');
        } else {
          Alert.alert('เกิดข้อผิดพลาด', error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <Text style={styles.title}>ลืมรหัสผ่าน</Text>
      <Text style={styles.inputheader}>กรอกอีเมลของคุณเพื่อรับข้อความเปลี่ยนรหัสผ่าน:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleResetPassword} style={styles.resetButton}>
        <Text style={styles.resetButtonText}>ยืนยันอีเมล</Text>
      </TouchableOpacity>
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
    resetButton: {
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
    resetButtonText: {
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

export default ForgotPasswordScreen;
