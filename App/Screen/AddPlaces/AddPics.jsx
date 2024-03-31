import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firestore } from '../../../firebaseConfig'; 
import React, { useState } from 'react'; 
import * as FileSystem from 'expo-file-system';

export default function AddPics() {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadPic = async () => {
        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError(`Couldn't Connect to Network`));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });
            const filename = image.substring(image.lastIndexOf('/') + 1)
            const ref = firestore.storage().ref().child(filename);

            await ref.put(blob);
            setUploading(false);
            Alert.alert('Photo Uploaded!')
            setImage(null);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.pickbutton} onPress={pickImage}>
                <Text style={styles.text}>Pick Image</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {image && <Image 
                    source={{ uri: image }}
                    style={{width: 300, height: 300}}
                />}
                <TouchableOpacity style={styles.uploadbutton} onPress={uploadPic}>
                    <Text style={styles.text}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FF9A62',
    alignItems: 'center',
    justifyContent: 'center',
    },
    pickbutton: {
        borderRadius: 5,
        width: 75,
        height: 75,
        backgroundColor: '#06C326',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    uploadbutton: {
        borderRadius: 5,
        width: 75,
        height: 75,
        backgroundColor: '#09C6EC',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    text: {
        color: '#FF9A62',
        fontSize: 22,
        textAlign: 'center',
    },
    imageContainer: {
        marginTop: 20,
        alignItems: 'center',
    }
});