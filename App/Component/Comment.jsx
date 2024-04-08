import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { ref, orderByChild, onValue } from "firebase/database";
import { db } from '../../firebaseConfig'; // Import the database reference
import Profile from "../../assets/images/Profile.png";

export default function Comment({ placeName }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsRef = ref(db, 'comments'); // Ensure that 'comments' is the correct path

    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const sortedComments = Object.values(commentsData)
          .filter(comment => comment.placeName === placeName) // Filter comments by placeName
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort comments by timestamp, latest first
        setComments(sortedComments.reverse()); // Reverse the order to display the latest comment first
      } else {
        setComments([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [placeName]);

  return (
    <ScrollView
      style={styles.container}
      horizontal={true}
      showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
    >
      {comments.map((comment, index) => (
        <View key={index} style={styles.commentItem}>
          <Image style={styles.profilePic} source={Profile}  />
          <View style={styles.commentContent}>
            <Text style={styles.name}>Jeff Satur</Text>
            <Text>Star Review: {comment.starReview}</Text>
            <Text style={styles.description} >{comment.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingBottom: 20, // Add padding to the bottom to prevent content from being hidden under the tab bar
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 3,
    height: 100, 
    width: 250, 
    backgroundColor: "#DDDDDD",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10, 
  },
});
