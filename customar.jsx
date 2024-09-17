import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SearchScreen from './SearchScreen';
import PostScreen from './PostScreen';
import ProfileScreen from './ProfileScreen';
import Ailive from './Ailive';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import the Icon component
import { Colors } from './../../../constants/Colors';
import sensor from './Sensor';

const Tab = createBottomTabNavigator();

export default function CustomarTabs() {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    backgroundColor: '#fff', // Default tab bar background color
                    borderTopWidth: 0, // Remove the top border
                    elevation: 0, // Remove shadow on Android
                },
                tabBarActiveBackgroundColor: Colors.PRIMARY, // Background color for the active tab
                tabBarActiveTintColor: '#fff', // Color for active tab icons
                tabBarInactiveTintColor: Colors.PRIMARY, // Color for inactive tab icons
                tabBarLabelStyle: {
                    fontSize: 12, // Customize label font size
                    fontFamily: 'outfit-SemiCondensed-Bold', // Customize label font family
                },
                tabBarIconStyle: {
                    marginBottom: 0, // Adjust icon margin if needed
                },
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Weather':
                            iconName = 'cloud';
                            break;
                        case 'Post':
                            iconName = 'post-add';
                            break;
                        case 'Profile':
                            iconName = 'person';
                            break;
                        case 'Ai-live':
                            iconName = 'public'; // Earth icon
                            break;

                            case 'Sensor':
                                iconName = 'sensors'; // Earth icon
                                break;   

                        default:
                            iconName = 'cloud';
                    }

                    return <Icon name={iconName} color={color} size={size} />;
                },
            })}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    // Additional options for Profile tab
                }}
            />
            <Tab.Screen
                name="Post"
                component={PostScreen}
                options={{
                    // Additional options for Post tab
                }}
            />
            <Tab.Screen
                name="Weather"
                component={SearchScreen}
                options={{
                    // Additional options for Search tab
                }}
            />
            <Tab.Screen
                name="Ai-live"
                component={Ailive}
                options={{
                    // Additional options for Ailive tab
                }}
            />
            <Tab.Screen
                name="Sensor"
                component={sensor}
                options={{
                    // Additional options for Ailive tab
                }}
            />
        </Tab.Navigator>
    );
}



