// components/Post.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Post = ({ post }) => {
  return (
    <View style={styles.post}>
      <Text style={styles.text}>{post.text}</Text>
      {post.photo && <Image source={{ uri: post.photo }} style={styles.photo} />}
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
  photo: {
    marginTop: 10,
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default Post;
