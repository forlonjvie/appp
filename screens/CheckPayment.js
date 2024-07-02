import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';

const Liabilities = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const homeowner = {
    name: 'Helena Hills',
    image: require('../assets/man.png'),
  };

  const currentMonthLiabilities = [
    { title: 'Electric Bills', value: '₱1,450.00', info: 'Includes utilities and services', month: 'July', year: 2024 },
    { title: 'Water Bills', value: '₱500.00', info: 'Includes utilities and services', month: 'July', year: 2024 },
    { title: 'Maintenance Fee', value: '₱350.00', info: 'Covers upkeep and repairs', month: 'July', year: 2024 },
    { title: 'Internet Bill', value: '₱1,200.00', info: 'Annual tax assessment', month: 'July', year: 2024 },
  ];

  const previousMonthLiabilities = [
    { title: 'Electric Bills', value: '₱2,450.00', info: 'Includes utilities and services', month: 'June', year: 2024, paid: true },
    { title: 'Water Bills', value: '₱350.00', info: 'Covers upkeep and repairs', month: 'June', year: 2024, paid: false },
    { title: 'Property Tax', value: '₱1,200.00', info: 'Annual tax assessment', month: 'June', year: 2024, paid: true },
    { title: 'Electric Bills', value: '₱2,450.00', info: 'Includes utilities and services', month: 'May', year: 2024, paid: true },
    { title: 'Water Bills', value: '₱350.00', info: 'Covers upkeep and repairs', month: 'May', year: 2024, paid: true },
    { title: 'Internet Bill', value: '₱1,200.00', info: 'Annual tax assessment', month: 'May', year: 2024, paid: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Financial Liabilities</Text>
        <TouchableOpacity onPress={navigateToProfile}>
          <Image source={homeowner.image} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      {isSidebarVisible && <Sidebar onClose={toggleSidebar} navigation={navigation} />}

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Current Month</Text>
        {currentMonthLiabilities.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
            <Text style={styles.cardInfo}>{item.info}</Text>
            <Text style={styles.cardDate}>{item.month} {item.year}</Text>
          </View>
        ))}
        <Text style={styles.sectionTitle}>Previous Months</Text>
        {previousMonthLiabilities.map((item, index) => (
          <View
            key={index}
            style={[
              styles.card,
              item.paid ? styles.cardPaid : styles.cardUnpaid,
            ]}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardValue}>{item.value}</Text>
            <Text style={styles.cardInfo}>{item.info}</Text>
            <Text style={styles.cardDate}>{item.month} {item.year}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardPaid: {
    borderColor: 'green',
    borderWidth: 1,
  },
  cardUnpaid: {
    borderColor: 'red',
    borderWidth: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007bff',
  },
  cardInfo: {
    fontSize: 14,
    color: '#666',
  },
  cardDate: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
});

export default Liabilities;
