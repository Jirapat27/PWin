import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
} from "react-native";

const { width: windowWidth } = Dimensions.get("window");
const gap = 10;

export default function BottomSheets({ onClose }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>ซอยพุทธบูชา 44</Text>

      <View>
        <Text style={styles.normalText}>
          อยู่ปากซอยอยพุทธบูชา 44 ใกล้กับเซเว่น ข้างๆตีกสามชั้น
        </Text>
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
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

          <View style={styles.rowImage}>
            <Image
              source={require("../../assets/images/win-test.jpeg")}
              style={styles.image}
            />
            <Image
              source={require("../../assets/images/win-test.jpeg")}
              style={styles.image}
            />

          </View>
          </ScrollView>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  image: {
    height: 300,
    width: 300,
    //marginRight:15,
  },
  rowImage: {
    flexDirection: "row",
   
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
    //resizeMode: 'contain',
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#D9D9D9",
  },
});
