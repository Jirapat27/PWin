import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SignUp_comment from "./SignUp_comment";
export default function SignUpScreen_comment() {
  return (
    <View style={styles.container}>
      <SignUp_comment/>
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
