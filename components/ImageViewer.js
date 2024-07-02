import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageViewer = ({ placeholderImageSource, selectedImage }) => {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default ImageViewer;
