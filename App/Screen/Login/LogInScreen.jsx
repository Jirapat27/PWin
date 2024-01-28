import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LogIn from "./LogIn";
//import 'Logo' from '../PWin-App/assets/images/Logo.jpg';
export default function LogInScreen() {
  return (
/*     <View
      style={{
        display: "flex",
        marginTop: 60,
        //JustifyContent: 'center',
        alignItems: "center",
      }}
    >
      <Image
        source={require("./../../../assets/images/Logo.png")}
        style={styles.LogoImage}
      />

    </View> */
    <View style={styles.container}>
      <LogIn/>
    </View>

  );
}

const styles = StyleSheet.create({
  container:{
    display:'flex',
    flex:1,
  },
  LogoImage: {
    width: 200,
    height: 40,
    objectFit: "contain",
  },
});
