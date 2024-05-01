import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, Alert, TouchableOpacity, KeyboardAvoidingView } from "react-native";
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
        Alert.alert("Warning", "Please fill in all fields.");
        return;
      }
  
      // Show confirmation prompt
      Alert.alert(
        "Confirmation",
        "Are you sure you want to submit this comment?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Submit",
            onPress: async () => {
              setLoading(true);
  
              // Push comment data to the database along with timestamp
              const commentRef = ref(db, 'comments' );
              const newCommentRef = push(commentRef);
              const cid = newCommentRef.key; // Generate unique comment ID
              const timestamp = format(new Date(), "HH:mm EEEE, dd MMMM yyyy (zzzz)"); // Format the timestamp
              await set(newCommentRef, { cid, description, starReview, timestamp, username, placeName });
  
              console.log("Comment submitted successfully!");
  
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
      console.log("Failed to submit comment:", error.message);
      setError(`Failed to submit comment: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
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
    marginTop: 70,
    alignItems: "center",
    paddingHorizontal: 30,
    fontFamily: 'BaiJamjuree-Medium'
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
  logo: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 31,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  close: {
    alignSelf: 'flex-end',
  },
});