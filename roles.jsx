import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { Colors } from './../../constants/Colors';

export default function Roles() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // Automatic navigation after 2 seconds
    const timer = setTimeout(() => {
      router.push('c/customar'); // Navigate to the customer location route
    }, 2000);

    // Cleanup timer if the component unmounts
    return () => clearTimeout(timer);
  }, [navigation, router]);

  return (
    <ImageBackground 
      source={require('../../assets/images/n.jpg')} // Replace with your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.titleText}>
            <Text style={{ color: Colors.PRIMARY }}>Farmers are the  </Text>
            <Text style={{ color: Colors.dimgray }}>backbone  </Text>
            <Text style={{ color: Colors.PRIMARY }}>of our society.</Text>
          </Text>
          <View style={styles.line} />
        </View>

        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={[styles.section, { borderColor: Colors.blue }]}
            onPress={() => router.push('c/customar')} // Navigate to the customer location route
          >
            <Image source={require('./../../assets/images/kk.jpg')} style={styles.image} />
            <Text style={styles.sectionText2}>Farmer</Text>
          </TouchableOpacity>
        </View>

        {/* Lower Middle Section with Text */}
        <View style={styles.middleSection}>
          <Text style={styles.happyText}>
            <Text style={[styles.happyText, { color: Colors.PRIMARY }]}>~~"Being a farmer and rancher takes faith</Text>
            <Text style={[styles.happyText, { color: Colors.dimgray }]}> hope and love. It's gratitude for the little moments </Text>
            <Text style={[styles.happyText, { color: Colors.PRIMARY }]}>and prayers for a brighter tomorrow."~~</Text>
          </Text>
           
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire container
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: 'transparent', // Ensures the background image shows through
  },
  titleText: {
    padding: 40,
    fontSize: 16,
    fontFamily: 'outfit-SemiCondensed-Bold',
  },
  line: {
    height: 2,
    backgroundColor: Colors.WHITE,
    marginTop: -5,
  },
  sectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingTop: 50,
  },
  section: {
    padding: 30, // Increased padding for the larger image frame
    backgroundColor: Colors.WHITE,
    borderRadius: 15, // Adjust border radius for a more rounded look
    width: '45%', // Increased width to accommodate larger image
    alignItems: 'center',
    borderWidth: 3, // Increased border width for a more pronounced frame
  },
  image: {
    width: 150, // Increased width
    height: 200, // Increased height
    marginBottom: 20,
    marginTop: 20,
  },
  sectionText2: {
    fontSize: 20,
    color: Colors.PRIMARY,
  },
  middleSection: {
    marginTop: 40,
    alignItems: 'center',
    paddingTop: 100,
  },
  happyText: {
    fontSize: 20,
    fontFamily: 'outfit-SemiCondensed-Bold',
  },
  instructionText: {
    padding: 30,
    color: Colors.GRAY,
  },
});

