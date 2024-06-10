import React, { useState, useEffect } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, Image, Alert, View, StyleSheet, BackHandler, Platform, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage'; // Correct import
import { format } from 'date-fns';
import { StatusBar } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

import closeIcon from '../images/Close.png';
import backButton from '../images/backButton.png';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const AddDetailScreen = ({ navigation, route }) => {
  const [placeName, setPlaceName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { placeCoor, username } = route.params;

  useEffect(() => {
    const requestPermission = async () => {
      try {
        const result = await request(
          Platform.select({
            android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
          })
        );
        if (result !== RESULTS.GRANTED) {
          console.error('คำขอในการเข้าถึงคลังข้อมูลถูกปฏิเสธ');
        }
      } catch (error) {
        console.error('Error requesting permissions:', error);
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('AddPlace', {
        username: username,
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation, username]);

  const handleAddDetail = async () => {
    try {
      setError(null);

      if (!placeName || images.length === 0) {
        Alert.alert('คำเตือน', 'กรุณากรอกข้อมูลให้ครบ');
        return;
      }

      const confirmed = await showConfirmationPopup();

      if (confirmed) {
        setLoading(true);

        const promises = images.map(async (image) => {
          const filename = image.path.substring(image.path.lastIndexOf('/') + 1);
          const storageRefChild = storage().ref(`/images/${filename}`);
          await storageRefChild.putFile(image.path);
          return await storageRefChild.getDownloadURL();
        });

        const imageURLs = await Promise.all(promises);

        console.log('Uploaded images:', imageURLs);

        const placesRef = database().ref('MarkWin');
        const newPlaceChildRef = placesRef.push();
        const mid = newPlaceChildRef.key;
        const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        await newPlaceChildRef.set({
          mid: mid,
          name: placeName,
          description: description || '',
          images: imageURLs,
          latitude: placeCoor.latitude,
          longitude: placeCoor.longitude,
          username: username,
          timestamp: timestamp,
        });

        console.log('เพิ่มสถานที่สำเร็จ');
        console.log('Newly added place key:', mid);

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
        'ยืนยันการบันทึก',
        'คุณแน่ใจหรือว่าต้องการทำรายการนี้?',
        [
          {
            text: 'ยกเลิก',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'ยืนยัน',
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  const showSuccessPopup = () => {
    Alert.alert('สำเร็จ', 'เพิ่มสถานที่สำเร็จแล้ว!', [
      {
        text: 'OK',
        onPress: () => {
          setPlaceName('');
          setDescription('');
          setImages([]);

          // Navigate back to Map_HomeScreen and pass a parameter to indicate success
          navigation.navigate('Home', { refresh: true });
        },
      },
    ]);
  };

  const handleAddImage = async () => {
    try {
      if (images.length >= 6) {
        Alert.alert('คุณสามารถเพิ่มรูปภาพได้เพียงแค่ 6 รูปเท่านั้น');
        return;
      }

      const result = await ImagePicker.openPicker({
        multiple: false,
        mediaType: 'photo',
        compressImageQuality: 1,
      });

      if (!result.didCancel) {
        setImages([...images, result]);
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดระหว่างการเลือกรูปภาพ:', error);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={backButton} style={[styles.icon]} />
    </TouchableOpacity>
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
        style={{ ...styles.input, textAlignVertical: 'top' }}
        placeholder="ใส่คำอธิบาย.."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Text style={styles.label}>เพิ่มรูปภาพ</Text>
      <ScrollView horizontal style={styles.imageContainer}>
      {images.map((image, index) => (
          <View key={index} style={styles.imageItem}>
            <Image source={{ uri: image.path }} style={styles.image} />
            <TouchableOpacity onPress={() => handleRemoveImage(index)} style={styles.closeIconContainer}>
              <Image source={closeIcon} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
        ))}
        {images.length < 6 && (
          <TouchableOpacity onPress={handleAddImage}>
            <Image
              source={require('../images/AddImage.png')}
              style={styles.imagePlaceholder}
            ></Image>
          </TouchableOpacity>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.addButton.container} onPress={handleAddDetail}>
        <Text style={styles.addButton.Text}>บันทึก</Text>
      </TouchableOpacity>

      {loading && <Text>Loading...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  icon:{
    width: 40,
    height: 40,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#FF9A62',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginBottom: 16,
  },
  imageItem: {
    position: 'relative', // Make it a positioned container
    marginRight: 10,
    marginBottom: 10,
  },
  closeIconContainer: {
    position: 'absolute', // Position the close icon absolutely
    top: windowHeight * 0.01,
    right: windowHeight * 0.01,
    zIndex: 1, // Ensure it's above the image
  },
  closeIcon: {
    width: 40,
    height: 40,
    tintColor: 'black',
    backgroundColor: 'gray',
    borderRadius: 20,
  },
  image: {
    width: windowWidth * 0.89,
    height: windowHeight * 0.4,
    marginRight: 6,
  },
  removeButton: {
    position: 'absolute',
    left: '50%',
  },
  removeButtonText: {
    color: 'red',
  },
  imagePlaceholder: {
    width: windowWidth * 0.89,
    height: windowHeight * 0.4,
    borderRadius: 4,
    opacity: 0.5,
  },
  buttomContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: windowWidth * 0.025,
    width: '100%',
  },
  addButton: {
    container: {
      position: 'absolute',
      backgroundColor: '#FF8A48',
      height: 59,
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      alignItems: 'center',
      borderRadius: 12,
      bottom: windowWidth * 0.025,
      left: windowWidth * 0.039,
    },
    Text: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'semibold',
    },
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontFamily: 'BaiJamjuree-Regular',
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 40,
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AddDetailScreen;
