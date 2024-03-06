import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AddDetail() {
  const [placeName, setPlaceName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleAddDetail = () => {
    // Implement what to do when the "Add Detail" button is pressed
  };

  const handleAddImage = () => {
    // Implement what to do when selecting an image
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>ชื่อสถานที่*</Text>
      <TextInput
        style={styles.input}
        placeholder="ชื่อสถานที่.."
        value={placeName}
        onChangeText={(text) => setPlaceName(text)}
      />

      <Text style={styles.label}>คำอธิบาย</Text>
      <TextInput
        style={{...styles.input, textAlignVertical: "top"}}
        placeholder="ใส่คำอธิบาย.."
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <Text style={styles.label}>เพิ่มรูปภาพ</Text>
      <TouchableOpacity style={styles.imageContainer} onPress={handleAddImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Image source={require('./../../../assets/images/AddImage.png')} style={styles.imagePlaceholder}></Image>
        )}
      </TouchableOpacity>


      <Text style={styles.label}>รีวิว</Text>
      <View style={styles.starsContainer}>
        <Stars
          half={true}
          default={2.5}
          update={(val) => { setRating(val); }}
          spacing={4}
          starSize={40}
          count={5}
          fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
          emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
          halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
          />
      </View>

      <Text style={styles.label}>ความคิดเห็น</Text>
      <TextInput
        style={{...styles.input, textAlignVertical: "top"}}
        placeholder="ใส่คำอธิบาย.."
        multiline
        numberOfLines={4}
        value={review}
        onChangeText={(text) => setReview(text)}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: "67%",
  },
  label: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#FF9A62",
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "#FF9A62",
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  imagePlaceholder: {
    width: 80,
    height: 80,
    opacity: 0.5,
  },
  myStarStyle: {
    color: 'orange',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 2,
  },
  myEmptyStarStyle: {
    color: 'white',
  }
});
