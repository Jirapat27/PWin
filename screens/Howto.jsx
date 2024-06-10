import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import backButton from '../images/backButton.png';
import mapIcon from '../images/map-icon.png';
import calIcon from '../images/calculator-icon.png';

const Howto = ({ navigation, size }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={backButton} style={[styles.icon]} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('PageScreen')}>
        <Image source={mapIcon} style={[styles.bigIcon]} />
        <Text style={styles.text}>วิธีการเพิ่มจุดวินมอเตอร์ไซต์</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('PageScreen2')}>
        <Image source={calIcon} style={[styles.bigIcon]} />
        <Text style={styles.text}>วิธีการคำนวณราคา</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: 330,
    height: 330,
    backgroundColor: '#FF9A62',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 10,
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'BaiJamjuree-Bold',
    color: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  icon:{
    width: 40,
    height: 40,
  },
  bigIcon:{
    width: 200,
    height: 200,
  },
});

export default Howto;
