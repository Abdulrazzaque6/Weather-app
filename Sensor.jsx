import React, { useState, useEffect } from 'react';
import { View, Text, Image, Switch, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Sensor = () => {
  const navigation = useNavigation();
  const [soilMoisture, setSoilMoisture] = useState(false);
  const [waterPump, setWaterPump] = useState(false);
  const [fertilizerMotor, setFertilizerMotor] = useState(false);
  const [nightVision, setNightVision] = useState(false);

  // State for sensor levels
  const [moistureLevel, setMoistureLevel] = useState('60%');
  const [pumpLevel, setPumpLevel] = useState('Off');
  const [fertilizerLevel, setFertilizerLevel] = useState('Off');
  const [nightVisionLevel, setNightVisionLevel] = useState('Off');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const toggleSwitch = (sensor) => {
    switch(sensor) {
      case 'soilMoisture':
        setSoilMoisture(!soilMoisture);
        setMoistureLevel(soilMoisture ? '10%' : '12%'); // Toggle between levels
        break;
      case 'waterPump':
        setWaterPump(!waterPump);
        setPumpLevel(waterPump ? 'Off' : 'On'); // Toggle between On and Off
        break;
      case 'fertilizerMotor':
        setFertilizerMotor(!fertilizerMotor);
        setFertilizerLevel(fertilizerMotor ? 'Off' : 'On'); // Toggle between On and Off
        break;
      case 'nightVision':
        setNightVision(!nightVision);
        setNightVisionLevel(nightVision ? 'Off' : 'On'); // Toggle between On and Off
        break;
      default:
        break;
    }
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/n.jpg')} // Background image
      style={styles.backgroundImage}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.heading}>Sensor Control Panel</Text>
        <SensorControl
          imageSource={require('./../../../assets/images/soil-moisture.jpg')} 
          sensorState={soilMoisture} 
          onPress={() => toggleSwitch('soilMoisture')}
          label="Soil Moisture Sensor"
          description="Monitors the moisture level in the soil to help with irrigation management."
          level={moistureLevel}
        />
        <SensorControl
          imageSource={require('./../../../assets/images/water-pump.jpg')}
          sensorState={waterPump}
          onPress={() => toggleSwitch('waterPump')}
          label="Water Pump"
          description="Controls the water pump for irrigation based on the soil moisture levels."
          level={pumpLevel}
        />
        <SensorControl
          imageSource={require('./../../../assets/images/fertilizer-motor.jpg')}
          sensorState={fertilizerMotor}
          onPress={() => toggleSwitch('fertilizerMotor')}
          label="Fertilizer Motor"
          description="Dispenses fertilizer based on the requirements of the plants."
          level={fertilizerLevel}
        />
        <SensorControl
          imageSource={require('./../../../assets/images/night-vision.jpg')}
          sensorState={nightVision}
          onPress={() => toggleSwitch('nightVision')}
          label="Night Vision Sensor"
          description="Monitors the environment during night time to detect any disturbances."
          level={nightVisionLevel}
        />
      </ScrollView>
    </ImageBackground>
  );
};

const SensorControl = ({ imageSource, sensorState, onPress, label, description, level }) => (
  <View style={styles.sensorContainer}>
    <Image source={imageSource} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.level}>Level: {level}</Text>
      <Switch 
        value={sensorState}
        onValueChange={onPress}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={sensorState ? '#f5dd4b' : '#f4f3f4'}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire container
  },
  scrollContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333', // Darker color for better readability
  },
  sensorContainer: {
    alignItems: 'center',
    marginBottom: 20, // Space between sensors
    width: '100%', // Full width of the container
    maxWidth: 400, // Optional: set a max width for large screens
    paddingHorizontal: 10, // Add horizontal padding
    borderColor: '#ddd', // Border color
    borderWidth: 1, // Border width
    borderRadius: 10, // Rounded corners
    padding: 10, // Padding inside the border
    backgroundColor: '#fff', // Background color inside the border
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 4, // Shadow radius
    elevation: 5, // Android shadow
  },
  image: {
    width: 250,
    height: 200,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  level: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
});

export default Sensor;


