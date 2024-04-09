import React, { useState } from 'react';
import { View, Text, Image ,TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import CloseImage from "../../../assets/images/Close.png";

export default function Report() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const navigation = useNavigation();


  const handleCheckBoxChange = (key) => {
    if (selectedOption === key) {
      setSelectedOption(null); // Unselect the checkbox if it's already selected
    } else {
      setSelectedOption(key); // Select the checkbox
    }
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      // Proceed with submission or further action
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
              // Handle submission here
              Alert.alert('Selected Issue:', selectedOption);
              // Reset selected option and disable submit button
              setSelectedOption(null);
              setSubmitDisabled(true);
            },
          },
        ]
      );
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.containerhead}>
        <Text style={styles.title}>แจ้งปัญหา</Text>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Image source={CloseImage} />
        </TouchableOpacity>
      </View>
      
      </View>
      <Text style={styles.title1}>คุณต้องการแจ้งปัญหา</Text>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          handleCheckBoxChange('incorrectName');
          setSubmitDisabled(false); // Enable submit button
        }}
      >
        <MaterialIcons
          name={selectedOption === 'incorrectName' ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={selectedOption === 'incorrectName' ? 'green' : 'black'}
        />
        <Text style={styles.checkboxLabel}>ชื่อไม่ถูกต้อง</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          handleCheckBoxChange('missingLocation');
          setSubmitDisabled(false); // Enable submit button
        }}
      >
        <MaterialIcons
          name={selectedOption === 'missingLocation' ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={selectedOption === 'missingLocation' ? 'green' : 'black'}
        />
        <Text style={styles.checkboxLabel}>สถานที่ไม่มี</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          handleCheckBoxChange('incorrectPosition');
          setSubmitDisabled(false); // Enable submit button
        }}
      >
        <MaterialIcons
          name={selectedOption === 'incorrectPosition' ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={selectedOption === 'incorrectPosition' ? 'green' : 'black'}
        />
        <Text style={styles.checkboxLabel}>ตำแหน่งไม่ถูกต้อง</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => {
          handleCheckBoxChange('other');
          setSubmitDisabled(false); // Enable submit button
        }}
      >
        <MaterialIcons
          name={selectedOption === 'other' ? 'check-box' : 'check-box-outline-blank'}
          size={24}
          color={selectedOption === 'other' ? 'green' : 'black'}
        />
        <Text style={styles.checkboxLabel}>อื่นๆ</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={submitDisabled}
      >
        <Text style={styles.buttonText}>ยืนยัน</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },
  containerhead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  },
  title: {
    flex: 1, 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'BaiJamjuree-Bold',
  },
  close: {
    alignSelf: 'flex',
  },
  title1: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'BaiJamjuree',
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
  button: {
    backgroundColor: '#FF8A48',
    width: '100%',
    height: 54,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    marginTop: 280,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'BaiJamjuree-Bold',
  },
});
