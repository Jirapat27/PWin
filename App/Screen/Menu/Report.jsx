import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, TextInput, Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function Report() {
  const navigation = useNavigation();
  const [placeName, setPlaceName] = useState('');
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

  const handleSubmit = () => {
    Alert.alert(
      'คุณต้องการแจ้งปัญหา',
      'คุณแน่ใจหรือว่าต้องการทำรายการนี้?',
      [
        {
          text: 'ยกเลิก',
          style: 'cancel',
        },
        {
          text: 'ยืนยัน',
          onPress: () => {
            console.log('Selected Issues:', issues);
            setIssues({
              incorrectName: false,
              missingLocation: false,
              incorrectPosition: false,
              other: false,
            });
            setSubmitDisabled(true);
            navigation.navigate("AppMapView_HomeScreen");
          },
        },
      ],
      { cancelable: false }
    );
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

      if (!result.cancelled) {
        setImages([...images, result.uri]);
        handleCheckBoxChange(); // Check if button should be enabled after adding an image
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดระหว่างการเลือกรูปภาพ:", error);
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
        <Text style={styles.title}>แจ้งปัญหา</Text>
      </View>
      <ScrollView>
        <Text style={styles.title1}>คุณต้องการแจ้งปัญหา</Text>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIssues({ ...issues, incorrectName: !issues.incorrectName }); handleCheckBoxChange(); }}>
          {renderCheckIcon(issues.incorrectName)}
          <Text style={styles.checkboxLabel}>ชื่อไม่ถูกต้อง</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIssues({ ...issues, missingLocation: !issues.missingLocation }); handleCheckBoxChange(); }}>
          {renderCheckIcon(issues.missingLocation)}
          <Text style={styles.checkboxLabel}>สถานที่ไม่มี</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIssues({ ...issues, incorrectPosition: !issues.incorrectPosition }); handleCheckBoxChange(); }}>
          {renderCheckIcon(issues.incorrectPosition)}
          <Text style={styles.checkboxLabel}>ตำแหน่งไม่ถูกต้อง</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIssues({ ...issues, other: !issues.other }); handleCheckBoxChange(); }}>
          {renderCheckIcon(issues.other)}
          <Text style={styles.checkboxLabel}>อื่นๆ</Text>
        </TouchableOpacity>

        <Text style={styles.label}>ชื่อสถานที่</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPlaceName}
          value={placeName}
          placeholder="กรุณาใส่ชื่อสถานที่ที่ถูกต้อง"
        />
        <View style={styles.modalContainer}>
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
          placeholder="กรุณาใส่ข้อมูลเพิ่มเติม"
        />
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: submitDisabled ? '#D3D3D3' : '#FF8A48' }]}
        onPress={handleSubmit}
        disabled={submitDisabled}
      >
        <Text style={styles.buttonText}>ยืนยัน</Text>
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
    textAlign: 'right',
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
