import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';
import { UserContext } from './UserContext';

const Home = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const { user } = useContext(UserContext);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const homeowner = {
    name: user?.Name || 'John Doe',
    image: require('../assets/man.png'), 
  };

  const monthlyBills = [
    { title: 'Electricity', amount: 'Php 1500', info: '+5% from last month' },
    { title: 'Water', amount: 'Php 500', info: '-10% from last month' },
    { title: 'Internet', amount: 'Php 2000', info: '+2% from last month' },
  ];

  const visitLogs = [
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
          <Image source={homeowner.image} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      {isSidebarVisible && <Sidebar onClose={toggleSidebar} navigation={navigation} />}

      <ScrollView contentContainerStyle={styles.content}>
        {/* User Profile Container */}
        <View style={styles.profileContainer}>
          <Image source={homeowner.image} style={styles.profileImage} />
          <Text style={styles.profileName}>{homeowner.name}</Text>
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
            {monthlyBills.map((bill, index) => (
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
            {visitLogs.map((log, index) => (
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: '48%',
  },
  dashboardCardContent: {
    marginLeft: 10,
  },
  dashboardCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  dashboardCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#007bff',
  },
  cardInfo: {
    fontSize: 14,
    color: '#666',
  },
  chart: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 4,
  },
  chartItem: {
    marginBottom: 10,
  },
  chartLabel: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  chartData: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 2,
  },
  chartInfo: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default Home;
