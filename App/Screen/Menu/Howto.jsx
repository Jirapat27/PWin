import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-left" size={36} color="#FF9A62" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('PageScreen')}>
        <Icon name="map-marker" size={80} color="black" />
        <Text style={styles.text}>วิธีการเพิ่มจุดวินมอเตอร์ไซต์</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('PageScreen2')}>
        <Icon name="calculator" size={80} color="black" />
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
    marginTop: 50,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'BaiJamjuree-Bold',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
});

export default HomeScreen;
