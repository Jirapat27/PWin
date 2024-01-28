import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { PWin_AUTH } from "../../../FirebaseConfig";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = PWin_AUTH;

  const signUp = async() => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('สร้างบัญชีไม่สำเร็จ!', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}> ลงทะเบียน </Text>
      <Text> ชื่อผู้เข้าใช้ </Text>
      <TextInput styles={styles.inputContainer} value={email} placeholder="Email" autoCapitalize="none" onChangeText={(text => setEmail(text))}/>
      <Text>รหัสผ่าน</Text>
      <TextInput styles={styles.inputContainer} secureTextEntry={true} placeholder="password" autoCapitalize="none" onChangeText={(text => setPassword(text))}/>
      {loading ? (<ActivityIndicator size="large" color="0000ff" />) : (
      <Button title="สร้างบัญชี" onPress={signUp} />)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    
  },
  title: {
    marginBottom: 30,
    marginTop: 90,
    fontSize: 30,
    color: "#FF8A48",
    fontWeight: "bold",
  },
  inputContainer: {
    borderColor: "black",
    borderWidth: 10,
    bgColor:'gray',
    padding: 10,
    height:50,
  },
  TextInput:{
    height:20,
  },
});

export default SignUp;
