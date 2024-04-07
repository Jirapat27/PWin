import React , {useState} from 'react'
import { View, Text, Image, TouchableOpacity, Button, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Report() {
  const [incorrectName, setIncorrectName] = useState(false);
  const [missingLocation, setMissingLocation] = useState(false);
  const [incorrectPosition, setIncorrectPosition] = useState(false);
  const [other, setOther] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const renderCheckIcon = (isChecked) => (
    isChecked ? <MaterialIcons name="check-box" size={24} color="green" /> : <MaterialIcons name="check-box-outline-blank" size={24} color="black" />
  );

const handleCheckBoxChange = (key) => {
  if (incorrectName || missingLocation || incorrectPosition || other) {
    setSubmitDisabled(true); // กำหนดให้ปุ่ม Submit สามารถกดได้
  } else {
    setSubmitDisabled(false); // กำหนดให้ปุ่ม Submit ไม่สามารถกดได้
  }
};

const handleSubmit = () => {
  // ตรวจสอบ checkbox ที่ถูกเลือกแล้วทำสิ่งที่ต้องการ
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
          // ส่งข้อมูลไปยัง API หรือทำการจัดการข้อมูลต่อไป
          console.log('Selected Issues:', selectedIssues);
          // ทำการล้างค่าตัวแปรหลังจากส่งข้อมูล
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
  // ส่งข้อมูลไปยัง API หรือทำการจัดการข้อมูลต่อไป
};

    return (  
      <View style={styles.container}>
      <View style={styles.close}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          
        </TouchableOpacity>
      </View>
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
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 40,
  },  
  close:{
    alignSelf:'flex-end',
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
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: 'white',
    borderColor: 'white',
  },
  button: {
    backgroundColor: "#FF8A48",
    width:"100%",
    height:54,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 12,
    
  },
  
});