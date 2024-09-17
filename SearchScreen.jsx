import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, Image, Animated, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';
import { Colors } from './../../../constants/Colors';

// Replace with your image sources
const PARAMETER_IMAGES = {
  date: require('../../../assets/images/date.jpg'),
  time: require('../../../assets/images/time.jpg'),
  temp: require('../../../assets/images/temp.jpg'),
  humidity: require('../../../assets/images/hum.jpg'),
  pressure: require('../../../assets/images/wind.jpg'),
  direction: require('../../../assets/images/wind_direction.jpg'),
  windspeed: require('../../../assets/images/F.jpeg'),
  rain: require('../../../assets/images/rain.jpg'),
  // Add more images as needed
};

export default function WeatherScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0]; // Animation value
  const scaleAnim = useState(new Animated.Value(1))[0]; // Scale animation for images
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [bgScaleAnim] = useState(new Animated.Value(0.8)); // Animation for background image scaling

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Start background image scaling animation
    Animated.timing(bgScaleAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [navigation, bgScaleAnim]);

  const fetchData = () => {
    setLoading(true);
    // Fetch data from the API
    fetch('https://sheetdb.io/api/v1/zne18p14c26y2')
      .then((response) => response.json())
      .then((fetchedData) => {
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData(fetchedData[fetchedData.length - 1]);
          // Start fade-in and scale animation
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 1000,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1.1,
              duration: 1000,
              useNativeDriver: true,
            })
          ]).start();
        } else {
          Alert.alert('Unexpected data format', 'The API did not return the expected array of data.');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        Alert.alert('Error', 'Failed to fetch data, please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (data) {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % Object.keys(data).length);
      }
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [data]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../../../assets/images/n.jpg')} style={styles.backgroundImage}>
      <Animated.View style={[styles.backgroundImage, { transform: [{ scale: bgScaleAnim }] }]}>
        <View style={styles.container}>
          {data ? (
            <>
              {/* Heading Text */}
              <Animated.View style={{ opacity: fadeAnim }}>
                <Text style={styles.headingText}>Live Data</Text>
              </Animated.View>
              
              <Animated.View style={[styles.gridContainer, { opacity: fadeAnim }]}>
                {Object.entries(data).map(([key, value], index) => (
                  <Animated.View 
                    key={key} 
                    style={[
                      styles.parameterContainer, 
                      index % 2 === 0 ? styles.evenRow : styles.oddRow,
                      { transform: [{ scale: scaleAnim }] }
                    ]}
                  >
                    <Image 
                      source={PARAMETER_IMAGES[key] || require('../../../assets/images/speed.jpg')} 
                      style={[styles.image, index === currentImageIndex ? styles.imagePop : null]}
                    />
                    <Text style={styles.text}>
                      {key}: {value}
                    </Text>
                  </Animated.View>
                ))}
              </Animated.View>
              
              {/* Update Button */}
              <TouchableOpacity style={styles.updateButton} onPress={fetchData}>
                <Text style={styles.updateButtonText}>Refresh</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Text style={styles.text}>No data available</Text>
          )}
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 20,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gridContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  parameterContainer: {
    width: '45%',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.PRIMARY, // Add border color
  },
  evenRow: {
    borderColor: Colors.PRIMARY,
  },
  oddRow: {
    borderColor: Colors.PRIMARY,
  },
  image: {
    width: 70, // Increased size
    height: 70, // Increased size
    borderRadius: 35, // Circular image
    borderWidth: 2, // Circular border
    borderColor: Colors.PRIMARY, // Circular border color
    marginBottom: 10,
  },
  imagePop: {
    transform: [{ scale: 1.2 }], // Pop-up effect
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'sans-serif-condensed', // Change to a font that you have included
  },
  headingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: 'center',
    paddingVertical: 10,
    fontFamily: 'sans-serif', // Change to a font that you have included
    textShadowColor: '#aaa',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    paddingTop: 30,
    borderBottomWidth: 2, // Border line under heading
    borderBottomColor: Colors.PRIMARY, // Border color
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

