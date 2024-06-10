import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Modal, View, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

const DynamicAuthButton = ({ navigation, onLogout }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  
    useEffect(() => {
      const unsubscribe = auth().onAuthStateChanged(user => {
        setIsLoggedIn(user ? true : false);
      });
  
      return unsubscribe;
    }, []);
  
    const handleButtonPress = () => {
      if (isLoggedIn) {
        // If the user is logged in, show logout confirmation modal
        setIsLogoutModalVisible(true);
      } else {
        // If the user is not logged in, navigate to the login screen
        navigation.navigate('Login');
      }
    };
  
    const handleLogoutConfirmed = () => {
      onLogout(); // Call the onLogout callback function
      setIsLogoutModalVisible(false);
      Alert.alert('ออกจากระบบสำเร็จ', 'คุณออกจากระบบเรียบร้อยแล้ว');
    };
  
    const handleLogoutCancelled = () => {
      setIsLogoutModalVisible(false);
    };

  return (
    <>
      <TouchableOpacity onPress={handleButtonPress}>
        <Text style={styles.AuthText}>{isLoggedIn ? 'Log out' : 'Log in'}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isLogoutModalVisible}
        onRequestClose={() => setIsLogoutModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalHead}>ออกจากระบบ</Text>
            <Text style={styles.modalText}>คุณยืนยันที่จะออกจากระบบใช่หรือไม่?</Text>
            <View style={styles.rowButton}>
              <TouchableOpacity style={styles.CancelButton} onPress={handleLogoutCancelled}>
                <Text style={[styles.buttonText, { color: 'black'}]}>ยกเลิก</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.ConfirmButton} onPress={handleLogoutConfirmed}>
                <Text style={styles.buttonText}>ออกจากระบบ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  AuthText: {
    marginTop: '32%',
    marginLeft: '32%',
    color: '#FF9A62',
    fontSize: 32,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHead: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent:'space-between',
  },
  ConfirmButton: {
    borderRadius: 10,
    padding: 10,
    width: 136,
    elevation: 2,
    margin: 10,
    backgroundColor: '#FF9A62',
  },
  CancelButton: {
    borderRadius: 10,
    padding: 10,
    width: 136,
    elevation: 2,
    margin: 10,
    backgroundColor: '#EFEFEF',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DynamicAuthButton;
