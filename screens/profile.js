import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { UserContext } from './UserContext';

const ProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const API_URL = "http://192.168.8.112/web-capstone/app/db_connection/getuser.php";

      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: user?.email }) // Check if user is defined before accessing email
        });
        const result = await response.json();
        if (result.Status) {
          setUser(result.userData);
        } else {
          Alert.alert(result.Message);
        }
      } catch (error) {
        Alert.alert("Error: " + error.message);
      }
    };

    if (user && user.email) {
      fetchUserProfile();
    }
  }, [user, setUser]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/man.png')} style={styles.profileImage} />
        <Text style={styles.name}>{user.Name}</Text>
        <Text style={styles.bio}>{user.bio || "Bio not available"}</Text>
      </View>
      <View style={styles.additionalInfo}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>{user.Address}</Text>
        <Text style={styles.infoLabel}>Contact Number:</Text>
        <Text style={styles.infoText}>{user.Contact_Number}</Text>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{user.email}</Text>
      </View>
      <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>EDIT</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  bio: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
    paddingHorizontal: 20,
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
    backgroundColor: '#007bff',
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
});

export default ProfileScreen;
