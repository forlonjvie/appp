import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const GuestList = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [guests, setGuests] = useState([]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { username } = JSON.parse(userData);
          const response = await axios.get(`http://172.69.69.115/4Capstone/app/db_connection/getVisitLog.php?username=${username}`);
          if (response.data.error) {
            console.error("User not found");
            navigation.navigate('Login');
          } else {
            setGuests(response.data);
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

  if (guests.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.guestItem}>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.guestImage} />
      <View style={styles.guestInfo}>
        <Text style={styles.guestName}>{item.Guest_name}</Text>
        <Text style={styles.guestAddress}><Icon name="place" size={16} color="#888" /> {item.guest_add}</Text>
        <Text style={styles.guestEmail}><Icon name="email" size={16} color="#888" /> {item.Guest_email}</Text>
        <Text style={styles.guestMessage}><Icon name="message" size={16} color="#888" /> {item.message}</Text>
      </View>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => navigation.navigate('visit_log', { guest: item })}
      >
        <Text style={styles.statusButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.content}>
      <FlatList
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.guestList}
      />
    </View>
  );
};

export default GuestList;

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
    paddingHorizontal: 20,
  },
  guestList: {
    marginTop: 10,
  },
  guestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  guestInfo: {
    flex: 1,
    marginLeft: 10,
  },
  guestName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  guestAddress: {
    fontSize: 14,
    color: '#888',
  },
  guestEmail: {
    fontSize: 14,
    color: '#888',
  },
  guestMessage: {
    fontSize: 14,
    color: '#888',
  },
  guestImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statusButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#007bff',
    elevation: 2,
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
