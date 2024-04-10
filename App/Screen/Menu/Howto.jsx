import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const SlideItem = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Image source={item.image} style={[styles.image, { height: 400, width: 400 }]} resizeMode="contain" />
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
    { image: require('../../../assets/images/แนะนำหน้าจอ.png') },
    { image: require('../../../assets/images/แนะนำค้นหา.png') },
    { image: require('../../../assets/images/แนะนำจุดใกล้ที่สุด.png') },
    { image: require('../../../assets/images/แนะนำเพิ่มจุดวิน.png') },
    { image: require('../../../assets/images/แจ้งเตือนเข้าสู่ระบบ.png') },
    { image: require('../../../assets/images/ลงชื่อเข้าใช้.png') },
    { image: require('../../../assets/images/ลงทะเบียน.png') },
    { image: require('../../../assets/images/ปักหมุด.png') },
    { image: require('../../../assets/images/รายละเอียดสถานที่ตั้ง.png') },
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
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default Howto;
