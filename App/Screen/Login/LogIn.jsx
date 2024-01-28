import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import { PWin_AUTH } from "../../../FirebaseConfig";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = PWin_AUTH;

  const logIn = async() => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
    } catch (error) {
      console.log(error);
      alert('เข้าสู่ระบบไม่สำเร็จ!' , error.message);
    } finally {
      setLoading(false);
    }
  }

  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("SignUpScreen");
  }

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}> ลงชื่อเข้าใช้ </Text>
      <Text> ชื่อผู้เข้าใช้ </Text>
      <TextInput styles={styles.inputContainer} value={email} placeholder="Email" autoCapitalize="none" onChangeText={(text => setEmail(text))}/>
      <Text>รหัสผ่าน</Text>
      <TextInput styles={styles.inputContainer} secureTextEntry={true} placeholder="password" autoCapitalize="none" onChangeText={(text => setPassword(text))}/>
      <Text>ลืมรหัสผ่าน?</Text>
      {loading ? (<ActivityIndicator size="large" color="0000ff" />) : (
      <Button title="เข้าสู่ระบบ" onPress={logIn} />)}
      <Text>ยังไม่มีบัญชี PWIN ? <Text styles={styles.signUpLink} onPress={(handlePress)}>สร้างบัญชี</Text></Text>
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
  signUpLink:{
    color: "#0048FF",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LogIn;
