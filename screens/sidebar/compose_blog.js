import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BlogForm = () => {
  const [description, setDescription] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUserData();
  }, []);

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description || !user || !user.username) {
      Alert.alert('Validation Error', 'Please fill out all fields and ensure you are logged in.');
      return;
    }

    try {
      const response = await fetch('http://172.69.69.115/4Capstone/app/db_connection/postblog.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          username: user.username,
        }),
      });

      const jsonResponse = await response.json();
      if (jsonResponse.Status) {
        Alert.alert('Success', 'Post submitted successfully!');
        setTitle('');
        setDescription('');
        setImageUri(null);
        navigation.navigate('CommunityForum');
      } else {
        Alert.alert('Error', jsonResponse.Message);
      }
    } catch (error) {
      console.error("Error submitting post:", error.message);
      Alert.alert('Error', 'Error submitting post: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.headerTitle}>Create a New Blog Post</Text>

        <Text style={styles.label}>Post Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter post title"
          value={title}
          onChangeText={setTitle}
        />

        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}

        <Text style={styles.label}>Post Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter your post description..."
          multiline={true}
          numberOfLines={5}
          onChangeText={setDescription}
          value={description}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit Post</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={handlePickImage}>
        <Icon name="add-a-photo" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  formContainer: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 6,
  },
});

export default BlogForm;
