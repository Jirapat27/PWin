import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image  } from 'react-native';

import backButton from '../images/backButton.png';
import ตราครุฑ from '../images/ตราครุฑ.png';

const RateService = ({ navigation, data }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Image source={backButton} style={[styles.icon]} />
        </TouchableOpacity>
        <Image source={ตราครุฑ} style={styles.image} />
        <Text style={styles.headerText}>กฎกระทรวง</Text>
        <Text style={styles.subheaderText}>
          กําหนดอัตราค่าจ้างบรรทุกคนโดยสารสําหรับรถจักรยานยนต์สาธารณะ 
          {'\n'}
          พ.ศ. ๒๕๕๙
        </Text>
        <Text style={styles.text}>
          -------------------------------------------------
          {'\n'}
          {'\t\t\t'}อาศัยอํานาจตามความในมาตรา ๕ (๑๔) แห่งพระราชบัญญัติรถยนต์ พ.ศ. ๒๕๒๒
          ซึ่งแก้ไขเพิ่มเติมโดยพระราชบัญญัติรถยนต์ (ฉบับที่ ๑๓) พ.ศ. ๒๕๔๗ รัฐมนตรีว่าการกระทรวงคมนาคม
          ออกกฎกระทรวงไว้ ดังต่อไปนี้
          {'\n'}
          {'\t\t\t'}ข้อ ๑ ให้ยกเลิกกฎกระทรวงกําหนดอัตราค่าจ้างบรรทุกคนโดยสารสําหรับรถจักรยานยนต์สาธารณะ พ.ศ. ๒๕๔๘
          {'\n'}
          {'\t\t\t'}ข้อ ๒ อัตราค่าจ้างบรรทุกคนโดยสารสําหรับรถจักรยานยนต์สาธารณะ ให้กําหนด
          {'\n'}
          {'\t\t\t'}(๑) ระยะทาง ๒ กิโลเมตรแรก ต้องไม่เกิน ๒๕ บาท และกิโลเมตรต่อ ๆ ไป แต่ไม่เกิน
          ๕ กิโลเมตร ต้องไม่เกินกิโลเมตรละ ๕ บาท
          {'\n'}
          {'\t\t\t'}(๒) ระยะทางเกินกว่า ๕ กิโลเมตรขึ้นไป แต่ไม่เกิน ๑๕ กิโลเมตร ตั้งแต่กิโลเมตรแรก
          จนสิ้นสุดการรับจ้างต้องไม่เกินกิโลเมตรละ ๑๐ บาท
          {'\n'}
          {'\t\t\t'}(๓) ระยะทางเกินกว่า ๑๕ กิโลเมตรขึ้นไป ให้เป็นไปตามที่ผู้ขับรถและคนโดยสารตกลงกัน
          ก่อนทําการรับจ้าง หากไม่ตกลงกันก่อนทําการรับจ้าง อัตราค่าจ้างบรรทุกคนโดยสารตั้งแต่กิโลเมตรแรก
          จนสิ้นสุดการรับจ้างต้องไม่เกินกิโลเมตรละ ๑๐ บาท
          </Text>
          <Text style={styles.endText}>
          {'\n\n'}
          ให้ไว้ ณ วันที่ ๑๖ มีนาคม พ.ศ. ๒๕๕๙
          {'\n\n'}
          ออมสิน ชีวะพฤกษ์
          {'\n\n'}
          รัฐมนตรีช่วยว่าการกระทรวงคมนาคม 
          {'\n'}
          ปฏิบัติราชการแทน
          {'\n'}
          รัฐมนตรีว่าการกระทรวงคมนาคม
          </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'BaiJamjuree-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginTop: 20,
  },
  subheaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'BaiJamjuree-Regular',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'BaiJamjuree-Regular',
    paddingHorizontal: 25,
  },
  endText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'BaiJamjuree-Regular',
    textTransform: 'uppercase',
    textAlign: 'right',
    marginBottom: 100,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 10,
    zIndex: 1,
  },
  image: {
    width: 170,
    height: 170,
    marginTop: 100,
  },
  icon:{
    width: 40,
    height: 40,
  },
});

export default RateService;
