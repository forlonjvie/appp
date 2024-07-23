import React, { useState, useContext } from 'react';
import { ScrollView, TouchableOpacity, View, KeyboardAvoidingView, Image, Alert } from 'react-native';
import { Layout, Text, TextInput, Button, useTheme, themeColor } from 'react-native-rapi-ui';
import CryptoJS from 'crypto-js';
import { UserContext } from '../UserContext';

export default function Login({ navigation }) {
  const { isDarkmode } = useTheme();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Required Field is Missing");
      return;
    }

    let hashedPassword = CryptoJS.MD5(password).toString();

    let LoginAPIURL = "http://192.168.8.112/web-capstone/app/db_connection/login.php";

    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    let Data = {
      email: email,
      password: hashedPassword,
    };

    setLoading(true);

    fetch(LoginAPIURL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Data)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((response) => {
      setLoading(false);
      if (response.Status) {
        setUser(response.userData);
        navigation.navigate('Home');  // Navigate to Home screen
      } else {
        Alert.alert(response.Message);
      }
    })
    .catch((error) => {
      setLoading(false);
      Alert.alert("Error: " + error.message);
    });
  };

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: isDarkmode ? "#17171E" : themeColor.white100 }}>
            <Image resizeMode="contain" style={{ height: 220, width: 220 }} source={require("../../assets/log-in.png")} />
          </View>
          <View style={{ flex: 3, paddingHorizontal: 20, paddingBottom: 20, backgroundColor: isDarkmode ? themeColor.dark : themeColor.white }}>
            <Text fontWeight="bold" style={{ alignSelf: "center", padding: 30 }} size="h3">Login</Text>
            <Text>Email</Text>
            <TextInput containerStyle={{ marginTop: 15 }} placeholder="Enter your email" value={email} autoCapitalize="none" autoCompleteType="off" autoCorrect={false} keyboardType="email-address" onChangeText={(text) => setEmail(text)} />
            <Text style={{ marginTop: 15 }}>Password</Text>
            <TextInput containerStyle={{ marginTop: 15 }} placeholder="Enter your password" value={password} autoCapitalize="none" autoCompleteType="off" autoCorrect={false} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />
            <Button text={loading ? "Loading" : "Continue"} onPress={handleLogin} style={{ marginTop: 20 }} disabled={loading} />
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15, justifyContent: "center" }}>
              <Text size="md">Don't have an account?</Text>
              <TouchableOpacity onPress={() => { navigation.navigate("Register"); }}>
                <Text size="md" fontWeight="bold" style={{ marginLeft: 5, color: 'blue' }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10, justifyContent: "center" }}>
              <TouchableOpacity onPress={() => { navigation.navigate("ForgetPassword"); }}>
                <Text size="md" fontWeight="bold" style={{ color: "red" }}>Forget password</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 30, justifyContent: "center" }} />
          </View>
        </ScrollView>
      </Layout>
    </KeyboardAvoidingView>
  );
}
