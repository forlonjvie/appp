import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Sidebar = ({ onClose }) => {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    onClose();
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Mail</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Icon name="close" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Inbox Section */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.item} onPress={() => navigateToScreen('Inbox')}>
          <Icon name="inbox" size={24} color="#4CAF50" />
          <Text style={styles.itemText}>Inbox</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>24</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Mailbox Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Mailbox</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigateToScreen('Guest_list')}>
          <Icon name="favorite" size={24} color="#FF4081" />
          <Text style={styles.itemText}>Guests</Text>
        </TouchableOpacity>
      </View>

      {/* Miscellaneous Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Miscellaneous</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigateToScreen('Maintenance')}>
          <Icon name="build" size={24} color="#FFEB3B" />
          <Text style={styles.itemText}>Issue a maintenance request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigateToScreen('Maintenance_log')}>
          <Icon name="info" size={24} color="#03A9F4" />
          <Text style={styles.itemText}>Request status</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => navigateToScreen('CommunityForum')}>
          <Icon name="forum" size={24} color="#9C27B0" />
          <Text style={styles.itemText}>Community thread</Text>
        </TouchableOpacity>
      </View>

      {/* Guest Logs Section */}
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Guest Logs</Text>
        <TouchableOpacity style={styles.item} onPress={() => navigateToScreen('Guest_history')}>
          <Icon name="history" size={24} color="#607D8B" />
          <Text style={styles.itemText}>Guest Log Records</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 260,
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    zIndex: 1000,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  closeButton: {
    padding: 8,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 16,
  },
  badge: {
    backgroundColor: '#FF5722',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 'auto'
  },
  badgeText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default Sidebar;
