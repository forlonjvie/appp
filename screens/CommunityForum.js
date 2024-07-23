import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Button, Alert } from 'react-native';

const ForumPost = ({ title, content }) => {
  return (
    <View style={styles.postContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{content}</Text>
    </View>
  );
};

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState({
    author: '',
    time: '',
    title: '',
    description: '',
    tags: '',
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const LoginAPIURL = "http://192.168.8.112/web-capstone/app/db_connection/getAnnouncement.php";

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

  const handleNewPost = async () => {
    const postID = push(ref(database, 'homeowner/posts')).key;
    const currentTime = new Date().toISOString();
    const postData = {
      author: newPost.author,
      time: currentTime,
      title: newPost.title,
      description: newPost.description,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
    };

    try {
      await set(ref(database, `homeowner/posts/${postID}`), postData);
      setPosts([...posts, postData]);
      setNewPost({ author: '', time: '', title: '', description: '', tags: '' });
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving new post: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community Forum</Text>
        <TouchableOpacity style={styles.newPostButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.newPostButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tabs}>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Newest</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Featured</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>All posts</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Unanswered</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.postsContainer}>
        {posts.map((post, index) => (
          <ForumPost key={index} title={post.title} content={post.content} />
        ))}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>New Post</Text>
          <TextInput
            style={styles.input}
            placeholder="Author"
            value={newPost.author}
            onChangeText={(text) => setNewPost({ ...newPost, author: text })}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Tags (comma separated)"
            value={newPost.tags}
            onChangeText={(text) => setNewPost({ ...newPost, tags: text })}
          />
          <Button title="Submit" onPress={handleNewPost} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
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
  newPostButton: {
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 50,
  },
  newPostButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    padding: 8,
  },
  tabText: {
    color: '#007bff',
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
});

export default CommunityForum;
