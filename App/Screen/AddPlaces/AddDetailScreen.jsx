import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Image, Alert, View, StyleSheet, BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, push, set } from 'firebase/database';
import { storageRef, uploadBytes, storage, getDownloadURL, db } from '../../../firebaseConfig';
import { format } from 'date-fns';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";

export default function AddDetailScreen() {
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute hook to access route params

  const { latitude, longitude, username } = route.params; // Destructure latitude and longitude from route params

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.error("คำขอในการเข้าถึงคลังข้อมูลถูกปฎิเสธ");
      }
    })();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('AddPlaceScreen', {
        username: username, // Pass the username when navigating back to AddPlaceScreen
      }); // changed 'HomeScreen' to 'AddPlaceScreen'
      return true; // Prevent default behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation]);

  const handleAddDetail = async () => {
    try {
      setError(null);
  
      // Check if any required field is empty
      if (!placeName || images.length === 0) {
        Alert.alert('Warning', 'กรุณากรอกข้อมูลให้ครบ');
        return;
      }
  
      const confirmed = await showConfirmationPopup();
  
      if (confirmed) {
        setLoading(true);
  
        const promises = images.map(async (image) => {
          const filename = image.substring(image.lastIndexOf('/') + 1);
          const storageRefChild = storageRef(storage, `/images/${filename}`);
          const response = await fetch(image);
          const blob = await response.blob();
          await uploadBytes(storageRefChild, blob);
          return await getDownloadURL(storageRefChild); // Await here
        });
  
        const imageURLs = await Promise.all(promises);
  
        console.log('Uploaded images:', imageURLs);
  
        // After successfully uploading images to Storage, store imageURLs in the database
        const placesRef = ref(db, 'MarkWin/');
        const newPlaceChildRef = push(placesRef);
        const mid = newPlaceChildRef.key;
        const timestamp = format(new Date(), "HH:mm EEEE, dd MMMM yyyy (zzzz)");
        await set(newPlaceChildRef, {
          mid: mid,
          name: placeName,
          description: description || '',
          images: imageURLs, // Store the image URLs
          latitude: latitude,
          longitude: longitude,
          username: username,
          timestamp: timestamp, // Add timestamp here
        });
  
        console.log('เพิ่มสถานที่สำเร็จ');
        console.log('Newly added place key:', mid);
  
        // Show success popup
        showSuccessPopup();
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดระหว่างการบันทึกสถานที่: ', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้. โปรดลองใหม่อีกครั้ง');
      setError(`การเพิ่มข้อมูลล้มเหลว: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const showConfirmationPopup = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "ยืนยันการบันทึก",
        "คุณแน่ใจหรือว่าต้องการทำรายการนี้?",
        [
          {
            text: "ยกเลิก",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "ยืนยัน",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  const showSuccessPopup = () => {
    Alert.alert("Success", "เพิ่มสถานที่สำเร็จ", [
      {
        text: "OK",
        onPress: () => {
          // Reset the state variables after successful submission
          setPlaceName("");
          setDescription("");
          setImages([]);

          // Navigate to HomeScreen.js
          navigation.navigate('AppMapView_HomeScreen');
        },
      },
    ]);
  };

  const handleAddImage = async () => {
    try {
      if (images.length >= 6) {
        Alert.alert("สามารถเพิ่มรูปภาพได้เพียงแค่ 6 รูปเท่านั้น");
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.canceled) {
        // Use the assets array instead of uri
        setImages([...images, result.assets[0].uri]);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดระหว่างการเลือกรูปภาพ:", error);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.title}>เพิ่มสถานที่ตั้ง</Text>
      </View>
      <Text style={styles.label}>ชื่อสถานที่*</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อสถานที่.."
        value={placeName}
        onChangeText={(text) => setPlaceName(text)}
      />

      <Text style={styles.label}>คำอธิบาย</Text>
      <TextInput
        style={{ ...styles.input, textAlignVertical: "top" }}
        placeholder="ใส่คำอธิบาย.."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Text style={styles.label}>เพิ่มรูปภาพ</Text>
      <View style={styles.imageContainer}>
        {images.map((uri, index) => (
          <View key={index} style={styles.imageItem}>
            <Image source={{ uri }} style={styles.image} />
            <TouchableOpacity onPress={() => handleRemoveImage(index)} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        ))}
        {images.length < 6 && (
          <TouchableOpacity onPress={handleAddImage}>
            <Image
              source={require("./../../../assets/images/AddImage.png")}
              style={styles.imagePlaceholder}
            ></Image>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddDetail}>
        <Text style={styles.addButtonText}>บันทึก</Text>
      </TouchableOpacity>

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#FF9A62",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  imageItem: {
    marginRight: 25,
    marginBottom: 25,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    left: '43%',
  },
  removeButtonText: {
    color: 'red',
    marginBottom: -18,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 4,
    opacity: 0.5,
  },
  addButton: {
    backgroundColor: "#FF8A48",
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginTop: "auto",
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "BaiJamjuree-Bold",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontFamily: "BaiJamjuree-Regular",
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});