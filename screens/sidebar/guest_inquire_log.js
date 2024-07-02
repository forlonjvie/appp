import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const GuestList = () => {
  const [guests, setGuests] = useState([
    {
      id: '1',
      name: 'Juan Dela Cruz',
      address: '123 Main St, Manila',
      date: '2024-06-25',
      status: 'Accepted',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: '2',
      name: 'Maria Clara',
      address: '456 Elm St, Cebu',
      date: '2024-06-20',
      status: 'Deny',
      image: 'https://via.placeholder.com/100'
    },
    {
      id: '3',
      name: 'Jose Rizal',
      address: '789 Pine St, Davao',
      date: '2024-06-28',
      status: 'Accepted',
      image: 'https://via.placeholder.com/100'
    }
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.guestItem}>
      <Image source={{ uri: item.image }} style={styles.guestImage} />
      <View style={styles.guestInfo}>
        <Text style={styles.guestName}>{item.name}</Text>
        <Text style={styles.guestAddress}>{item.address}</Text>
        <Text style={styles.guestDate}>{item.date}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.statusButton,
          { backgroundColor: item.status === 'Accepted' ? '#4CAF50' : '#F44336' }
        ]}
      >
        <Text style={styles.statusButtonText}>{item.status}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Guest List</Text>
      <FlatList
        data={guests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.guestList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  },
  statusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GuestList;
