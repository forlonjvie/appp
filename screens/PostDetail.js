import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure to import AsyncStorage
import axios from 'axios';

const PostDetail = ({ route }) => {
  const { postId } = route.params; // Get post ID from route params
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null); // To store user data

  // Fetch the user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData)); // Assuming it's a JSON string
      }
    };
    fetchUserData();
  }, []);

  // Fetch post details and comments after postId is set
  useEffect(() => {
    if (postId <= 0) {
      Alert.alert('Invalid post ID');
      return;
    }
    fetchPostDetails();
    fetchComments();
  }, [postId]);

  const fetchPostDetails = async () => {
    try {
      console.log(`Fetching post details for postId: ${postId}`);
      const response = await fetch(`http://172.69.69.115/4Capstone/app/db_connection/getPostDetail.php?postId=${postId}`);
      const jsonResponse = await response.json();
      console.log('Post details response:', jsonResponse);
      if (jsonResponse.Status) {
        setPost(jsonResponse.Data);
      } else {
        Alert.alert(jsonResponse.Message);
      }
    } catch (error) {
      console.error("Error fetching post:", error.message);
      Alert.alert("Error fetching post: " + error.message);
    }
  };

  const fetchComments = async () => {
    try {
      console.log(`Fetching comments for postId: ${postId}`);
      const response = await fetch(`http://172.69.69.115/4Capstone/app/db_connection/getComments.php?postId=${postId}`);
      const jsonResponse = await response.json();
      console.log('Comments response:', jsonResponse);
      if (jsonResponse.Status) {
        setComments(jsonResponse.Data);
      } else {
        Alert.alert(jsonResponse.Message);
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
      Alert.alert("Error fetching comments: " + error.message);
    }
  };

  const handleNewComment = async () => {
    if (newComment.trim() === '') return;
    if (!user) {
      Alert.alert("User not found");
      return;
    }

    try {
      console.log(`Adding new comment: ${newComment}`);
      const response = await fetch('http://172.69.69.115/4Capstone/app/db_connection/addComment.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          postId: postId,
          content: newComment,
          username: user.username, // Pass the username from user data
        }),
      });
      const jsonResponse = await response.json();
      console.log('Add comment response:', jsonResponse);
      if (jsonResponse.Status) {
        fetchComments();  // Refresh comments after adding a new one
        setNewComment('');  // Clear the comment input
      } else {
        Alert.alert(jsonResponse.Message);
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      {post && (
        <View style={styles.postContainer}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postContent}>{post.content}</Text>
          <Text style={styles.postMeta}>By {post.HO_username} on {new Date(post.created_at).toLocaleString()}</Text>
        </View>
      )}
      
      <ScrollView style={styles.commentsContainer}>
        {comments.map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Text style={styles.commentText}>{comment.content}</Text>
            <Text style={styles.commentMeta}>By {comment.HO_username} on Posted on {new Date(comment.created_at).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.newCommentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={newComment}
          onChangeText={(text) => setNewComment(text)}
        />
        <Button title="Post Comment" onPress={handleNewComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  postContainer: {
    marginBottom: 16,
  },
  postTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  postContent: {
    marginTop: 8,
    fontSize: 16,
    color: '#555',
  },
  postMeta: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
  commentsContainer: {
    flex: 1,
  },
  comment: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  commentMeta: {
    marginTop: 4,
    fontSize: 12,
    color: '#777',
  },
  newCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginRight: 8,
    padding: 8,
    borderRadius: 5,
  },
});

export default PostDetail;
