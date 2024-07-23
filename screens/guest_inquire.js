import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';

const GuestList = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = async () => {
    const API_URL = "http://192.168.8.112/web-capstone/app/db_connection/getvisit.php";

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.Status) {
        setGuests(result.Data);
      } else {
        console.log(result.Message);
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const renderItem = ({ item }) => (
    <View style={styles.guestItem}>
      <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.guestImage} />
      <View style={styles.guestInfo}>
        <Text style={styles.guestName}>{item.Guest_name}</Text>
        <Text style={styles.guestAddress}><Icon name="place" size={16} color="#888" /> {item.HO_housenum}</Text>
        <Text style={styles.guestEmail}><Icon name="email" size={16} color="#888" /> {item.Guest_email}</Text>
        <Text style={styles.guestMessage}><Icon name="message" size={16} color="#888" /> {item.message}</Text>
      </View>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => navigation.navigate('Guest', { guest: item })}
      >
        <Text style={styles.statusButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Guest List</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/man.png')} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      {isSidebarVisible && <Sidebar onClose={toggleSidebar} navigation={navigation} />}

      <View style={styles.content}>
        <FlatList
          data={guests}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.guestList}
        />
      </View>
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
