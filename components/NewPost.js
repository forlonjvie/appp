// components/NewPost.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const NewPost = ({ addPost }) => {
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.assets) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  const handlePost = () => {
    if (text.trim() || photo) {
      addPost({ text, photo });
      setText('');
      setPhoto(null);
    }
  };

  return (
    <View style={styles.newPost}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        value={text}
        onChangeText={setText}
      />
      <Button title="Choose Photo" onPress={handleChoosePhoto} />
      <Button title="Post" onPress={handlePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  newPost: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
});

export default NewPost;
