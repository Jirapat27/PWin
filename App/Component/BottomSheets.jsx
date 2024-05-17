import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, ScrollView, Alert, Linking, Platform, Modal, Clipboard } from "react-native";
import Comment from './Comment';
import { auth, db } from "../../firebaseConfig";
import { ref, get } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from 'firebase/auth';
import Stars from 'react-native-stars';

const { width: windowWidth } = Dimensions.get("window");
const gap = 10;

export default function BottomSheets({ sheetPlaces, location, onClose }) {

  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [comments, setComments] = useState([]);

  const handleShareLocation = () => {
    const destination = sheetPlaces;
    const coordinates = `${destination.latitude},${destination.longitude}`
    const googleMapUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;

    Clipboard.setString(googleMapUrl);
    alert('คัดลอกลง clipboard แล้ว!');
  };
  
  // const handleShareLocation = () => {
  //   const destination = sheetPlaces;
  //   const coordinates = `${destination.latitude},${destination.longitude}`;
  //   const googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates}`;

  //   Clipboard.setString(googleMapUrl);
  //   alert('Link copied to clipboard!');
  // };

  useEffect(() => {
    if (sheetPlaces) {
      console.log(sheetPlaces, "btt")
    }
  }, [sheetPlaces])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

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
          let commentsArray = Object.values(commentsData)
            .filter(comment => comment.placeName === sheetPlaces?.name);
  
          console.log('Comments Array (Before Sorting):', commentsArray);
  
          // Convert timestamp to JavaScript Date object and sort comments by timestamp, latest first
          const sortedCommentsArray = commentsArray.sort((a, b) => {
            const timestampA = new Date(a.timestamp);
            const timestampB = new Date(b.timestamp);
            return timestampB - timestampA;
          });
  
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
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลความคิดเห็น:', error);
      }
    };
  
    fetchComments();
  
    return () => {}; // Cleanup function
  }, [sheetPlaces?.name]);

  const handleStartJourney = () => {
    const { latitude, longitude } = location;
    const destination = sheetPlaces;

    if (latitude && longitude && destination) {
      const url = Platform.select({
        ios: `maps://app?saddr=${latitude},${longitude}&daddr=${destination.latitude},${destination.longitude}`,
        android: `google.navigation:q=${destination.latitude},${destination.longitude}`,
      });

      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("เกิดข้อผิดพลาด", "Google Maps ยังไม่ได้ติดตั้งบนอุปกรณ์ของคุณ");
        }
      });
    } else {
      Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถรับตำแหน่งหรือจุดหมายปลายทางปัจจุบันของคุณได้");
    }
  };

  const handleReportPress = () => {
    setModalVisible(true);
  };

  const handleAddCommentPress = async () => {
    if (user) {
      try {
        const userPath = ref(db, 'users/' + user.uid);
        const userSnapshot = await get(userPath);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const username = userData.username;

          const placeName = sheetPlaces?.name;

          navigation.navigate('CommentForm', { username, placeName });
        } else {
          console.log("ไม่พบข้อมูลผู้ใช้");
        }
      } catch (error) {
        console.error("เกิดข้อผิดพลาดระหว่างการดึงข้อมูล:", error);
      }
    } else {
      showLoginPopup();
    }
  };

  const showLoginPopup = () => {
    Alert.alert(
      "เข้าสู่ระบบ",
      "คุณต้องเข้าสู่ระะบบก่อนจึงจะสามารถแสดงความคิดเห็นได้",
      [
        {
          text: "ยกเลิก",
          style: "cancel",
        },
        {
          text: "เข้าสู่ระบบ",
          onPress: () => {
            navigation.navigate("LogInScreen_comment", { placeName: sheetPlaces?.name });
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
          <TouchableOpacity style={styles.buttonDirec} onPress={handleStartJourney}>
            <Text style={styles.buttonText}>เริ่มเส้นทาง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMore} onPress={handleReportPress}>
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
                <TouchableWithoutFeedback key={index} onPress={() => console.log("กดที่รูป")}>
                  <View style={{ marginRight: gap }}>
                    <Image
                      source={{ uri: imageUrl }}
                      style={styles.horizontalImage}
                    />
                  </View>
                </TouchableWithoutFeedback>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={styles.commentHeader}>
          <Text style={styles.commentText}>ความคิดเห็น</Text>
          <TouchableOpacity style={styles.commentButton} onPress={handleAddCommentPress}>
            <Image
              source={require("../../assets/images/Plus.png")}
              style={styles.plusIcon}
            />
          </TouchableOpacity>
        </View>
        <ScrollView 
          style={styles.commentsContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {comments.length === 0 ? (
            <Text style={styles.noDataText}>ยังไม่มีความคิดเห็น</Text>
          ) : (
            <View style={{ flexDirection: 'row' }}>
              {comments.map((comment, index) => (
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
              ))}
            </View>
          )}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.modalButton, styles.shareButton]} onPress={handleShareLocation}>
                  <Text style={[styles.buttonText, styles.blackText]}>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.reportButton]} onPress={() => {
                  navigation.navigate('ReportWin', { from_placeName: sheetPlaces?.name });
                  setModalVisible(false);
                }}>
                  <Text style={[styles.buttonText, styles.blackText]}>Report</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: 0,
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
  commentItem: {
    flexDirection: 'row',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    margin: 3,
    height: 100, 
    width: 250, // Adjust the width of each comment item
    backgroundColor: "#DDDDDD",
    zIndex: 9999,
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
  horizontalImage: {
    height: 200,
    width: 300,
  },
  rowImage: {
    flexDirection: "row",
    paddingVertical: 10,
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
    zIndex: 15,
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
    marginBottom: 10,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 10,
    width: '40%',
    height: '20%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  blackText: {
    color: '#000000',
    fontSize: 20,
  },
});
