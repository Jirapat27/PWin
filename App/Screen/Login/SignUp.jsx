import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator, Alert, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signUp = async () => {
    try {
      setError(null); // Clear any previous error

      // Check if any field is empty
      if (!username || !email || !password || !confirmPassword) {
        Alert.alert("Warning", "Please fill in all fields.");
        return;
      }

      // Password match check
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      // Password length check
      if (password.length < 8 || password.length > 12) {
        setError("Password must be 8-12 characters long");
        return;
      }

      setLoading(true);

      // Create user in Firebase authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Account created successfully!");

      navigation.navigate('AddPlaceScreen');
    } catch (error) {
      console.log("Failed to create account:", error.message);
      setError(`Failed to create account: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.header}>ลงทะเบียน</Text>
      <Text>ชื่อผู้ใช้</Text>
      <TextInput
        style={styles.inputContainer}
        value={username}
        placeholder="Username"
        autoCapitalize="none"
        onChangeText={(username) => setUsername(username)}
      />
      <Text>ที่อยู่อีเมล</Text>
      <TextInput
        style={styles.inputContainer}
        value={email}
        placeholder="Email"
        autoCapitalize="none"
        onChangeText={(email) => setEmail(email)}
      />
      <Text>รหัสผ่าน</Text>
      <TextInput
        style={styles.inputContainer}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize="none"
        onChangeText={(password) => setPassword(password)}
      />
      <Text>ยืนยันรหัสผ่าน</Text>
      <TextInput
        style={styles.inputContainer}
        value={confirmPassword}
        secureTextEntry={true}
        placeholder="Confirm Password"
        autoCapitalize="none"
        onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
      />
      <Text style={styles.subtext}>รหัสผ่านต้องมีความยาว 8-12 ตัวอักษร</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={signUp}
        >
          <Text style={{ color: 'white' }}>สร้างบัญชี</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    color: "#FF8A48",
    marginBottom: 30,
  },
  inputContainer: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  }, 
  signUpButton: {
    backgroundColor: "#FF8A48",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  subtext: {
    color: 'gray',
    fontStyle: 'italic',
    marginBottom: 20,
    paddingBottom: 10,
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignUp;
