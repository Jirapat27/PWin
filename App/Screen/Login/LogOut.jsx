import React from 'react';
import { Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function LogoutButton() {
  const navigation = useNavigation();

  const handleLogoutPress = async () => {
    try {
      // Check if user is authenticated
      if (!auth.currentUser) {
        // Show alert if user is not logged in
        Alert.alert('ไม่มีการออกจากระบบ', 'คุณยังไม่ได้เข้าสู่ระบบ');
        return;
      }

      // Logout if user is authenticated
      await signOut(auth);
      // Show success message using Alert
      Alert.alert('ออกจากระบบสำเร็จ', 'คุณได้ออกจากระบบเรียบร้อยแล้ว');
      // Navigate to the login screen or any other screen as needed
      navigation.navigate('AppMapView_HomeScreen');
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในขณะที่ออกจากระบบ:', error.message);
      // Handle logout failure
      Alert.alert(
        'การออกจากระบบล้มเหลว',
        'เกิดข้อผิดพลาดขณะที่ทำการออกจากระบบ โปรดลองอีกครั้งในภายหลัง'
      );
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleLogoutPress}>
      <Image
        source={require('./../../../assets/images/Win-Mark.png')}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#FF9A62', // Customize the background color
    borderRadius: 10,
    alignItems: 'center',
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  image: {
    justifyContent: 'center',
    width: 40,
    height: 40,
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 5,
  },
});