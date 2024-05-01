import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Report({ navigation }) { 
  const [incorrectName, setIncorrectName] = useState(false);
  const [missingLocation, setMissingLocation] = useState(false);
  const [incorrectPosition, setIncorrectPosition] = useState(false);
  const [other, setOther] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const renderCheckIcon = (isChecked) => (
    isChecked ? <MaterialIcons name="check-box" size={24} color="green" /> : <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
  );

  const handleCheckBoxChange = () => {
    if (incorrectName || missingLocation || incorrectPosition || other) {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  };

  const handleSubmit = () => {
    const selectedIssues = {
      incorrectName,
      missingLocation,
      incorrectPosition,
      other,
    };
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
            console.log('Selected Issues:', selectedIssues);
            setIncorrectName(false);
            setMissingLocation(false);
            setIncorrectPosition(false);
            setOther(false);
            setSubmitDisabled(true);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={36} color="#FF9A62" />
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.containertitle}>
          <Text style={styles.title}>แจ้งปัญหา</Text>
        </View>
        <Text style={styles.title1}>คุณต้องการแจ้งปัญหา</Text>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIncorrectName(!incorrectName); handleCheckBoxChange(); }}>
          {renderCheckIcon(incorrectName)}
          <Text style={styles.checkboxLabel}>ชื่อไม่ถูกต้อง</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setMissingLocation(!missingLocation); handleCheckBoxChange(); }}>
          {renderCheckIcon(missingLocation)}
          <Text style={styles.checkboxLabel}>สถานที่ไม่มี</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setIncorrectPosition(!incorrectPosition); handleCheckBoxChange(); }}>
          {renderCheckIcon(incorrectPosition)}
          <Text style={styles.checkboxLabel}>ตำแหน่งไม่ถูกต้อง</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => { setOther(!other); handleCheckBoxChange(); }}>
          {renderCheckIcon(other)}
          <Text style={styles.checkboxLabel}>อื่นๆ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={submitDisabled}>
          <Text style={styles.buttonText}>ยืนยัน</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  containertitle: {
    top: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'BaiJamjuree-Bold',
  },
  title1: {
    fontSize: 20,
    marginBottom: 20,
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
    fontSize: 20,
    fontFamily: 'BaiJamjuree-Bold',
  },
});
