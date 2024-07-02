import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const data = [
  {
    id: 1,
    name: 'Mang Kanor',
    address: '123 Main St, Springfield, IL',
    contactNumber: '123-456-7890',
    date: 'July 1, 2024',
    icon: 'person',
    image: require('../../assets/man2.png'), 
  },
  {
    id: 2,
    name: 'Manong Delivery Driver',
    address: '456 Oak Ave, Cityville, CA',
    contactNumber: '987-654-3210',
    date: 'July 1, 2024',
    icon: 'local-shipping',
    image: require('../../assets/delivery-man.png'), 
  },
  {
    id: 3,
    name: 'Vicky',
    address: '789 Elm St, Metro City, NY',
    contactNumber: '456-789-0123',
    date: 'July 2, 2024',
    icon: 'person',
    image: require('../../assets/human.png'), 
  },
  {
    id: 4,
    name: 'Janet',
    address: '567 Pine Rd, Beachtown, FL',
    contactNumber: '321-654-9870',
    date: 'July 2, 2024',
    icon: 'person',
    image: require('../../assets/human.png'), 
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
            <View style={styles.iconContainer}>
              {item.image ? (
                <Image source={item.image} style={styles.image} />
              ) : (
                <Icon name={item.icon} size={40} color="#333" />
              )}
            </View>
            <View style={styles.content}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>{item.address}</Text>
              <Text style={styles.details}>{item.contactNumber}</Text>
              <Text style={styles.details}>{item.date}</Text>
            </View>
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
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: '#666',
  },
});

export default InboxScreen;
