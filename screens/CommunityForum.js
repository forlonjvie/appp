import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TextInput, Button } from 'react-native';
import { ref, push, set } from 'firebase/database';
import { database } from '../firebaseConfig';

const ForumPost = ({ author, time, title, description, tags }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.authorInfo}>
        <Image source={require('../assets/man.png')} style={styles.avatar} />
        <View>
          <Text style={styles.authorName}>{author}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.tagsContainer}>
        {tags.map((tag, index) => (
          <Text key={index} style={styles.tag}>{tag}</Text>
        ))}
      </View>
    </View>
  );
};

const CommunityForum = () => {
  const [posts, setPosts] = useState([
    {
      author: 'Norma Andrews',
      time: '30 minutes ago',
      title: 'How to Foster Community Engagement',
      description: 'Discussing strategies and practices for fostering meaningful community engagement in local neighborhoods.',
      tags: ['community', 'engagement', 'local'],
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState({
    author: '',
    time: '',
    title: '',
    description: '',
    tags: '',
  });

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
          <ForumPost key={index} {...post} />
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
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 16,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  time: {
    color: '#777',
    fontSize: 12,
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
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#eee',
    padding: 4,
    marginRight: 4,
    marginBottom: 4,
    borderRadius: 4,
    fontSize: 12,
    color: '#333',
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
