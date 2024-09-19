import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Guest = ({ route, navigation }) => {
  const { guest } = route.params; // Retrieve guest details from route params
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [username, setUsername] = useState(''); // Store username here

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

    // Generate 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit number

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
          guestContact: guest.guestContact,
          hoName: username, // Use the stored username here
          hoHousenum: guest.hoHousenum, // Replace with actual House Number if needed
          otp: otp,
          validity: validity,
        }),
      });

      if (response.ok) {
        console.log('Guest entry confirmed and email sent');
        navigation.navigate('GuestAccepted', { guest, otp, validity }); // Pass additional data if needed
      } else {
        console.error('Failed to confirm guest entry');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle guest denial
  const handleDeny = () => {
    console.log('Guest entry denied');
    navigation.navigate('DenyGuest'); // Navigate to DenyGuest screen
  };

  // Navigate to profile screen
  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  // Handle back button press
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Verify Inquiry</Text>
        <TouchableOpacity onPress={navigateToProfile}>
          <Image source={require('../assets/man.png')} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {isSidebarVisible && <Sidebar onClose={toggleSidebar} navigation={navigation} />}

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.heading}>Verify Guest Entry</Text>
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
            <Text style={styles.label}>RelaTion:</Text>
            <Text style={styles.value}>{guest.relation}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.label}>Message:</Text>
            <Text style={styles.value}>{guest.message}</Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={handleAccept}>
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.denyButton]} onPress={handleDeny}>
              <Text style={styles.buttonText}>Deny</Text>
            </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#007bff',
    marginTop: 30,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
    marginBottom: 20,
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    minWidth: 100,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  denyButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Guest;
