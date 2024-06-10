import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, Animated } from 'react-native';

import backButton from '../images/backButton.png';

const { width } = Dimensions.get('window');

const SlideItem = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Text style={styles.slideText}>{item.text}</Text>
      <Image 
        source={item.image} 
        style={styles.image}
      />
    </View>
  );
};

const PageScreen2 = ({ navigation, size }) => {
  const data = [
    { text: 'หากต้องการคำนวณราคาบริการวินมอเตอร์ไซค์บนแผนที่ ให้ทำการกดปุ่มรูปเหรียญ ด้านขวามือที่เราได้วงเอาไว้ ', image: require('../images/แนะนำคำนวณราคา.png') },
    { text: 'เมื่อกดเข้ามาแล้วจะแสดงหน้าดังภาพด้านล่าง โดยสามารถค้นหาจุดให้บริการวินมอเตอร์ไซต์ที่เราต้องการจะคำนวณราคาได้ที่ช่องค้นหาที่เราได้ทำกรอบสีแดงไว้ในรูป', image: require('../images/ค้นหา.png') },
    { text: 'เมื่อกรอกข้อความลงไปก็จะมีสถานที่ขึ้นมาให้เราเลือก', image: require('../images/แสดงรายชื่อ.png') },
    { text: 'แอปพลิเคชั่นก็จะพาเราไปเขตนั้นและแสดงจุดวินบริเวณนั้นให้เราเลือก ให้เรากดยืนยันว่าเลือกเขตนี้', image: require('../images/แสดงจุดวิน.png') },
    { text: 'เมื่อเลือกเขตเรียบร้อยก็มาเลือกจุดให้บริการวินมอเตอร์ไซต์ที่ต้องการ แล้วกดปุ่มเลือกจุดวินมอเตอร์ไซต์เพื่อยืนยัน', image: require('../images/เลือกวิน.png') },
    { text: 'แอปพลิเคชั่นก็จะคำนวณราคาจากสถานที่ตั้งของเราไปยังจุดให้บริการวินมอเตอร์ไซต์ที่เลือกโดยอัตโนมัติ จากนั้นกดตกลงเพื่อจบการทำงาน', image: require('../images/แสดงราคา.png') },
  ];

  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={backButton} style={[styles.icon]} />
      </TouchableOpacity>
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

export default PageScreen2;
