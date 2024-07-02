import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';

const GuestList = () => {
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const [guests, setGuests] = useState([
    {
      id: '1',
      name: 'Juan Dela Cruz',
      address: '123 Main St, Manila',
      date: '2024-06-25',
      status: 'View',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: '2',
      name: 'Maria Clara',
      address: '456 Elm St, Cebu',
      date: '2024-06-20',
      status: 'View',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: '3',
      name: 'Jose Rizal',
      address: '789 Pine St, Davao',
      date: '2024-06-28',
      status: 'View',
      image: 'https://via.placeholder.com/100'
    }
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.guestItem}>
      <Image source={{ uri: item.image }} style={styles.guestImage} />
      <View style={styles.guestInfo}>
        <Text style={styles.guestName}>{item.name}</Text>
        <Text style={styles.guestAddress}><Icon name="place" size={16} color="#888" /> {item.address}</Text>
        <Text style={styles.guestDate}><Icon name="calendar-today" size={16} color="#888" /> {item.date}</Text>
      </View>
      <TouchableOpacity
        style={styles.statusButton}
        onPress={() => navigation.navigate('Guest', { guest: item })}
      >
        <Text style={styles.statusButtonText}>{item.status}</Text>
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
          keyExtractor={(item) => item.id.toString()}
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
  guestDate: {
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
