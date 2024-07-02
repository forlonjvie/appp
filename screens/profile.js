import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/man.png')} 
          style={styles.profileImage}
        />
        <Text style={styles.name}>Mama Mo Blue</Text>
        <Text style={styles.bio}>Passionate about technology and innovation. Love to travel and explore new cultures. Always ready for a new challenge.</Text>
      </View>
      <View style={styles.socialIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="logo-facebook" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="logo-twitter" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="logo-instagram" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.additionalInfo}>
        <Text style={styles.infoLabel}>Address:</Text>
        <Text style={styles.infoText}>House No. 123, Block 4, Lot 5</Text>
        <Text style={styles.infoLabel}>Contact Number:</Text>
        <Text style={styles.infoText}>+63 912 345 6789</Text>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>mamamooasul@gmail.com</Text>
      </View>
      <TouchableOpacity style={styles.followButton}>
        <Text style={styles.followButtonText}>EDIT</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>House Members</Text>
      
      <View style={styles.section}>
        <View style={styles.member}>
          <Image
            source={require('../assets/wife.png')}
            style={styles.memberImage}
          />
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>Mama Mo Red</Text>
            <Text style={styles.memberBio}>Enjoys gardening and cooking. Loves spending time with family and friends.</Text>
            <Text style={styles.infoLabel}>Contact Number:</Text>
            <Text style={styles.infoText}>+63 912 345 6790</Text>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>mamamored@gmail.com</Text>
          </View>
        </View>
        <View style={styles.member}>
          <Image
            source={require('../assets/boy.png')} 
            style={styles.memberImage}
          />
          <View style={styles.memberInfo}>
            <Text style={styles.memberName}>Anak koy Violet</Text>
            <Text style={styles.memberBio}>Loves playing with toys and learning new things every day.</Text>
            <Text style={styles.infoLabel}>Contact Number:</Text>
            <Text style={styles.infoText}>N/A</Text>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoText}>N/A</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  bio: {
    textAlign: 'center',
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  additionalInfo: {
    marginBottom: 30,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#212529',
    marginBottom: 15,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  iconButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#e9ecef',
  },
  icon: {
    fontSize: 24,
    color: '#495057',
  },
  followButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  followButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  member: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  memberImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  memberInfo: {
    alignItems: 'center',
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 5,
  },
  memberBio: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ProfileScreen;
