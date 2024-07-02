import 'react-native-gesture-handler';
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Home from './screens/Home';
import GenerateQR from './screens/GenerateQR';
import Guest from './screens/Guest';
import Guest_log from './screens/guest_inquire';
import Guest_history from './screens/sidebar/guest_inquire_log';
import Profile from './screens/profile';
import CheckPayment from './screens/CheckPayment';
import Inbox from './screens/sidebar/inbox'; 
import Guest_list from './screens/sidebar/guest_list'; 
import Maintenance from './screens/sidebar/maintenance_request'; 
import Maintenance_log from './screens/sidebar/maintenance_request_log'; 
import Inquire_log from './screens/guest_inquire'; 
import AcceptedGuest from './screens/option/AcceptedGuest'; 
import DenyGuest from './screens/option/deny_guest';
import CommunityForum from './screens/CommunityForum'; 

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'GenerateQR') {
            iconName = 'qr-code';
          } else if (route.name === 'Guest_log') {
            iconName = 'person';
          } else if (route.name === 'CheckPayment') {
            iconName = 'cash';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ textAlign: 'center', color: focused ? 'blue' : 'gray' }}>
            {route.name}
          </Text>
        ),
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="GenerateQR" component={GenerateQR} />
      <Tab.Screen name="Guest_log" component={Guest_log} />
      <Tab.Screen name="CheckPayment" component={CheckPayment} />
      
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />
        <Stack.Screen
          name="Inbox"
          component={Inbox}
          options={{ title: 'Inbox' }}
        />
        <Stack.Screen
          name="Guest_list"
          component={Guest_list}
          options={{ title: 'Guest_list' }}
        />
        <Stack.Screen
          name="Guest"
          component={Guest}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Maintenance"
          component={Maintenance}
          options={{ title: 'Maintenance Request' }}
        />
        <Stack.Screen
          name="Maintenance_log"
          component={Maintenance_log}
          options={{ title: 'Maintenance Request Log' }}
        />
        <Stack.Screen
          name="Guest_history"
          component={Guest_history}
          options={{ title: 'Guest Visit Log' }}
        />
         <Stack.Screen
          name="GuestAccepted"
          component={AcceptedGuest}
          options={{ title: 'Guest Accepted' }}
        />
        <Stack.Screen
          name="DenyGuest"
          component={DenyGuest}
          options={{ title: 'Deny Guest' }}
        />
        <Stack.Screen
          name="CommunityForum"
          component={CommunityForum}
          options={{ title: 'Community Forum' }}
        />
        <Stack.Screen
          name="Inquire_log"
          component={Inquire_log}
          options={{ title: 'Guest Inquire Log' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
