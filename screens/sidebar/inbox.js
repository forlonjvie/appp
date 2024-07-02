import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const data = [
  {
    id: 1,
    name: 'Mang Kanor',
    supportingText: 'pre magbayad ka na ng utang',
    time: '2 min',
  },
  {
    id: 2,
    name: 'Manong Delivery Driver',
    supportingText: 'sir parcel nyo nahulog sa kanal',
    time: '3 min',
  },
  {
    id: 3,
    name: 'Vicky',
    supportingText: 'Panagutan mo anak mo',
    time: '9 min',
  },
  {
    id: 4,
    name: 'Vicky',
    supportingText: 'nabuntis mo ako',
    time: '15 min',
  },
  {
    id: 5,
    name: 'Janet',
    supportingText: 'breake na tayo',
    time: '20 min',
  },
];

const InboxScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.icon} />
            <View style={styles.content}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.supportingText}>{item.supportingText}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#ccc',
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  supportingText: {
    fontSize: 14,
    color: '#666',
  },
  time: {
    fontSize: 14,
    color: '#999',
  },
});

export default InboxScreen;
