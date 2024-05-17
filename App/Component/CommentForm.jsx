import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, Alert, TouchableOpacity, KeyboardAvoidingView, Dimensions, ScrollView } from "react-native";
import { format } from 'date-fns';
import { db } from '../../firebaseConfig';
import { ref, push, set } from "firebase/database";
import { useNavigation, useRoute } from "@react-navigation/native";
import CloseImage from "../../assets/images/Close.png";
import Logo from "../../assets/images/Logo.png";
import Stars from 'react-native-stars'; // Import Stars component from react-native-stars

export default function CommentForm() {
  const navigation = useNavigation();
  const route = useRoute();
  const [description, setDescription] = useState("");
  const [starReview, setStarReview] = useState(0); // Initialize starReview state to 0
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { username, placeName } = route.params;
  console.log(username, placeName);

  const submitComment = async () => {
    try {
      setError(null); // Clear any previous error
  
      // Check if any field is empty
      if (!description || !starReview) {
        Alert.alert("คำเตือน", "กรุณากรอกข้อมูลให้ครบทุกช่อง");
        return;
      }
  
      // Show confirmation prompt
      Alert.alert(
        "ยืนยันการส่งความคิดเห็น",
        "คุณแน่ใจหรือไม่ว่าต้องการจะส่งความคิดเห็นนี้",
        [
          {
            text: "ยกเลิก",
            style: "cancel"
          },
          {
            text: "ยืนยัน",
            onPress: async () => {
              setLoading(true);
  
              // Push comment data to the database along with timestamp
              const commentRef = ref(db, 'comments' );
              const newCommentRef = push(commentRef);
              const cid = newCommentRef.key; // Generate unique comment ID
              const timestamp = format(new Date(), "yyyy-MM-dd HH:mm:ss"); // Format the timestamp
              await set(newCommentRef, { cid, description, starReview, timestamp, username, placeName });
  
              console.log("ส่งความคิดเห็นเรียบร้อยแล้ว!");
  
              // Clear input fields
              setDescription("");
              setStarReview(0); // Reset starReview to 0
  
              // Navigate to the home screen
              navigation.navigate('AppMapView_HomeScreen');
            }
          }
        ]
      );
    } catch (error) {
      console.log("ไม่สามารถส่งความคิดเห็นได้:", error.message);
      setError(`ไม่สามารถส่งความคิดเห็นได้: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.close}>
            <TouchableOpacity onPress={() => navigation.navigate("AppMapView_HomeScreen")}>
              <Image source={CloseImage} />
            </TouchableOpacity>
          </View>
          <Text h4 style={styles.header}>เพิ่มความคิดเห็น</Text>
          <Text style={[styles.name, { textAlign: 'left' }]}>รายละเอียดความคิดเห็น</Text>
          <TextInput
            style={styles.inputContainer}
            value={description}
            placeholder="พิมพ์รายละเอียดความคิดเห็นที่นี้"
            onChangeText={setDescription}
          />
          <Text style={[styles.name, { textAlign: 'left' }]}>คะแนนความคิดเห็น</Text>
          <Stars
            default={starReview}
            count={5}
            half={true}
            fullStar={require('../../assets/images/starFilled.png')}
            emptyStar={require('../../assets/images/starEmpty.png')}
            halfStar={require('../../assets/images/starHalf.png')}
            starSize={30} // Adjust the size of the stars
            update={(val) => setStarReview(val)} // Update starReview state
            fullStarColor="#FF8A48"
            halfStarColor="#FF8A48"
            starStyle={{ padding: 2 }} // Adjust the padding of the stars
          />
          {error && <Text style={styles.errorMessage}>{error}</Text>}
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <TouchableOpacity style={styles.submitButton} onPress={submitComment}>
              <Text style={styles.submitButtonText}>บันทึก</Text>
            </TouchableOpacity>
          )}
        </View>
       </ScrollView>
       <View style={styles.logoContainer}>
         <Image source={Logo} style={styles.logo} />
       </View>
     </KeyboardAvoidingView>
   );
 };
 
 const screenWidth = Dimensions.get("window").width;
 const screenHeight = Dimensions.get("window").height;
 
 const styles = StyleSheet.create({
   scrollContainer: {
     flexGrow: 1,
     justifyContent: 'center',
   },
   logoContainer: {
     alignItems: 'center',
     marginBottom: 20,
   },
   container: {
     flex: 1,
     alignItems: "center",
     paddingHorizontal: 20,
     paddingTop: screenHeight * 0.05,
     fontFamily: 'BaiJamjuree-Medium'
   },
   logo: {
     width: screenWidth * 0.8,
     height: 31,
     resizeMode: 'contain',
   },
  header: {
    fontSize: 36,
    color: "#FF8A48",
    marginBottom: 30,
    fontFamily: 'BaiJamjuree-Bold',
  },
  inputContainer: {
    height: 40,
    width: "100%",
    height: 54,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    borderColor: '#FF8A48',
    borderRadius: 8,
    paddingLeft: 10,
  },
  submitButton: {
    backgroundColor: "#FF8A48",
    width: "100%",
    height: 54,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  name: {
    alignSelf: 'flex-start',
    fontFamily: 'BaiJamjuree-Regular',
    fontSize: 16,
    color: "#FF8A48",
    marginBottom: 10
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'BaiJamjuree-Bold',
  },
  close: {
    alignSelf: 'flex-end',
  },
});
