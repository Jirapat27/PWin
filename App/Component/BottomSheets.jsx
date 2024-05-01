import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, ScrollView, Alert, Linking, Platform, Modal, Clipboard  } from "react-native";
import Comment from './Comment';
import { auth, db } from "../../firebaseConfig";
import { ref, get } from "firebase/database";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from 'firebase/auth';

const { width: windowWidth } = Dimensions.get("window");
const gap = 10;

export default function BottomSheets({ sheetPlaces, location, onClose }) {

  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleShareLocation = () => {
    const destination = sheetPlaces;
    const coordinates = `${destination.latitude},${destination.longitude}`
    const googleMapUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates}`;

    Clipboard.setString(googleMapUrl);
    alert('Link copied to clipboard!');
  };

  const handleStartJourney = () => {
    const { latitude, longitude } = location;
    const destination = sheetPlaces;

    if (latitude && longitude && destination) {
      const url = Platform.select({
        ios: `maps://app?saddr=${latitude},${longitude}&daddr=${destination.latitude},${destination.longitude}&dirflg=w`,
        android: `google.navigation:mode=w&q=${destination.latitude},${destination.longitude}`

      });

      Linking.canOpenURL(url).then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Google Maps is not installed on your device.");
        }
      });
    } else {
      Alert.alert("Error", "Unable to get your current location or destination.");
    }
  };

  const handleReportPress = () => {
    setModalVisible(true);
  };

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
          console.log("User data does not exist");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      showLoginPopup();
    }
  };

  const showLoginPopup = () => {
    Alert.alert(
      "Login Required",
      "You need to log in to add a comment.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Log In",
          onPress: () => {
            navigation.navigate("LogInScreen_cal", { placeName: sheetPlaces?.name });
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
                <TouchableWithoutFeedback key={index} onPress={() => console.log("Image pressed")}>
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
        <Comment placeName={sheetPlaces?.name} />
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
                  <Text style={[styles.buttonText, styles.blackText]}>Copy Link</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.modalButton, styles.reportButton]} onPress={() => {
                  navigation.navigate('Report');
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