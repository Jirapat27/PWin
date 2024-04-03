import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ref, orderByChild, onValue } from "firebase/database";
import { db } from '../../firebaseConfig'; // Import the database reference

export default function Comment() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsRef = ref(db, 'comments'); // Ensure that 'comments' is the correct path

    const unsubscribe = onValue(commentsRef, (snapshot) => {
      const commentsData = snapshot.val();
      if (commentsData) {
        const sortedComments = Object.values(commentsData).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setComments(sortedComments);
      } else {
        setComments([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Comments</Text>
      <ScrollView style={styles.commentsContainer}>
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
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentsContainer: {
    flex: 1,
  },
  commentItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});