import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ForumPost = ({ title, content, date_time, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.postContainer}>
      <View style={styles.postHeader}>
        <MaterialIcons name="announcement" size={24} color="#ff6b6b" />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.description}>{content.substring(0, 100)}...</Text>
    </TouchableOpacity>
  );
};

const Announcement = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const LoginAPIURL = "http://172.69.69.115/4Capstone/app/db_connection/getAnnouncement.php";

    try {
      const response = await fetch(LoginAPIURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const jsonResponse = await response.json();
      if (jsonResponse.Status) {
        setPosts(jsonResponse.Data);
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
      <ScrollView style={styles.postsContainer}>
        {posts.map((post, index) => (
          <ForumPost
            key={index}
            title={post.title}
            content={post.content}
            date_time={post.date_time}
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
              <Text style={styles.modalTitle}>Announcement</Text>
            </View>
            {selectedPost && (
              <>
                <Text style={styles.modalPostTitle}>{selectedPost.title}</Text>
                <Text style={styles.modalContent}>{selectedPost.content}</Text>
                <Text style={styles.modalDate}>{formatDate(selectedPost.date_time)}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  postsContainer: {
    flex: 1,
    padding: 16,
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
    borderLeftColor: '#ff6b6b',
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

export default Announcement;
