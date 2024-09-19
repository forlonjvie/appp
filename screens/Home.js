import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have this library installed
import Sidebar from './Sidebar'; // Ensure you have a Sidebar component imported

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [monthlyBills, setMonthlyBills] = useState([]);
  const [visitLogs, setVisitLogs] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
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

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    // Load data based on the selected filter
    // For example, update monthlyBills and visitLogs here
  };

  // Example data for demonstration; replace with real data as needed
  const exampleMonthlyBills = [
    { title: 'Electricity', amount: 'Php 1500', info: '+5% from last month' },
    { title: 'Water', amount: 'Php 500', info: '-10% from last month' },
    { title: 'Internet', amount: 'Php 2000', info: '+2% from last month' },
  ];

  const exampleVisitLogs = [
    { date: '2024-06-01', visitor: 'Mang Kanor', action: 'Naningil ng Utang' },
    { date: '2024-06-10', visitor: 'Janet', action: 'Naghahabol para sa anak' },
    { date: '2024-06-15', visitor: 'Manong Delivery Driver', action: 'Nagdeliver ng' },
  ];

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={user ? { uri: user.image } : null} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      {isSidebarVisible && <Sidebar onClose={toggleSidebar} navigation={navigation} />}

      <ScrollView contentContainerStyle={styles.content}>
        {/* User Profile Container */}
        {user && (
          <View style={styles.profileContainer}>
            <Image source={{ uri: user.image }} style={styles.profileImage} />
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
        )}
<View style={styles.container}>
      {user ? (
        <View>
          <Text>Welcome, {user.username}!</Text>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
        {/* Dashboard Section */}
        <View style={styles.dashboard}>
          <Text style={styles.dashboardTitle}>Dashboard</Text>
          <View style={styles.dashboardStats}>
            <View style={styles.dashboardCard}>
              <Icon name="account-balance-wallet" size={24} color="#007bff" />
              <View style={styles.dashboardCardContent}>
                <Text style={styles.dashboardCardTitle}>Total Bills</Text>
                <Text style={styles.dashboardCardValue}>Php 4000</Text>
              </View>
            </View>
            <View style={styles.dashboardCard}>
              <Icon name="people" size={24} color="#007bff" />
              <View style={styles.dashboardCardContent}>
                <Text style={styles.dashboardCardTitle}>Visitors</Text>
                <Text style={styles.dashboardCardValue}>3</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Filter Section */}
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'All' && styles.activeFilter]}
            onPress={() => handleFilterChange('All')}
          >
            <Icon name="view-list" size={20} color="#fff" />
            <Text style={styles.filterButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Monthly Bills' && styles.activeFilter]}
            onPress={() => handleFilterChange('Monthly Bills')}
          >
            <Icon name="receipt" size={20} color="#fff" />
            <Text style={styles.filterButtonText}>Monthly Bills</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, selectedFilter === 'Visit Logs' && styles.activeFilter]}
            onPress={() => handleFilterChange('Visit Logs')}
          >
            <Icon name="history" size={20} color="#fff" />
            <Text style={styles.filterButtonText}>Visit Logs</Text>
          </TouchableOpacity>
        </View>

        {/* Monthly Bills Section */}
        {(selectedFilter === 'All' || selectedFilter === 'Monthly Bills') && (
          <View style={styles.stats}>
            {exampleMonthlyBills.map((bill, index) => (
              <View style={styles.card} key={index}>
                <Text style={styles.cardTitle}>{bill.title}</Text>
                <Text style={styles.cardValue}>{bill.amount}</Text>
                <Text style={styles.cardInfo}>{bill.info}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Visit Logs Section */}
        {(selectedFilter === 'All' || selectedFilter === 'Visit Logs') && (
          <View style={styles.chart}>
            {exampleVisitLogs.map((log, index) => (
              <View style={styles.chartItem} key={index}>
                <Text style={styles.chartLabel}>{log.date}</Text>
                <Text style={styles.chartData}>{log.visitor}</Text>
                <Text style={styles.chartInfo}>{log.action}</Text>
              </View>
            ))}
          </View>
        )}
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
  content: {
    padding: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  filterButtonText: {
    marginLeft: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  activeFilter: {
    backgroundColor: '#0056b3',
  },
  dashboard: {
    marginBottom: 20,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007bff',
  },
  dashboardStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dashboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    width: '48%',
  },
  dashboardCardContent: {
    marginLeft: 10,
  },
  dashboardCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dashboardCardValue: {
    fontSize: 18,
    color: '#007bff',
  },
  stats: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardValue: {
    fontSize: 16,
    color: '#007bff',
  },
  cardInfo: {
    fontSize: 14,
    color: '#666',
  },
  chart: {
    marginBottom: 20,
  },
  chartItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  chartLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  chartData: {
    fontSize: 14,
    color: '#007bff',
  },
  chartInfo: {
    fontSize: 12,
    color: '#666',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
