import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PreviousGuest = ({ route, navigation }) => {
  const { guest } = route.params; // Retrieve guest details from route params
  const [username, setUsername] = useState(''); // Store username here
  const [sidebarVisible, setSidebarVisible] = useState(false); // Sidebar state

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { username } = JSON.parse(userData);
          setUsername(username); // Store username in state
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error("Failed to get user data:", error);
        navigation.navigate('Login');
      }
    };
    getUserData();
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarVisible(prevState => !prevState);
  };

  // Handle guest acceptance
  const handleAccept = async () => {
    console.log('Guest entry accepted');

    // Generate OTP
    const otp = Math.random().toString(36).substring(2, 8).toUpperCase(); // Generate a 6-character alphanumeric OTP
    const formattedOtp = `${otp.slice(0, 3)}-${otp.slice(3)}`;

    // Set validity date to one day from now
    const validityDate = new Date();
    validityDate.setDate(validityDate.getDate() + 1);
    const validity = validityDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD

    try {
      const response = await fetch('http://172.69.69.115/4Capstone/app/db_connection/post_confirmed_guest.php', { // Update the URL to your server
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guestName: guest.Guest_name,
          guestEmail: guest.Guest_email,
          hoName: username, // Use the stored username here
          hoHousenum: 'Your House Number', // Replace with actual House Number if needed
          otp: formattedOtp,
          validity: validity,
        }),
      });

      const result = await response.json(); // Handle server response

      if (response.ok) {
        console.log('Guest confirmed:', result);
      } else {
        console.error('Failed to confirm guest:', result);
      }
    } catch (error) {
      console.error('Error confirming guest:', error);
    }
  };

  // Handle guest denial
  const handleDeny = () => {
    console.log('Guest entry denied');
    navigation.navigate('DenyGuest'); // Navigate to DenyGuest screen
  };

  // Handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.card}>
          {/* Guest Profile Image */}
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.profileImage} />

          {/* Guest Details */}
          <View style={styles.infoItem}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{guest.Guest_name}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{guest.Guest_email}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Contact Number:</Text>
            <Text style={styles.value}>{guest.guest_contact}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{guest.guest_add}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Message:</Text>
            <Text style={styles.value}>{guest.message}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
    marginTop: 10, // Moves content to the top
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
});

export default PreviousGuest;
