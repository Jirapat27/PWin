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
        Alert.alert('เกิดข้อผิดพลาด', 'กรุณากรอกที่อยู่อีเมล');
        return;
      }

      await sendPasswordResetEmail(auth, email);

      Alert.alert('สำเร็จ', 'อีเมลพร้อมลิ้งค์สำหรับการเปลี่ยนรหัสผ่านถูกส่งเรียบร้อย. กรุณาเช็คกล่องข้อความของคุณ.');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดระหว่างการรีเซ็ตรหัสผ่าน:', error.message);
      Alert.alert('เกิดข้อผิดพลาด', `รีเซ้ตรหัสผ่านไม่สำเร็จ: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image source={CloseImage} />
        </TouchableOpacity>
      </View>
      <Text style={styles.header}>ลืมรหัสผ่าน</Text>
      <Text style={styles.instructions}>
      กรอกที่อยู่อีเมลตรงนี้ เราจะส่งอีเมลพร้อมลิ้งค์สำหรับการเปลี่ยนรหัสผ่านให้คุณ
      </Text>
      <TextInput
        style={styles.inputContainer}
        placeholder="ที่อยู่อีเมล"
        placeholderTextColor="#B0B0B0"
        onChangeText={(input) => setEmail(input)}
      />
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPasswordPress}>
        <Text style={styles.resetButtonText}>รีเซ็ตรหัสผ่าน</Text>
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
