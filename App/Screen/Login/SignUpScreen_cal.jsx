import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SignUp_cal from "./SignUp_cal";
export default function SignUpScreen_cal() {
  return (
    <View style={styles.container}>
      <SignUp_cal/>
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
