import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, ScrollView, Alert } from "react-native";
import Comment from './Comment';
import { auth, db } from "../../firebaseConfig";
import { ref, get } from "firebase/database";

const { width: windowWidth } = Dimensions.get("window");
const gap = 10;

export default function BottomSheets({ sheetPlaces, onClose }) {

  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleAddCommentPress = async () => {
    // Check if the user is logged in
    if (user) {
      try {
        // Fetch user data from the database
        const userPath = ref(db, 'users/' + user.uid);
        const userSnapshot = await get(userPath);
        
        if (userSnapshot.exists()) {
          // If user data exists, retrieve the username
          const userData = userSnapshot.val();
          const username = userData.username;
  
          // Get the name of the sheetPlace
          const placeName = sheetPlaces?.name;
  
          // Navigate to the CommentForm screen and pass the username and placeName as params
          navigation.navigate('CommentForm', { username, placeName });
        } else {
          // Handle the case where user data doesn't exist
          console.log("User data does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error
      }
    } else {
      // If not logged in, show a login prompt
      showLoginPopup();
    }
  };

  const showLoginPopup = () => {
    Alert.alert(
      "เข้าสู่ระบบ",
      "คุณต้องเข้าสู่ระบบก่อนทำการแสดงความคิดเห็น",
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
    <View style={styles.container}>
      <Text style={styles.label}>{sheetPlaces?.name}</Text>

      <View>
        <Text style={styles.normalText}>{sheetPlaces?.description}</Text>
        <View style={styles.rowButton}>
          <TouchableOpacity style={styles.buttonDirec}>
            <Text style={styles.buttonText}>เริ่มเส้นทาง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMore}>
            <Image
              source={require("../../assets/images/More.png")}
              style={styles.imageMore}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.rowImage}>
              {sheetPlaces?.images?.map((imageUrl, index) => (
                <Image
                  key={index}
                  source={{ uri: imageUrl }}
                  style={styles.image}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.commentHeader}>
          <Text style={styles.commentText}>Comment</Text>
          <TouchableOpacity style={styles.commentButton} onPress={handleAddCommentPress}>
            <Image
              source={require("../../assets/images/Plus.png")}
              style={styles.plusIcon}
            />
          </TouchableOpacity>
        </View>
        <Comment placeName={sheetPlaces?.name} /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: gap,
    flex: 1,
    marginVertical: 20,
    marginHorizontal: 10,
    alignItems: "flex-start", // Ensure the container expands vertically
  },
  content: {
    flexDirection: "column",
  },
  image: {
    height: 300,
    width: 300,
    //marginRight:15,
  },
  rowImage: {
    flexDirection: "column", // Changed to column
  },
  rowButton: {
    flexDirection: "row",
  },
  label: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "BaiJamjuree-Bold",
  },
  swatch: {
    height: (windowWidth - 10 * gap) / 7,
    aspectRatio: 1,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontFamily: "BaiJamjuree-SemiBold",
  },
  buttonDirec: {
    flexDirection: "column",
    backgroundColor: "#FF9A62",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 255,
    height: 60,
    marginVertical: 20,
    marginRight: 20,
  },
  buttonMore: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: 70,
    height: 60,
    marginVertical: 20,
  },
  normalText: {
    marginTop: -15,
    fontSize: 20,
    fontFamily: "BaiJamjuree-Regular",
  },
  imageMore: {
    justifyContent: "center",
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#D9D9D9",
  },
  commentText: { 
    fontSize: 20,
    fontFamily: "BaiJamjuree-SemiBold", 
    marginRight: 10,
  },
  commentButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ff7c33",
    borderRadius: 5,
    padding: 5,
  },
  plusIcon: {
    width: 24,
    height: 24,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});