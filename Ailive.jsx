import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from 'expo-router';

export default function Ailive() {
  const [currentWeather, setCurrentWeather] = useState({});
  const [futurePredictions, setFuturePredictions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Fetch current weather data and predictions
    const fetchedWeather = {
      temperature: '25°C',
      humidity: '60%',
      windSpeed: '12 km/h',
    };
    const fetchedPredictions = [
      { day: 'Monday', temp: '22°C', rain: '10%' },
      { day: 'Tuesday', temp: '27°C', rain: '20%' },
    ];
    const fetchedSuggestions = [
      { id: 1, title: 'Optimal crop: Wheat', advice: 'The temperature is ideal for wheat this season.', image: require('../../../assets/images/wheat.jpg') },
      { id: 2, title: 'Watering Schedule', advice: 'Water your crops early in the morning to retain moisture.', image: require('../../../assets/images/watering.jpg') },
      { id: 3, title: 'Fertilizer', advice: 'Use nitrogen-based fertilizer in low quantities.', image: require('../../../assets/images/fertilizer.jpg') },
    ];
    setCurrentWeather(fetchedWeather);
    setFuturePredictions(fetchedPredictions);
    setSuggestions(fetchedSuggestions);
  }, []);

  const renderSuggestion = ({ item }) => (
    <View style={styles.suggestionCard}>
      {/* Suggestion Image */}
      <Image source={item.image} style={styles.suggestionImage} />
      {/* Suggestion Title and Advice */}
      <Text style={styles.suggestionTitle}>{item.title}</Text>
      <Text style={styles.suggestionAdvice}>{item.advice}</Text>
    </View>
  );

  return (
    <ImageBackground 
      source={require('../../../assets/images/n.jpg')} // Path to your background image
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        {/* Heading Text */}
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Farm Weather and AI Insights</Text>
        </View>

        {/* Current Weather Section */}
        <View style={styles.weatherSection}>
          <Text style={styles.sectionHeader}>Current Weather</Text>
          <Text style={styles.weatherText}>Temperature: {currentWeather.temperature}</Text>
          <Text style={styles.weatherText}>Humidity: {currentWeather.humidity}</Text>
          <Text style={styles.weatherText}>Wind Speed: {currentWeather.windSpeed}</Text>
        </View>

        {/* Future Predictions Section */}
        <View style={styles.predictionSection}>
          <Text style={styles.sectionHeader}>Weather Predictions</Text>
          {futurePredictions.map((prediction, index) => (
            <View key={index} style={styles.predictionItem}>
              <Text style={styles.predictionText}>{prediction.day} - {prediction.temp} - Rain: {prediction.rain}</Text>
            </View>
          ))}
        </View>

        {/* AI Suggestions Section */}
        <View style={styles.suggestionSection}>
          <Text style={styles.sectionHeader}>AI Suggestions for Your Farm</Text>
          <FlatList
            data={suggestions}
            renderItem={renderSuggestion}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false} // Disable FlatList's scroll to allow outer ScrollView to handle it
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensure the background covers the entire screen
    justifyContent: 'center', // Center content vertically
    padding: 20,
  },
  container: {
    flex: 1,
  },
  headingContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    paddingTop: 30,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  weatherSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  weatherText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
  },
  predictionSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  predictionItem: {
    marginBottom: 10,
  },
  predictionText: {
    fontSize: 16,
    color: '#333',
  },
  suggestionSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  suggestionCard: {
    marginBottom: 20,
    backgroundColor: '#e8f4f8',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  suggestionImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  suggestionAdvice: {
    fontSize: 16,
    color: '#555',
  },
});

