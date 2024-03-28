import React, { useState } from "react";
import { StyleSheet, View, Image, Text, TextInput, ActivityIndicator, Alert, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { format } from 'date-fns';
import { db } from '../../firebaseConfig';
import { ref, push, set } from "firebase/database"; // Import 'set' function and serverTimestamp
import { useNavigation } from "@react-navigation/native";
import CloseImage from "../../assets/images/Close.png";
import Logo from "../../assets/images/Logo.png";

export default function CommentForm() {
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [starReview, setStarReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
              const commentRef = ref(db, 'comments');
              const newCommentRef = push(commentRef);
              const timestamp = format(new Date(), "HH:mm EEEE, dd MMMM yyyy (zzzz)"); // Format the timestamp
              await set(newCommentRef, { description, starReview, timestamp });
  
              console.log("Comment submitted successfully!");
  
              // Clear input fields
              setDescription("");
              setStarReview("");
  
              // Navigate to the home screen
              navigation.navigate('HomeScreen');
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
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image source={CloseImage} />
        </TouchableOpacity>
      </View>
      <Text h4 style={styles.header}>Add Comment</Text>
      <Text style={[styles.name, { textAlign: 'left' }]}>Description</Text>
      <TextInput
        style={styles.inputContainer}
        value={description}
        placeholder="Enter Description"
        onChangeText={setDescription}
      />
      <Text style={[styles.name, { textAlign: 'left' }]}>Star Review</Text>
      <TextInput
        style={styles.inputContainer}
        value={starReview}
        placeholder="Enter Star Review (out of 5)"
        onChangeText={setStarReview}
        keyboardType="numeric"
      />
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={styles.submitButton} onPress={submitComment}>
          <Text style={styles.submitButtonText}>Submit</Text>
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