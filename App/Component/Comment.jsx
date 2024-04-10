import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { ref, get } from "firebase/database";
import { db } from '../../firebaseConfig'; // Import the database reference
import Stars from 'react-native-stars';

export default function Comment({ placeName }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const commentsRef = ref(db, 'comments');
      const usersRef = ref(db, 'users');
  
      try {
        const commentsSnapshot = await get(commentsRef);
        const usersSnapshot = await get(usersRef);
  
        const commentsData = commentsSnapshot.val();
        const usersData = usersSnapshot.val();
  
        if (commentsData && usersData) {
          const commentsArray = Object.values(commentsData)
            .filter(comment => comment.placeName === placeName);
  
          console.log('Comments Array (Before Sorting):', commentsArray);
  
          // Sort comments by timestamp, latest first
          const sortedCommentsArray = commentsArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
          console.log('Comments Array (After Sorting):', sortedCommentsArray);
  
          const commentsWithUserInfo = sortedCommentsArray.map(comment => {
            const user = Object.values(usersData).find(user => user.username === comment.username);
            const userData = user ? { username: user.username, profilePic: user.profilePic } : null;
            return { ...comment, userData };
          });
  
          setComments(commentsWithUserInfo);
        } else {
          setComments([]);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
  
    fetchComments();
  
    return () => {}; // Cleanup function
  }, [placeName]);

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.commentsContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {comments.length === 0 ? (
          <Text style={styles.noDataText}>ยังไม่มีการแสดงความคิดเห็น</Text>
        ) : (
          comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <View style={styles.userInfo}>
                {comment.userData && comment.userData.profilePic && (
                  <Image
                    source={{ uri: comment.userData.profilePic }}
                    style={styles.profilePic}
                  />
                )}
                <Text style={styles.username}>{comment.userData && comment.userData.username}</Text>
              </View>
              <Text style={styles.descriptionText}>{comment.description}</Text>
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
                  halfStarColor="#FF8A48"// Adjust the padding of the stars
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
    marginTop: 20,
    paddingBottom: 20,
    flex: 1,
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    bottom: 15,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 27,
    left: 55,
  },
  descriptionText: {
    fontSize: 20,
    position: 'absolute',
    top: 60,
    left: 12,
  },
  noDataText: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});