import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const SlideItem = ({ item }) => {
  return (
    <View style={styles.slide}>
      <Image source={{ uri: item.url }} style={[styles.image, { width: width - 40, height: (width - 40) * 0.67 }]} />
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
    { url: 'https://png.pngtree.com/thumb_back/fh260/background/20210911/pngtree-xiaguang-daytime-rape-flower-mountain-no-photography-picture-with-picture-image_851488.jpg' },
    { url: 'https://media.istockphoto.com/id/1434150819/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%94%E0%B8%AD%E0%B8%A2%E0%B8%AD%E0%B8%B4%E0%B8%99%E0%B8%97%E0%B8%99%E0%B8%99%E0%B8%97%E0%B9%8C-%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%80%E0%B8%8A%E0%B8%B5%E0%B8%A2%E0%B8%87%E0%B9%83%E0%B8%AB%E0%B8%A1%E0%B9%88-%E0%B8%9B%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%A8%E0%B9%84%E0%B8%97%E0%B8%A2.jpg?s=612x612&w=0&k=20&c=apydflyhZVs-g88s3Isql-Plx94MwFkDYnAoNPt964c=' },
    { url: 'https://png.pngtree.com/thumb_back/fh260/background/20210903/pngtree-simianshan-waterfall-morning-waterfall-outdoor-photography-photograph-with-picture-image_797502.jpg' },
    // Add more images as needed
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
    zIndex: 1, // ตั้งค่า zIndex เพื่อให้ปุ่มย้อนกลับอยู่ด้านบนของการ์เน็ต
  },
});

export default Howto;
