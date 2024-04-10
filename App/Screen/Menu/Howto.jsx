import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const SlideItem = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Text style={styles.slideText}>{item.text}</Text>
      <Image 
        source={item.image} 
        style={[styles.image, { width: 550, height: 550, aspectRatio: 0.5 }]} 
      />
    </View>
  );
};

const MyCarousel = ({ data }) => {
  return (
    <Carousel
      data={data}
      renderItem={({ item }) => <SlideItem item={item} />}
      sliderWidth={width}
      itemWidth={width}
    />
  );
};

const Howto = ({ navigation }) => {
  const data = [
    { text: 'เมื่อเข้ามาแล้วจะเจอหน้าจอแอป P’WIN ขึ้นแบบนี้ โดยบนหน้าจอจะแสดงแผนที่และจุดให้บริการวินมอเตอร์ไซค์ที่อยู่ในบริเวณโซนที่เราอยู่', image: require('../../../assets/images/แนะนำหน้าจอ.png') },
    { text: 'หากต้องการค้นหาจุดให้บริการวินมอเตอร์ไซค์จุดอื่นสามารถค้นหาได้ที่แถบค้นหาตามที่วงไว้ในกรอบสีแดง', image: require('../../../assets/images/แนะนำค้นหา.png') },
    { text: 'หากต้องการหาเส้นทางไปยังจุดให้บริการวินมอเตอร์ไซค์ที่ใกล้ที่สุด ให้กดที่ปุ่มใกล้ที่สุดข้างล่างแผนที่ตามที่ได้วงเอาไว้', image: require('../../../assets/images/แนะนำจุดใกล้ที่สุด.png') },
    { text: 'หากต้องการเพิ่มจุดให้บริการวินมอเตอร์ไซค์บนแผนที่ ให้ทำการกดปุ่ม + ด้านขวามือ ', image: require('../../../assets/images/แนะนำเพิ่มจุดวิน.png') },
    { text: 'แต่หากท่านยังไม่ได้เข้าสู่ระบบ จะมีข้อความแจ้งเตือนขึ้นมาให้ท่านเข้าสู่ระบบให้เรียบร้อย ', image: require('../../../assets/images/แจ้งเตือนเข้าสู่ระบบ.png') },
    { text: 'เมื่อกดเข้าสู่ระบบจะมีหน้าลงชื่อเข้าใช้งานขึ้นมาให้ท่านกรอกที่อยู่อีเมลกับรหัสผ่าน หากท่านยังไม่มีที่อยู่อีเมลกับรหัสผ่านให้กดลงทะเบียน', image: require('../../../assets/images/ลงชื่อเข้าใช้.png') },
    { text: 'ทำการลงทะเบียนให้เรียบร้อย จากนั้นเข้าสู่ระบบ', image: require('../../../assets/images/ลงทะเบียน.png') },
    { text: 'เมื่อทำการเข้าสู่ระบบเรียบร้อยแล้ว ท่านจะสามารถเพิ่มจุดให้บริการวินมอเตอร์ไซค์บนแผนที่ได้ โดยเริ่มจากเลื่อนหมุดไปยังจุดที่ท่านต้องการให้เป็นจุดให้บริการวินมอเตอร์ไซค์ จากนั้นกดยืนยันสถานที่', image: require('../../../assets/images/ปักหมุด.png') },
    { text: 'เมื่อยืนยันสถานที่ตั้งเรียบร้อยแล้ว ให้มากรอกรายละเอียดของสถานที่ตั้งจุดวินมอเตอร์ไซค์ แล้วกดบันทึกก็เป็นอันเสร็จสิ้น', image: require('../../../assets/images/รายละเอียดสถานที่ตั้ง.png') },
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={36} color="#FF9A62" />
      </TouchableOpacity>
      <MyCarousel data={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  slideText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'BaiJamjuree-Regular',
    paddingHorizontal: 25,
    textAlign: 'left',
    paddingLeft: 20,
  },
});

export default Howto;