import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Sidebar from './Sidebar';

const GenerateQR = ({ navigation }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const homeowner = {
    name: 'Juan',
    image: require('../assets/man.png'), 
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const handleGenerateNewQR = () => {
    // Function to handle QR code generation
    console.log('Generate new QR code');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleSidebar}>
          <Icon name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>QR Code Generator</Text>
        <TouchableOpacity onPress={navigateToProfile}>
          <Image source={homeowner.image} style={styles.userImage} />
        </TouchableOpacity>
      </View>

      {isSidebarVisible && <Sidebar onClose={toggleSidebar} navigation={navigation} />}

      <View style={styles.content}>
        <Image
          resizeMode="contain"
          style={styles.image}
          source={require('../assets/qr.png')}
        />
        <Text style={styles.homeOwnerText}>Home Owner: {homeowner.name}</Text>
        <Text style={styles.description}>
          This QR code can be used for accessing various services and facilities. Please present it whenever required.
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleGenerateNewQR}>
          <Text style={styles.buttonText}>Generate New QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GenerateQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: 20,
  },
  homeOwnerText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
