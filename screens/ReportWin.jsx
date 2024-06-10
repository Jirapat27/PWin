import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, Text, TextInput, TouchableOpacity, Image, Alert, View, StyleSheet, BackHandler, Platform, Dimensions, StatusBar } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import { format } from 'date-fns';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import DropDownPicker from 'react-native-dropdown-picker';
import closeIcon from '../images/Close.png';
import backButton from '../images/backButton.png';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const ReportWin = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  
  const { placeName, mid, username } = route.params;

  console.log(placeName, mid, username);

  const [formData, setFormData] = useState({
    new_placename: '',
    description: '',
    images: [],
    selectedCategory: '---',
  });

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
          console.error('Permission request denied.');
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการขอสิทธิ์:', error);
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [navigation, username]);

  const handleAddDetail = async () => {
    try {
      setError(null);
  
      // Check if the problem type is selected
      if (formData.selectedCategory === '---') {
        Alert.alert('คำเตือน', 'กรุณาเลือกหัวข้อปัญหาก่อนทำการส่งรายงาน');
        return;
      }
  
      // Check if at least one input field is filled
      if (!formData.new_placename && !formData.description && formData.images.length === 0) {
        Alert.alert('คำเตือน', 'กรุณากรอกข้อมูลอย่างน้อยหนึ่งช่อง');
        return;
      }
  
      const confirmed = await showConfirmationPopup();
  
      if (confirmed) {
        setLoading(true);
  
        const imageURLs = await Promise.all(
          formData.images.map(async (image) => {
            const filename = image.path.split('/').pop();
            const storageRef = storage().ref(`reports/${filename}`);
            await storageRef.putFile(image.path);
            return await storageRef.getDownloadURL();
          })
        );
  
        console.log('Uploaded images:', imageURLs);
  
        const reportRef = database().ref('Reports').push();
        const rid = reportRef.key;
        const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        await reportRef.set({
          rid: rid,
          mid: mid,
          placename: placeName,
          new_placename: formData.new_placename, // Fixed typo here
          description: formData.description,
          category: formData.selectedCategory,
          images: imageURLs,
          username: username,
          timestamp: timestamp,
        });
  
        console.log('Report added successfully');
        console.log('Newly added report key:', rid);
  
        showSuccessPopup();
      }
    } catch (error) {
      console.error('Error adding report:', error);
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกข้อมูลได้ กรุณาลองอีกครั้ง.');
      setError(`Failed to add report: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const showConfirmationPopup = () => {
    return new Promise((resolve) => {
      Alert.alert(
        'ยืนยันการบันทึก',
        'คุณแน่ใจหรือไม่ว่าต้องการดำเนินการต่อ',
        [
          {
            text: 'Cancel',
            onPress: () => resolve(false),
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };

  const showSuccessPopup = () => {
    Alert.alert('สำเร็จ', 'ส่งการรายงานเรียบร้อยแล้ว!', [
      {
        text: 'OK',
        onPress: () => {
          setFormData({
            new_placename: '',
            description: '',
            images: [],
            selectedCategory: '---'
          });

          navigation.navigate('Home', { refresh: true });
        },
      },
    ]);
  };

  const handleAddImage = async () => {
    try {
      if (formData.images.length >= 1) {
        Alert.alert('คุณสามารถเพิ่มรูปภาพได้เพียงแค่ 1 รูปเท่านั้น');
        return;
      }

      const result = await ImagePicker.openPicker({
        multiple: false,
        mediaType: 'photo',
        compressImageQuality: 1,
      });

      if (result) {
        setFormData((prevData) => ({
          ...prevData,
          images: [...prevData.images, result],
        }));
      }
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเลือกรูปภาพ:', error);
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prevData) => {
      const updatedImages = [...prevData.images];
      updatedImages.splice(index, 1);
      return { ...prevData, images: updatedImages };
    });
  };

  const [items, setItems] = useState([
    { label: '---', value: '---' },
    { label: 'ชื่อไม่ถูกต้อง', value: 'ชื่อไม่ถูกต้อง' },
    { label: 'สถานที่ไม่มี', value: 'สถานที่ไม่มี' },
    { label: 'ตำแหน่งไม่ถูกต้อง', value: 'ตำแหน่งไม่ถูกต้อง' },
    { label: 'อื่นๆ', value: 'อื่นๆ' },
    // Add more categories as needed
  ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={backButton} style={[styles.icon]} />
        </TouchableOpacity>
      <View style={styles.head}>
        <Text style={styles.title}>รายงานจุดวิน</Text>
      </View>
      <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewContent}>
        <Text style={styles.dropdownlabel}>หมวดหมู่*</Text>
        <DropDownPicker
          open={open}
          value={formData.selectedCategory}
          items={items}
          setOpen={setOpen}
          setValue={(callback) => setFormData(prevData => ({ ...prevData, selectedCategory: callback(prevData.selectedCategory) }))}
          setItems={setItems}
          style={styles.input}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
        />
        <View style={styles.labeContainer}>
          <Text style={styles.label}>ชื่อสถานที่ใหม่</Text>
          <Text style={styles.sublabel}>(ชื่อไม่ถูกต้อง)</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder={"ชื่อสถานที่.."}
          value={formData.new_placename}
          onChangeText={(text) => setFormData({ ...formData, new_placename: text })}
        />
        <View style={styles.labeContainer}>
          <Text style={styles.label}>คำอธิบายปัญหา</Text>
          <Text style={styles.sublabel}>(ชื่อไม่ถูกต้อง,สถานที่ไม่มี,ตำแหน่งไม่ถูกต้อง,อื่นๆ)</Text>
        </View>
        <TextInput
          style={{ ...styles.input, textAlignVertical: 'top' }}
          placeholder="ใส่คำอธิบาย.."
          multiline
          numberOfLines={4}
          value={formData.description}
          onChangeText={(text) => setFormData({ ...formData, description: text })}
        />
        <View style={styles.labeContainer}>
          <Text style={styles.label}>เพิ่มรูปภาพ</Text>
          <Text style={styles.sublabel}>(สถานที่ไม่มี,ตำแหน่งไม่ถูกต้อง,อื่นๆ)</Text>
        </View>
        <FlatList
          horizontal
          data={formData.images}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.imageItem}>
              <Image source={{ uri: item.path }} style={styles.image} />
              <TouchableOpacity onPress={() => handleRemoveImage(index)} style={styles.closeIconContainer}>
                <Image source={closeIcon} style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={
            formData.images.length < 6 ? (
              <TouchableOpacity onPress={handleAddImage}>
                <Image source={require('../images/AddImage.png')} style={styles.imagePlaceholder} />
              </TouchableOpacity>
            ) : null
          }
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>
      <TouchableOpacity style={styles.addButton.container} onPress={handleAddDetail}>
        <Text style={styles.addButton.Text}>บันทึก</Text>
      </TouchableOpacity>
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
  labelContainer: {
    flexDirection: 'column',
  },
  dropdownlabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  sublabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
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
    position: 'relative',
    marginRight: 10,
    marginBottom: 10,
  },
  closeIconContainer: {
    position: 'absolute',
    top: windowHeight * 0.01,
    right: windowHeight * 0.01,
    zIndex: 1,
  },
  closeIcon: {
    width: 30,
    height: 30,
    tintColor: 'black',
    backgroundColor: 'white',
    borderRadius: 15,
  },
  image: {
    width: windowWidth * 0.92,
    height: windowHeight * 0.4,
    marginRight: 6,
  },
  imagePlaceholder: {
    width: windowWidth * 0.89,
    height: windowHeight * 0.4,
    borderRadius: 4,
    opacity: 0.5,
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
  scrollViewContent: {
    paddingBottom: 50,
  },
});

export default ReportWin;
