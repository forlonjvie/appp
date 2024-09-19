import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Required Field is Missing", "Please enter both email and password.");
      return;
    }

    setLoading(true);

    const LoginAPIURL = "http://172.69.69.115/4Capstone/app/db_connection/login.php";
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
    const data = { email, password };

    try {
      const response = await fetch(LoginAPIURL, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setLoading(false);

      if (responseData.Status) {
        const userData = responseData.userData;

        if (userData) {
          await AsyncStorage.setItem('user', JSON.stringify(userData));
          await AsyncStorage.setItem('sessionKey', userData.sessionKey || ''); // Ensure sessionKey is saved
          navigation.navigate('Home');
        } else {
          Alert.alert("Login Failed", "User data is missing.");
        }
      } else {
        Alert.alert("Login Failed", responseData.Message);
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "An error occurred: " + error.message);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('Create'); // Assumes 'Create' is the name of the sign-up screen in your navigator
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.signUpButton} onPress={navigateToSignUp}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  signUpButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  signUpText: {
    color: '#2980b9',
    fontSize: 16,
  },
});

export default LoginScreen;
