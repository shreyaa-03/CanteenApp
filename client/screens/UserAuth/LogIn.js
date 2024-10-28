import React, { useState } from "react";
import {
  StatusBar,
  Pressable,
  Text,
  View,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import * as IconF from "react-native-feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    setErrorMessage(''); // Clear previous errors

   // Email and Password Validation
if (!email) {
  setErrorMessage("Please enter email");
  setIsLoading(false);
  return;
} else if (!email.includes("@")) {
  setErrorMessage("Please enter a valid email");
  setIsLoading(false);
  return;
} else if (!email.endsWith("@somaiya.edu") && email.includes("@")) {
  setErrorMessage("Only @somaiya.edu emails are allowed");
  setIsLoading(false);
  return;
} else if (!password) {
  setErrorMessage("Please enter password");
  setIsLoading(false);
  return;
}

    try {
      const response = await axios.post(`${BASE_URL}/user/login`, {
        email,
        password,
      });
      const data = response.data;

      if (response.status === 200) {
        const { token, data: userData, message } = data;

        if (message === "Admin account found. Please use OTP for login.") {
          navigation.navigate("Otp", { email, isAdmin: true });
          setIsLoading(false);
          return;
        }

        const { name, id, role } = userData;

        await AsyncStorage.setItem("userToken", token);
        await AsyncStorage.setItem("userName", name);
        await AsyncStorage.setItem("userId", id);
        await AsyncStorage.setItem("role", role);

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "ClientTabs" }],
          })
        );

        if (role === "user" || role === "faculty") {
          navigation.navigate("ClientTabs");
        }
        await postPushToken();
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.response?.data.message || "Login failed."); // Set error message here
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPw");
  };

  const handleSignUp = () => {
    navigation.navigate("CreateAccount");
  };

  const postPushToken = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      const pushToken = await getPushTokenFromDevice();

      const response = await axios.post(`${BASE_URL}/user/pushToken`, {
        userId,
        token: pushToken,
      });

      console.log("Push token posted successfully:", response.data);
    } catch (error) {
      console.error("Error posting push token to backend:", error);
    }
  };

  const getPushTokenFromDevice = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    return tokenData.data;
  };

  const { top, bottom } = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{
        flex: 1, backgroundColor: "#F4F5F9", paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
        paddingBottom: Platform.OS === "ios" ? 0 : bottom,
      }}>
        <StatusBar translucent backgroundColor="transparent" />
        <View className="bg-transparent px-4 py-3 z-[100]">
          <GlobalHeader title="Welcome" backgroundColor={'transparent'} textColor={'text-white'} iconColor={'white'} />
        </View>
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <Image
            source={require("../../assets/images/signIn/signIn.png")}
            style={{ resizeMode: "cover", height: "100%", width: "100%" }}
          />
        </View>
        <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6 space-y-2">
          <View>
            <Text style={{ fontFamily: FontFamily.poppinsBold, fontSize: FontSize.textRegularLowercase_size }} className="text-xl">
              Welcome back!
            </Text>
            <Text style={{ fontFamily: FontFamily.poppinsMedium, fontSize: FontSize.size_mini }} className="text-[#868889] mt-[-4]">
              Log in or Sign up
            </Text>
          </View>

          <View className="space-y-2">
            {/* Email Input */}
            <View style={styles.inputContainer} className='space-x-2'>
              <IconF.Mail width={20} height={20} stroke="gray" />
              <TextInput
                placeholder="Enter email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ fontFamily: FontFamily.poppinsRegular, fontSize: FontSize.size_mini, flex: 1 }}
              />
            </View>

            {/* Password Input with Eye Icon */}
            <View style={styles.inputContainer} className='space-x-2'>
              <IconF.Lock width={20} height={20} stroke="gray" />
              <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                style={{ fontFamily: FontFamily.poppinsRegular, fontSize: FontSize.size_mini, flex: 1 }}
              />
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="gray" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <Text style={{ color: 'red', fontSize: FontSize.size_mini, marginTop: 5, fontFamily: FontFamily.poppinsRegular }}>
              {errorMessage}
            </Text>
          ) : null}

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={{ fontFamily: FontFamily.poppinsRegular, fontSize: FontSize.size_mini, color: '#0070FF', textAlign: 'right' }}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Continue Button with Loading State */}
          <LinearGradient colors={["#007022", "#54d17a", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1.9, y: 0 }} className="rounded-xl">
            <Pressable className="p-3 justify-center items-center" onPress={handleLogin} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text className="text-white" style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_lg }}>
                  Login
                </Text>
              )}
            </Pressable>
          </LinearGradient>

          {/* Sign Up Option */}
          <View style={styles.signUpContainer}>
            <Text style={{ fontFamily: FontFamily.poppinsRegular, fontSize: FontSize.size_mini, color: '#868889' }}>
              Don’t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_mini, color: '#0070FF' }}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default LogIn;
