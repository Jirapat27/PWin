import { TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../firebaseConfig';
import { ref, get } from 'firebase/database';
import { auth } from '../../../firebaseConfig';

export default function AddPlaceButton() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleAddPlaceScreenPress = async () => {
    // Check if the user is logged in
    if (user) {
      try {
        const userPath = ref(db, 'users/' + user.uid);
        // Fetch the user information from the database
        const userSnapshot = await get(userPath);
        
        if (userSnapshot.exists()) {
          // If the user data exists, retrieve the username
          const userData = userSnapshot.val();
          const username = userData.username;
  
          // Navigate to AddPlaceScreen and pass the username as a parameter
          navigation.navigate("AddPlaceScreen", {
            username: username,
          });
        } else {
          // Handle the case where user data doesn't exist
          console.log("User data does not exist");
          // Show a fallback or default behavior
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error
      }
    } else {
      // If not logged in, show a popup to choose login or cancel
      showLoginPopup();
    }
  };    

  const showLoginPopup = () => {
    Alert.alert(
      "เข้าสู่ระบบ",
      "คุณต้องเข้าสู่ระบบก่อนทำการเพิ่มจุดมาร์ค",
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
        source={require('./../../../assets/images/Plus.png')} // Update with the actual path to your image
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