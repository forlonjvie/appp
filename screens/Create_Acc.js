import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleInitial, setMiddleInitial] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [image] = useState('N/A'); // Default image data

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://172.69.69.115/4Capstone/app/db_connection/register_process.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fname: firstName,
          lname: lastName,
          mid: middleInitial,
          hnum: houseNumber,
          email: email,
          contact: contactNumber,
          username: username,
          password: password,
        }),
      });

      const textResponse = await response.text();
      console.log("Raw response: ", textResponse); // Log raw response for debugging
      const responseData = JSON.parse(textResponse);

      if (responseData.success) {
        Alert.alert('Success', 'Account created successfully!');
      } else {
        Alert.alert('Error', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error', 'An error occurred while registering: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput style={styles.input} placeholder="First Name" onChangeText={setFirstName} value={firstName} />
      <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} value={lastName} />
      <TextInput style={styles.input} placeholder="Middle Initial" onChangeText={setMiddleInitial} value={middleInitial} />
      <TextInput style={styles.input} placeholder="House Number" onChangeText={setHouseNumber} value={houseNumber} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} />
      <TextInput style={styles.input} placeholder="Contact Number" onChangeText={setContactNumber} value={contactNumber} />
      <TextInput style={[styles.input, styles.usernameInput]} placeholder="Username" onChangeText={setUsername} value={username} />
      <TextInput style={[styles.input, styles.passwordInput]} placeholder="Password" secureTextEntry onChangeText={setPassword} value={password} />
      <View style={styles.button}>
        <Button title="Register" color="#fff" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f4f8',
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccd1d9',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  usernameInput: {
    backgroundColor: '#e8f0fe',
    borderColor: '#5c6bc0',
  },
  passwordInput: {
    backgroundColor: '#fffde7',
    borderColor: '#fbc02d',
  },
  button: {
    backgroundColor: '#1abc9c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
