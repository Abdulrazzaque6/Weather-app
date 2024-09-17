import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';
import { Colors } from './../../../constants/Colors';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon set
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null); // State for the selected image

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleImageSelect = async () => {
    // Request permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need permission to access your camera roll.');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.uri); // Update the image URI state
    }
  };

  const handleSubmit = () => {
    // Logic for handling form submission
    alert('Profile submitted!');
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/n.jpg')} // Path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>Create your profile</Text>
        <View style={styles.line} />

        {/* Image Selection */}
        <TouchableOpacity style={styles.imageContainer} onPress={handleImageSelect}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Icon name="add-a-photo" size={50} color={Colors.PRIMARY} />
              <Text style={styles.imageText}>Select your image</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Additional TextInput fields */}
        <TextInput
          style={styles.input}
          placeholder="Enter your verified name"
          placeholderTextColor={Colors.lightGrey}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor={Colors.lightGrey}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your profession summary"
          placeholderTextColor={Colors.lightGrey}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your town"
          placeholderTextColor={Colors.lightGrey}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the background covers the entire screen
    justifyContent: 'center', // Center content vertically
    padding: 50,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.PRIMARY,
    marginBottom: 20,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150, // Increased size
    height: 150, // Increased size
    borderRadius: 75, // Adjusted for circular shape
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 150, // Increased size
    height: 150, // Increased size
    borderRadius: 75, // Adjusted for circular shape
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
  },
  imageText: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.PRIMARY,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  submitButton: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.PRIMARY, // Solid color for button
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


