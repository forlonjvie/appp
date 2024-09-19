import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Maintenance = ({ navigation }) => {
  const [username, setUsername] = useState(''); // Store username here
  const [pendingPosts, setPendingPosts] = useState([]);
  const [completedPosts, setCompletedPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { username } = JSON.parse(userData);
          setUsername(username); // Store username in state
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error("Failed to get user data:", error);
        navigation.navigate('Login');
      }
    };
    getUserData();
  }, []);

  useEffect(() => {
    if (username) {
      fetchMaintenanceRequests();
    }
  }, [username]);

  const fetchMaintenanceRequests = async () => {
    const apiURL = `http://172.69.69.115/4Capstone/app/db_connection/getMaintenanceRequestLog.php?username=${username}`;

    try {
      const response = await fetch(apiURL, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.Status) {
        const pending = jsonResponse.Data.filter(post => post.status === 'pending');
        const completed = jsonResponse.Data.filter(post => post.status === 'completed');
        setPendingPosts(pending);
        setCompletedPosts(completed);
      } else {
        Alert.alert(jsonResponse.Message);
      }
    } catch (error) {
      Alert.alert("Error: " + error.message);
    }
  };

  const handlePostPress = (post) => {
    setSelectedPost(post);
    setModalVisible(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Pending Maintenance Requests</Text>
      <ScrollView style={styles.postsContainer}>
        {pendingPosts.map((post, index) => (
          <MaintenancePost
            key={index}
            title={post.title}
            content={post.content}
            date_time={post.created_at}
            status={post.status}
            onPress={() => handlePostPress(post)}
          />
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Completed Maintenance Requests</Text>
      <ScrollView style={styles.postsContainer}>
        {completedPosts.map((post, index) => (
          <MaintenancePost
            key={index}
            title={post.title}
            content={post.content}
            date_time={post.created_at}
            status={post.status}
            onPress={() => handlePostPress(post)}
          />
        ))}
      </ScrollView>

      {/* Modal for displaying post details */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <MaterialIcons name="announcement" size={30} color="#fff" />
              <Text style={styles.modalTitle}>Maintenance Request</Text>
            </View>
            {selectedPost && (
              <>
                <Text style={styles.modalPostTitle}>{selectedPost.title}</Text>
                <Text style={styles.modalContent}>{selectedPost.content}</Text>
                <Text style={styles.modalDate}>{formatDate(selectedPost.created_at)}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const MaintenancePost = ({ title, content, date_time, status, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.postContainer,
        { borderLeftColor: status === 'completed' ? '#4caf50' : '#ff6b6b' }, // Green for completed, red for pending
      ]}
    >
      <View style={styles.postHeader}>
        <MaterialIcons name="announcement" size={24} color={status === 'completed' ? '#4caf50' : '#ff6b6b'} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{content.substring(0, 100)}...</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 16,
    textAlign: 'center',
  },
  postsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  description: {
    color: '#555',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    width: '100%',
    backgroundColor: '#ff6b6b',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  modalPostTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    textAlign: 'center',
  },
  modalContent: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDate: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Maintenance;
