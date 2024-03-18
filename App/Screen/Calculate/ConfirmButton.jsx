import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";


const ConfirmButton = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("HomeScreen");
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>ตกลง</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        backgroundColor: "#FF9A62",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        width: 320,
        height: 55,
        
    },
    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "600",
    },
});

export default ConfirmButton;