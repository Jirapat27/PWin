import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, Image } from 'react-native';
import { useNavigation, useRoute} from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../../firebaseConfig';
import { ref, push, set } from "firebase/database";
import { format } from 'date-fns';

export default function ReportWin() {
  const navigation = useNavigation();
  const [placeName, setPlaceName] = useState('');
  const [loading, setLoading] = useState(false)
  const route = useRoute();
  const {from_placeName} = route.params;
  console.log(from_placeName);

  const [issues, setIssues] = useState({
    incorrectName: false,
    missingLocation: false,
    incorrectPosition: false,
    other: false,
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [images, setImages] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const renderCheckIcon = (isChecked) => (
    isChecked ? <MaterialIcons name="check-box" size={24} color="green" /> : <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
  );

  const handleCheckBoxChange = () => {
    const isCheckBoxSelected = Object.values(issues).some(issue => issue);
    const isImageSelected = images.length >= 1;
    const isPlaceNameEntered = placeName.trim() !== '';
    const isAdditionalInfoEntered = additionalInfo.trim() !== '';

    if (isCheckBoxSelected && (isPlaceNameEntered || isAdditionalInfoEntered || isImageSelected)) {
        setSubmitDisabled(false); // Enable submit button
    } else {
        setSubmitDisabled(true); // Disable submit button
    }
};

  const handleSubmit = async () => {
    try {
      // Check if at least one checkbox is selected and one of the required fields is filled
      const isCheckBoxSelected = Object.values(issues).some(issue => issue);
      const isImageSelected = images.length > 0;
      const isPlaceNameEntered = placeName.trim() !== '';
      const isAdditionalInfoEntered = additionalInfo.trim() !== '';

      if (!isCheckBoxSelected || !(isImageSelected || isPlaceNameEntered || isAdditionalInfoEntered)) {
        Alert.alert('คำเตือน', 'โปรดเลือกหัวข้อปัญหามา 1 หัวข้อ และ เติมข้อมูลอย่างน้อย 1 ช่อง.');
        return;
      }

      // Show confirmation prompt
      Alert.alert(
        'ยืนยัน',
        'คุณแน่ใจหรือไม่ที่จะส่งรายงานตัวนี้?',
        [
          {
            text: 'ยกเลิก',
            style: 'cancel'
          },
          {
            text: 'ยืนยัน',
            onPress: async () => {
              setLoading(true);

              // Get current timestamp
              const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
              
              // Construct report object
              const report = {
                types: issues,
                timestamp,
                placename: from_placeName,
                new_placename: placeName,
                Images: images,
                description: additionalInfo,
                rid: null // Initialize rid to null for now
              };

              // Push report to the 'Reports' node in Firebase Realtime Database
              const newReportRef = push(ref(db, 'Reports'), report);
              const rid = newReportRef.key; // Get the generated report ID

              // Update report object with the generated rid
              report.rid = rid;

              // Update the report in the database with the generated rid
              await set(ref(db, `Reports/${rid}`), report);

              // Reset states
              setIssues({
                incorrectName: false,
                missingLocation: false,
                incorrectPosition: false,
                other: false,
              });
              setPlaceName('');
              setImages([]);
              setAdditionalInfo('');
              setSubmitDisabled(true);

              // Navigate back
              navigation.navigate('AppMapView_HomeScreen');

              console.log('ส่งรายงานสำเร็จ:', report);
            }
          }
        ]
      );
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการส่งรายงาน:', error.message);
    }
  };

  const handleAddImage = async () => {
    try {
      if (images.length >= 6) {
        Alert.alert("คุณสามารถเพิ่มได้มากที่สุดถึง 6 รูป");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setImages([...images, result.uri]);
        handleCheckBoxChange(); // Check if button should be enabled after adding an image
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเลือกรูป:", error);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    handleCheckBoxChange(); // Check if button should be enabled after removing an image
  };

  return (
    <View style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => navigation.navigate("AppMapView_HomeScreen")}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.containertitle}>
        <Text style={styles.title}>รายงานจุดมาร์ค</Text>
      </View>
      <ScrollView>
        <Text style={styles.title1}>หัวข้อปัญหา</Text>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIssues({ ...issues, incorrectName: !issues.incorrectName }); handleCheckBoxChange(); }}>
          {renderCheckIcon(issues.incorrectName)}
          <Text style={styles.checkboxLabel}>ชื่อไม่ถูกต้อง</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIssues({ ...issues, missingLocation: !issues.missingLocation }); handleCheckBoxChange(); }}>
          {renderCheckIcon(issues.missingLocation)}
          <Text style={styles.checkboxLabel}>สถานที่ไม่ที</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIssues({ ...issues, incorrectPosition: !issues.incorrectPosition }); handleCheckBoxChange(); }}>
          {renderCheckIcon(issues.incorrectPosition)}
          <Text style={styles.checkboxLabel}>ตำแหน่งไม่ถูกต้อง</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIssues({ ...issues, other: !issues.other }); handleCheckBoxChange(); }}>
          {renderCheckIcon(issues.other)}
          <Text style={styles.checkboxLabel}>อื่นๆ</Text>
        </TouchableOpacity>

        <Text style={styles.label}>ชื่อสถานที่ที่ถูกต้อง</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPlaceName}
          value={placeName}
          placeholder="โปรดกรอกชื่อสถานที่ที่ถูกต้อง"
        />
        <View style={styles.modalContainer}>
          <Text style={styles.label}>เพิ่มรูปภาพ</Text>
          <View style={styles.imageContainer}>
            {images.map((uri, index) => (
              <View key={index} style={styles.imageItem}>
                <Image source={{ uri }} style={styles.image} />
                <TouchableOpacity onPress={() => handleRemoveImage(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
            {images.length < 6 && (
              <TouchableOpacity onPress={handleAddImage}>
                <Image
                  source={require("../../../assets/images/AddImage.png")}
                  style={styles.imagePlaceholder}
                ></Image>
              </TouchableOpacity>
            )}
          </View>
        </View>

        <Text style={styles.label}>ข้อมูลเพิ่มเติม</Text>
        <TextInput
          style={styles.input}
          onChangeText={setAdditionalInfo}
          value={additionalInfo}
          placeholder="โปรดกรอกข้อมูลเพิ่มเติม"
        />
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: submitDisabled ? '#D3D3D3' : '#FF8A48' }]}
        onPress={handleSubmit}
        disabled={submitDisabled}
      >
        <Text style={styles.buttonText}>ส่งรายงาน</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    margin: 20,
  },
  close: {
    position: 'absolute',
    top: 5,
    right: 10,
    marginRight: -5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    width: '65%',
    marginBottom: 20,
    left: 100,  
    fontFamily: 'BaiJamjuree-Bold',
  },
  title1: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'BaiJamjuree-Regular',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 18,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'orange',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#FF8A48",
    width: "100%",
    height: 54,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderColor: 'orange',
  },
  imageItem: {
    marginRight: 25,
    marginBottom: 25,
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  removeButton: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'BaiJamjuree-Regular',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 4,
    opacity: 0.5,
  },
});
