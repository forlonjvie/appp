import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput, Button, Alert, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';  // Import Icon from react-native-vector-icons

const ForumPost = ({ title, content, writer, author, createdAt, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.postContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{content}</Text>
        <Text style={styles.meta}>By {writer} on {new Date(createdAt).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
};

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
  });
  const [user, setUser] = useState(null);
  const [showNewPostBanner, setShowNewPostBanner] = useState(false); // New state for banner visibility
  const [bannerAnimation] = useState(new Animated.Value(0)); // Animation for banner

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    fetchPosts();
    const intervalId = setInterval(fetchPosts, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  const fetchPosts = async () => {
    const postsAPIURL = "http://172.69.69.115/4Capstone/app/db_connection/getPost.php";

    try {
      const response = await fetch(postsAPIURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const jsonResponse = await response.json();
      if (jsonResponse.Status) {
        const newPosts = jsonResponse.Data;
        setPosts(newPosts);

        // Check if there are new posts and show banner
        if (newPosts.some(post => new Date(post.created_at).getTime() > Date.now() - 10000)) {
          setShowNewPostBanner(true);
          Animated.timing(bannerAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
          setTimeout(() => {
            Animated.timing(bannerAnimation, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }).start();
            setShowNewPostBanner(false);
          }, 5000); // Banner shows for 5 seconds
        }
      } else {
        Alert.alert(jsonResponse.Message);
      }
    } catch (error) {
      Alert.alert("Error: " + error.message);
    }
  };

  const handleNewPost = async () => {
    if (!user) {
      Alert.alert('User not logged in');
      return;
    }

    const postData = {
      author: user.username,
      writer: user.username,
      title: newPost.title,
      description: newPost.description,
    };

    try {
      const response = await fetch('http://172.69.69.115/4Capstone/app/db_connection/addPost.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.Status) {
        setNewPost({ title: '', description: '' });
        setModalVisible(false);
        fetchPosts(); // Refetch posts to update list
      } else {
        Alert.alert(jsonResponse.Message);
      }
    } catch (error) {
      console.error("Error saving new post: ", error);
    }
  };

  const bannerTranslateY = bannerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 0] // Banner moves from above to its position
  });

  return (
    <View style={styles.container}>
      {/* New Post Banner */}
      {showNewPostBanner && (
        <Animated.View style={[styles.banner, { transform: [{ translateY: bannerTranslateY }] }]}>
          <Text style={styles.bannerText}>New posts available! 🎉</Text>
        </Animated.View>
      )}

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Forum</Text>
      </View>

      <ScrollView style={styles.postsContainer}>
        {posts.map((post, index) => (
          <ForumPost 
            key={index} 
            title={post.title} 
            content={post.content} 
            writer={post.HO_username} 
            author={post.username} 
            createdAt={post.created_at}
            onPress={() => navigation.navigate('PostDetail', { postId: post.post_id })}
          />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>New Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={newPost.title}
            onChangeText={(text) => setNewPost({ ...newPost, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newPost.description}
            onChangeText={(text) => setNewPost({ ...newPost, description: text })}
          />
          <Button title="Submit" onPress={handleNewPost} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.composeButton}
        onPress={() => navigation.navigate('compose_blog')}
      >
        <Icon name="create-outline" size={24} color="#fff" />
        <Text style={styles.composeButtonText}>Compose</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#007bff',
    padding: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  bannerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    color: '#555',
    marginBottom: 8,
  },
  meta: {
    fontSize: 12,
    color: '#777',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 5,
  },
  composeButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  composeButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CommunityForum;
