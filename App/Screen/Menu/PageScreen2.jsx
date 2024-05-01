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

const PageScreen2 = ({ navigation }) => {
  const data = [
    { text: 'หากต้องการคำนวณราคาบริการวินมอเตอร์ไซค์บนแผนที่ ให้ทำการกดปุ่มรูปเหรียญ ด้านขวามือที่เราได้วงเอาไว้ ', image: require('../../../assets/images/แนะนำคำนวณราคา.png') },
    { text: 'เมื่อกดเข้ามาแล้วจะแสดงหน้าดังภาพด้านล่าง โดยสามารถค้นหาจุดให้บริการวินมอเตอร์ไซต์ที่เราต้องการจะคำนวณราคาได้ที่ช่องค้นหาที่เราได้ทำกรอบสีแดงไว้ในรูป', image: require('../../../assets/images/ค้นหา.png') },
    { text: 'เมื่อกรอกข้อความลงไปก็จะมีสถานที่ขึ้นมาให้เราเลือก', image: require('../../../assets/images/แสดงรายชื่อ.png') },
    { text: 'แอปพลิเคชั่นก็จะพาเราไปเขตนั้นและแสดงจุดวินบริเวณนั้นให้เราเลือก ให้เรากดยืนยันว่าเลือกเขตนี้', image: require('../../../assets/images/แสดงจุดวิน.png') },
    { text: 'เมื่อเลือกเขตเรียบร้อยก็มาเลือกจุดให้บริการวินมอเตอร์ไซต์ที่ต้องการ แล้วกดปุ่มเลือกจุดวินมอเตอร์ไซต์เพื่อยืนยัน', image: require('../../../assets/images/เลือกวิน.png') },
    { text: 'แอปพลิเคชั่นก็จะคำนวณราคาจากสถานที่ตั้งของเราไปยังจุดให้บริการวินมอเตอร์ไซต์ที่เลือกโดยอัตโนมัติ จากนั้นกดตกลงเพื่อจบการทำงาน', image: require('../../../assets/images/แสดงราคา.png') },
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

export default PageScreen2;