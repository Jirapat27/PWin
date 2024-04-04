import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, ScrollView } from "react-native";

const { width: windowWidth } = Dimensions.get("window");
const gap = 10;

export default function BottomSheets({ sheetPlaces, onClose }) {

  const navigation = useNavigation();
  const handleAddCommentPress = () => {
    navigation.navigate('Comment');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{sheetPlaces?.name}</Text>

      <View>
        <Text style={styles.normalText}>{sheetPlaces?.description}</Text>
        <View style={styles.rowButton}>
          <TouchableOpacity style={styles.buttonDirec}>
            <Text style={styles.buttonText}>เริ่มเส้นทาง</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMore}>
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
        <View style={styles.commentContainer}>
          <Text style={styles.commentText}>Comment</Text>
          <TouchableOpacity style={styles.commentButton} onPress={handleAddCommentPress}>
            <Image
              source={require("../../assets/images/Plus.png")}
              style={styles.plusIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
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
    fontFamily: "BaiJamjuree-Regular",
    marginRight: 10,
  },
  commentButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 5,
    padding: 5,
  },
  plusIcon: {
    width: 24,
    height: 24,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
});
