// button.js
import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({ label, theme, onPress }) {
  const styles = StyleSheet.create({
    buttonContainer: {
      margin: 10,
      borderRadius: 10,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      backgroundColor: theme === "primary" ? '#fff' : '#3498db',
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonLabel: {
      fontSize: 16,
      color: theme === "primary" ? '#25292e' : '#fff',
    },
  });

  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
        <Pressable
          style={[styles.button]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel]}>{label}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}
