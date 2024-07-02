import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const MaintenanceRequestsLog = () => {
  const [requests, setRequests] = useState([
    { id: '1', title: 'Sirang Poste', status: 'Pending', date: '2024-06-25' },
    { id: '2', title: 'Baha sa Kanto', status: 'Resolved', date: '2024-06-20' },
    { id: '3', title: 'Pumutok na Tubo', status: 'Pending', date: '2024-06-28' },
    { id: '4', title: 'Basag na Salamin', status: 'Resolved', date: '2024-06-18' },
    { id: '5', title: 'Baradong Kanal', status: 'Pending', date: '2024-07-01' },
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.requestItem}>
      <View style={styles.requestInfo}>
        <Text style={styles.requestTitle}>{item.title}</Text>
        <Text style={styles.requestDate}>{item.date}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.statusButton,
          { backgroundColor: item.status === 'Pending' ? '#FF9800' : '#4CAF50' }
        ]}
      >
        <Text style={styles.statusButtonText}>{item.status}</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Maintenance Requests</Text>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.requestsList}
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
  requestsList: {
    marginTop: 10,
  },
  requestItem: {
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
  requestInfo: {
    flex: 1,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  requestDate: {
    fontSize: 14,
    color: '#888',
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

export default MaintenanceRequestsLog;
