import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native';

import backButton from '../images/backButton.png';

const { width } = Dimensions.get('window');

const PageScreen = ({ navigation, size }) => {
  const data = [
    { text: 'หากต้องการเพิ่มจุดให้บริการวินมอเตอร์ไซค์บนแผนที่ ให้ทำการกดปุ่ม + ด้านขวามือ ', image: require('../images/แนะนำเพิ่มจุดวิน.png') },
    { text: 'แต่หากท่านยังไม่ได้เข้าสู่ระบบ จะมีข้อความแจ้งเตือนขึ้นมาให้ท่านเข้าสู่ระบบให้เรียบร้อย ', image: require('../images/แจ้งเตือนเข้าสู่ระบบ.png') },
    { text: 'เมื่อกดเข้าสู่ระบบจะมีหน้าลงชื่อเข้าใช้งานขึ้นมาให้ท่านกรอกที่อยู่อีเมลกับรหัสผ่าน หากท่านยังไม่มีที่อยู่อีเมลกับรหัสผ่านให้กดลงทะเบียน', image: require('../images/ลงชื่อเข้าใช้.png') },
    { text: 'ทำการลงทะเบียนให้เรียบร้อย จากนั้นเข้าสู่ระบบ', image: require('../images/ลงทะเบียน.png') },
    { text: 'เมื่อทำการเข้าสู่ระบบเรียบร้อยแล้ว ท่านจะสามารถเพิ่มจุดให้บริการวินมอเตอร์ไซค์บนแผนที่ได้ โดยเริ่มจากเลื่อนหมุดไปยังจุดที่ท่านต้องการให้เป็นจุดให้บริการวินมอเตอร์ไซค์ จากนั้นกดยืนยันสถานที่', image: require('../images/ปักหมุด.png') },
    { text: 'เมื่อยืนยันสถานที่ตั้งเรียบร้อยแล้ว ให้มากรอกรายละเอียดของสถานที่ตั้งจุดวินมอเตอร์ไซค์ แล้วกดบันทึกก็เป็นอันเสร็จสิ้น', image: require('../images/รายละเอียดสถานที่ตั้ง.png') },
  ];

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={backButton} style={[styles.icon]} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {data.map((item, index) => (
          <View style={styles.slide} key={index}>
            <Text style={styles.slideText}>{item.text}</Text>
            <Image
              source={item.image}
              style={styles.image}
            />
          </View>
        ))}
      </ScrollView>
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
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 20,
    borderRadius: 10,
    width: 300,
    height: 600,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
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
  icon: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
});

export default PageScreen;
