import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Text, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import Login from './screens/Login';
import Register from './screens/auth/Register';
import Home from './screens/Home';
import GenerateQR from './screens/GenerateQR';
import Guest from './screens/Guest';
import GuestLog from './screens/guest_inquire';
import GuestHistory from './screens/sidebar/guest_inquire_log';
import Profile from './screens/profile';
import Create from './screens/Create_Acc';
import CheckPayment from './screens/CheckPayment';
import Announcement from './screens/sidebar/announcement';
import Inbox from './screens/sidebar/inbox';
import GuestList from './screens/sidebar/guest_list';
import visit_log from './screens/sidebar/visit_log';
import Maintenance from './screens/sidebar/maintenance_request';
import compose_blog from './screens/sidebar/compose_blog';
import MaintenanceLog from './screens/sidebar/maintenance_request_log';
import InquireLog from './screens/guest_inquire';
import AcceptedGuest from './screens/option/AcceptedGuest';
import DenyGuest from './screens/option/deny_guest';
import CommunityForum from './screens/CommunityForum';
import PostDetail from './screens/PostDetail';
import GuardLogin from './guard/GuardLogin';
import guard_verify_otp from './guard/guard_verify_otp';
import guard_HO_Very from './guard/guard_HO_Very';
import TodayGuest from './guard/GuestList';
import GuestInfo from './guard/GuestInfo';

import { UserProvider } from './screens/UserContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'GenerateQR':
              iconName = 'qr-code';
              break;
            case 'Guest_log':
              iconName = 'person';
              break;
            case 'CheckPayment':
              iconName = 'cash';
              break;
            default:
              iconName = 'information-circle';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ textAlign: 'center', color: focused ? 'blue' : 'gray' }}>
            {route.name}
          </Text>
        ),
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="GenerateQR" component={GenerateQR} />
      <Tab.Screen name="Guest_log" component={GuestLog} />
      <Tab.Screen name="CheckPayment" component={CheckPayment} />
    </Tab.Navigator>
  );
}

const App = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      if (Platform.OS === 'android') {
        // Create a notification channel for announcements
        await Notifications.setNotificationChannelAsync('announcement-channel', {
          name: 'Announcement Channel',
          importance: Notifications.AndroidImportance.HIGH,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      // Request permissions for notifications
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
    };

    setupNotifications();

    // Add notification received listener
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    return () => subscription.remove();
  }, []);

  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
          <Stack.Screen name="Create" component={Create} options={{ headerShown: false }} />
          <Stack.Screen name="Announcement" component={Announcement} options={{ title: 'Announcement' }} />
          <Stack.Screen name="Inbox" component={Inbox} options={{ title: 'Inbox' }} />
          <Stack.Screen name="Guest_list" component={GuestList} options={{ title: 'Visit Logs' }} />
          <Stack.Screen name="visit_log" component={visit_log} options={{ title: 'Previous Guest' }} />
          <Stack.Screen name="Guest" component={Guest} options={{ headerShown: false }} />
          <Stack.Screen name="Maintenance" component={Maintenance} options={{ title: 'Maintenance Request' }} />
          <Stack.Screen name="Maintenance_log" component={MaintenanceLog} options={{ title: 'Maintenance Request Log' }} />
          <Stack.Screen name="Guest_history" component={GuestHistory} options={{ title: 'Guest Visit Log' }} />
          <Stack.Screen name="GuestAccepted" component={AcceptedGuest} options={{ title: 'Guest Accepted' }} />
          <Stack.Screen name="DenyGuest" component={DenyGuest} options={{ title: 'Deny Guest' }} />
          <Stack.Screen name="CommunityForum" component={CommunityForum} options={{ title: 'Community Forum' }} />
          <Stack.Screen name="compose_blog" component={compose_blog} options={{ title: 'Compose Blog' }} />
          <Stack.Screen name="PostDetail" component={PostDetail} options={{ title: 'Post Detail' }} />
          <Stack.Screen name="Inquire_log" component={InquireLog} options={{ title: 'Guest Inquire Log' }} />
          <Stack.Screen name="GuardLogin" component={GuardLogin} options={{ headerShown: false }} />
          <Stack.Screen name="guard_verify_otp" component={guard_verify_otp} options={{ headerShown: false }} />
          <Stack.Screen name="guard_HO_Very" component={guard_HO_Very} options={{ headerShown: false }} />
          <Stack.Screen name="TodayGuest" component={TodayGuest} options={{ title: 'Today Expected Guest' }} />
          <Stack.Screen name="GuestInfo" component={GuestInfo} options={{ title: 'Guest Info' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
