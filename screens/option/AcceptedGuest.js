import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WarningMessage = ({ route }) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { guest } = route.params;  // Retrieve the guest details from route params

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Warning confirmed!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        Are you sure you want to proceed with the following guest? This action cannot be undone.
      </Text>
      
      <View style={styles.info}>
        <Text style={styles.label}>Name: <Text style={styles.value}>{guest.Guest_name}</Text></Text>
        <Text style={styles.label}>Email: <Text style={styles.value}>{guest.Guest_email}</Text></Text>
        <Text style={styles.label}>Contact: <Text style={styles.value}>{guest.guest_contact}</Text></Text>
        <Text style={styles.label}>Address: <Text style={styles.value}>{guest.guest_add}</Text></Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  info: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default WarningMessage;
