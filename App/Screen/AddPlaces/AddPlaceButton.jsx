import { TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const AddPlaceButton = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleAddPlaceScreenPress = () => {
    // Check if the user is logged in
    if (user) {
      // If logged in, navigate to AddPlaceScreen
      navigation.navigate("AddPlaceScreen");
    } else {
      // If not logged in, show a popup to choose login or cancel
      showLoginPopup();
    }
  };

  const showLoginPopup = () => {
    Alert.alert(
      "เข้าสู่ระบบ",
      "คุณต้องเข้าสู่ระบบก่อนทำรายการ",
      [
        {
          text: "ยกเลิก",
          style: "cancel",
        },
        {
          text: "เข้าสู่ระบบ",
          onPress: () => {
            // Navigate to LogInScreen
            navigation.navigate("LogInScreen");
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleAddPlaceScreenPress}>
      <Image
        source={require('./../../../assets/images/Plus.png')} 
        style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  image: {
    justifyContent: 'center',
    width: 35,
    height: 35,
    alignItems: "center",
    alignSelf: 'center',
  },
});

export default AddPlaceButton;
