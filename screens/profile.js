import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { username } = JSON.parse(userData);
          const response = await axios.get(`http://172.69.69.115/4Capstone/app/db_connection/getuser.php?username=${username}`);
          if (response.data.error) {
            console.error("User not found");
            navigation.navigate('Login');
          } else {
            setUser(response.data);
          }
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error("Failed to get user data:", error);
        navigation.navigate('Login');
      }
    };
    getUserData();
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      navigation.navigate('Login');
    } catch (error) {
      console.error("Failed to remove user data:", error);
    }
  };

  const handleEditInformation = () => {
    navigation.navigate('EditProfile'); // Assuming you have an edit profile screen
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const imageUrl = `http://172.69.69.115/4Capstone/stuff/${user.image}`;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        <Text style={styles.name}>{user.fname} {user.lname}</Text>
      </View>

      <View style={styles.additionalInfo}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{user.email}</Text>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>{user.hnum + ", Roxaco Landing Subdivision, Nasugbu, Batangas"}</Text>
        <Text style={styles.infoLabel}>Contact Number:</Text>
        <Text style={styles.infoText}>{user.con_num}</Text>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditInformation}>
        <Text style={styles.editButtonText}>Edit Information</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  additionalInfo: {
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 15,
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
