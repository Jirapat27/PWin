import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ref, orderByChild, onValue } from "firebase/database";
import { db } from '../../firebaseConfig'; // Import the database reference

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
      <View style={styles.container}>
        <ScrollView style={styles.commentsContainer} horizontal={true} showsHorizontalScrollIndicator={false}>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <Text>{comment.description}</Text>
              <Text>Star Review: {comment.starReview}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  commentsContainer: {
    flexDirection: "column",
     // Changed to column
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
  },
});