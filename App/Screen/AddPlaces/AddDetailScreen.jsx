import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Image, Alert, View, StyleSheet, BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, push, set } from 'firebase/database';
import { db, storage } from '../../../firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from "expo-status-bar";

export default function AddPlaceScreen() {
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();

  const { latitude, longitude } = route.params;
  console.log("test received data ", latitude, longitude) 

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
      navigation.navigate('AddPlaceScreen'); // changed 'HomeScreen' to 'AddPlaceScreen'
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

        // Create a new reference for the "MarkWin/places" node
        const placesRef = ref(db, 'MarkWin/');

        // Generate a unique key for the new place
        const newPlaceChildRef = push(placesRef);
        const newPlaceKey = newPlaceChildRef.key;

        // Set the data for the new place
        await set(newPlaceChildRef, {
          name: placeName,
          description: description || '',
          images: images,
          latitude: latitude,
          longitude: longitude,
        });

        console.log('เพิ่มสถานที่สำเร็จ');
        
        // Now you can use newPlaceKey to reference the newly added place
        console.log('Newly added place key:', newPlaceKey);

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
          navigation.navigate('HomeScreen');
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
              {/* Replace the Image with Text */}
              <Text style={styles.removeButtonText}>ลบ</Text>
            </TouchableOpacity>
          </View>
        ))}
        {images.length <= 6 && (
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