import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';
import { Audio } from 'expo-av';
import { Colors } from './../../../constants/Colors';

export default function PostScreen() {
  const [image, setImage] = useState(null); // Initially null
  const [description, setDescription] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);
  const [sound, setSound] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Play audio on page load
    const playSound = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../../assets/sounds/synthesize.mp3') // Path to your audio file
        );
        setSound(sound);
        await sound.playAsync();
      } catch (error) {
        console.error('Error loading or playing sound:', error);
      }
    };

    playSound();

    return () => {
      if (sound) {
        sound.unloadAsync(); // Unload the sound from memory when the component unmounts
      }
    };
  }, [navigation]);

  const handleUpload = () => {
    if (image && description) {
      setIsUploaded(true);
    }
  };

  const handleEdit = () => {
    setIsUploaded(false);
  };

  const handleDelete = () => {
    setImage(null);
    setDescription('');
    setIsUploaded(false);
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/n.jpg')} // Path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.mainHeading}>Farming Work Post</Text>
        <Text style={styles.headerText}>Share details about your farm work</Text>

        <TouchableOpacity onPress={!isUploaded ? () => {} : null} style={styles.imagePicker}>
          <View style={styles.frame}>
            <Image
              source={
                image
                  ? { uri: image } // Ensure that image is a valid URI string
                  : require('./../../../assets/images/farm.jpeg') // Default image
              }
              style={styles.image}
            />
          </View>
          {!isUploaded && !image && <Text style={styles.imagePlaceholder}>Tap to change image</Text>}
        </TouchableOpacity>

        {!isUploaded && (
          <TextInput
            style={styles.descriptionInput}
            placeholder="Enter a description..."
            value={description}
            onChangeText={setDescription}
            multiline
          />
        )}

        {!isUploaded ? (
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.uploadButtonText}>Upload</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
              <Text style={styles.actionButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
              <Text style={styles.actionButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center', // Center content vertically
  },
  mainHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    color:Colors.GRAY,
    marginBottom: 20,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  frame: {
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  imagePlaceholder: {
    color: '#aaa',
    marginTop: 10,
  },
  descriptionInput: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 29,
    padding: 10,
    marginBottom: 20,
    color: Colors.PRIMARY,
    backgroundColor: Colors.WHITE,
  },
  uploadButton: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});


