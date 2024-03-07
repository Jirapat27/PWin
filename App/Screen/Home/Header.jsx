import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function Header() {
    const {user} = useState();
  return (

    <View style={styles.container}>
      <Image source={require('./../../../assets/images/Logo.png')}
      style={{ width:150, height:35, objectFit: 'contain'}}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
      display: 'flex',
      flexDirections: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom:10,

    }
  });