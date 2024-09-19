import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Sidebar from './Sidebar';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const QRCode = () => {
  const [user, setUser] = useState(null);
  const navigation = useNavigation();
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { username } = JSON.parse(userData);
          const response = await axios.get(`http://172.69.69.115/4Capstone/app/db_connection/getuser.php?username=${username}`);
          if (response.data.error) {
            console.error("User not found");
            navigation.navigate('Login');
          } else {
            setUser(response.data);
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

  const handleInquiry = async () => {
    try {
      const response = await axios.post('http://172.69.69.115/4Capstone/app/db_connection/submit_inquiry.php', {
        homeowner_id: user.HO_Id,
        name: `${user.fname} ${user.lname}`,
        address: user.hnum,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  const imageUrl = `http://172.69.69.115/4Capstone/stuff/${user.qr_code}`;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>My QR</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image source={require('../assets/man.png')} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      {isSidebarVisible && <Sidebar onClose={toggleSidebar} navigation={navigation} />}

      <View style={styles.profileContent}>
        <View style={styles.headerContent}>
          <Text style={styles.name}>{user.fname} {user.lname}</Text>
          <Image source={{ uri: imageUrl }} style={styles.qrImage} />
          <Text style={styles.detail}>This QR code is used for logging your entry or exit. Simply scan to record your time of arrival or departure.</Text>
        </View>

        {/* Inquiry Button */}
        <TouchableOpacity style={styles.inquiryButton} onPress={handleInquiry}>
          <Text style={styles.inquiryButtonText}>Send Inquiry</Text>
        </TouchableOpacity>
      </View>
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
  profileContent: {
    flex: 1,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  qrImage: {
    width: 300,
    height: 300,
    marginTop: 25,
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginTop: 35,
  },
  detail: {
    fontSize: 15,
    color: 'red',
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40,
  },
  inquiryButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  inquiryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default QRCode;
