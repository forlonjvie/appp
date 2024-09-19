import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';

// Function to fetch homeowner data automatically
const fetchHomeownerDetails = async (setHomeownerData, setErrorMessage) => {
  const HomeownerDetailsURL = "http://172.69.69.115/4Capstone/app/guard/db_connection/getHOquery.php";

  try {
    const response = await fetch(HomeownerDetailsURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const jsonResponse = await response.json();
    if (jsonResponse.Status && jsonResponse.Data.length > 0) {
      const latestHomeowner = jsonResponse.Data[0]; // Assuming one record
      return latestHomeowner; // Return the latest homeowner data
    } else {
      setErrorMessage(jsonResponse.Message);
    }
  } catch (error) {
    setErrorMessage("Error: " + error.message);
  }
  return null;
};

// Function to save logs to the server
const saveLogToServer = async (name, point, setErrorMessage) => {
  const logURL = "http://172.69.69.115/4Capstone/app/guard/db_connection/save_log_HO.php";

  const logData = {
    name: name,
    point: point,
  };

  try {
    const response = await fetch(logURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    });

    const jsonResponse = await response.json();
    if (jsonResponse.status === "success") {
      Alert.alert('Success', 'Log saved successfully.');
    } else {
      setErrorMessage(jsonResponse.message);
    }
  } catch (error) {
    setErrorMessage("Error: " + error.message);
  }
};

// Function to get the latest log for the current day
const getLastLogForToday = async (username, setErrorMessage) => {
  const todayLogURL = `http://172.69.69.115/4Capstone/app/guard/db_connection/get_today_log.php?username=${username}`;

  try {
    const response = await fetch(todayLogURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const jsonResponse = await response.json();
    if (jsonResponse.status === "success" && jsonResponse.data.length > 0) {
      return jsonResponse.data[0].point; // Return the last action for today (either "Entry" or "Exit")
    } else {
      return null; // No logs for today
    }
  } catch (error) {
    setErrorMessage("Error: " + error.message);
  }
  return null;
};

const App = ({ navigation }) => {
  const [homeownerData, setHomeownerData] = useState({
    HOQ_id: '',
    homeowner_id: '',
    username: '',
    address: '',
    date: '',
    time: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [homeownerLogs, setHomeownerLogs] = useState([]);
  const [nextAction, setNextAction] = useState('Entry'); // Initial action is "Entry" by default

  // Fetch homeowner data and determine next action every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      const latestData = await fetchHomeownerDetails(setHomeownerData, setErrorMessage);
      if (latestData) {
        setHomeownerData(latestData);

        // Check the latest log to determine the next action (Entry or Exit)
        const lastLog = await getLastLogForToday(latestData.username, setErrorMessage);
        setNextAction(lastLog === 'Entry' ? 'Exit' : 'Entry'); // Toggle action based on the last log
      }
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  // Handle button press (either Entry or Exit depending on current action)
  const handleLogAction = async () => {
    await saveLogToServer(homeownerData.username, nextAction, setErrorMessage);
    setHomeownerLogs((prevLogs) => [
      ...prevLogs,
      {
        ...homeownerData,
        logTime: new Date().toLocaleString(),
        action: nextAction,
      },
    ]);
    Alert.alert(`${nextAction} Recorded`, `${nextAction} for ${homeownerData.username} logged.`);

    // Toggle the action for the next press
    setNextAction(nextAction === 'Entry' ? 'Exit' : 'Entry');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => navigation.navigate('guard_HO_Very')}
      >
        <Text style={styles.refreshText}>⟳</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Homeowner Query Details</Text>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {false && (
  <View>
    <TextInput
      style={styles.input}
      placeholder="HOQ ID"
      value={homeOwnerDetails.HOQ_id}
      editable={false}
    />
    <TextInput
      style={styles.input}
      placeholder="Homeowner ID"
      value={homeOwnerDetails.homeowner_id}
      editable={false}
    />
  </View>
)}

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={homeownerData.username}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={homeownerData.address}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={homeownerData.date}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={homeownerData.time}
        editable={false}
      />

      <TouchableOpacity style={styles.actionButton} onPress={handleLogAction}>
        <Text style={styles.buttonText}>{nextAction}</Text>
      </TouchableOpacity>

      <Text style={styles.logsTitle}>Homeowner Logs:</Text>
      <FlatList
        data={homeownerLogs}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.logItem}>
            <Text>{`${item.action} - ${item.username} at ${item.logTime}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 16,
  },
  refreshButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 4,
  },
  refreshText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  modalEntryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
  },
  modalExitButton: {
    backgroundColor: '#F44336',
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  logsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  logItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default App;
