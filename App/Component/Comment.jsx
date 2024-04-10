import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { ref, onValue } from "firebase/database";
import { db } from '../../firebaseConfig'; // Import the database reference
import Stars from 'react-native-stars';

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
      <ScrollView style={styles.commentsContainer}>
        {comments.length === 0 ? (
          <Text style={styles.noDataText}>ยังไม่มีการแสดงความคิดเห็น</Text>
        ) : (
          comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <Text>{comment.description}</Text>
              <View style={styles.starsContainer}>
                <Stars
                  default={parseFloat(comment.starReview)}
                  count={5}
                  half={true}
                  fullStar={require('../../assets/images/starFilled.png')}
                  emptyStar={require('../../assets/images/starEmpty.png')}
                  halfStar={require('../../assets/images/starHalf.png')}
                  starSize={30} // Adjust the size of the stars
                  disabled={true}
                  fullStarColor="#FF8A48"
                  halfStarColor="#FF8A48"
                  starStyle={{ padding: 2 }} // Adjust the padding of the stars
                />
              </View>
            </View>
          ))
        )}
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
  noDataText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
  starsContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});