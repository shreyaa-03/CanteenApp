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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import * as IconF from "react-native-feather";
import Ionicons from "react-native-vector-icons/Ionicons";

const LogIn = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");

  // Dummy navigation for continue button
  const handleLogin = () => {
    navigation.navigate("CreateAccount");
  };

  // Navigation to "Forgot Password" screen
  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  // Navigation to "Sign up" screen
  const handleSignUp = () => {
    navigation.navigate("CreateAccount");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Avoid scrolling when keyboard appears
      style={{ flex: 1 }}
    >
      <View className="flex-1 bg-[#F4F5F9]">
        <StatusBar translucent backgroundColor="transparent" />
        <View className="absolute top-0 left-0 right-0 bottom-0">
          <Image
            source={require("../../assets/images/signIn/signIn.png")}
            style={{ resizeMode: "cover", height: "100%", width: "100%" }}
          />
        </View>
        <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6 space-y-2">
          <View>
            <Text
              style={{
                fontFamily: FontFamily.poppinsBold,
                fontSize: FontSize.textRegularLowercase_size,
              }}
              className='text-xl'
            >
              Welcome back!
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.poppinsMedium,
                fontSize: FontSize.size_mini,
              }}
              className="text-[#868889] mt-[-4]"
            >
              Log in or Sign up{" "}
            </Text>
          </View>

          {/* Faculty Login Option */}
          <View className="space-y-2">
            <View style={styles.inputContainer} className="space-x-2">
              <View
                className="text-green-700"
                style={{
                  fontFamily: FontFamily.poppinsRegular,
                  fontSize: FontSize.size_mini,
                  fontWeight: 600,
                }}
              >
                <IconF.Mail width={20} height={20} stroke="gray" />
              </View>
              <TextInput
                placeholder="Enter mail"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={{
                  fontFamily: FontFamily.poppinsRegular,
                  fontSize: FontSize.size_mini,
                }}
                className="flex-1"
              />
            </View>

            <View style={styles.inputContainer} className="space-x-2">
              <View
                className="text-green-700"
                style={{
                  fontFamily: FontFamily.poppinsRegular,
                  fontSize: FontSize.size_mini,
                  fontWeight: 600,
                }}
              >
                <IconF.Lock width={20} height={20} stroke="gray" />
              </View>
              <TextInput
                placeholder="Password"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={{
                  fontFamily: FontFamily.poppinsRegular,
                  fontSize: FontSize.size_mini,
                }}
                className="flex-1"
              />
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
                color: '#0070FF', // Blue color
                textAlign: 'right',
              }}
            >
              Forgot password?
            </Text>
          </TouchableOpacity>

          {/* Continue Button */}
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-xl"
          >
            <Pressable
              className="p-3 justify-center items-center"
              onPress={handleLogin}
            >
              <Text
                className="text-white"
                style={{
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: FontSize.size_lg,
                }}
              >
                Continue
              </Text>
            </Pressable>
          </LinearGradient>

          {/* Sign Up Option */}
          <View style={styles.signUpContainer}>
            <Text
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_mini,
                color: '#868889',
              }}
            >
              Don’t have an account?{" "}
            </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text
                style={{
                  fontFamily: FontFamily.poppinsSemiBold,
                  fontSize: FontSize.size_mini,
                  color: '#0070FF', // Blue color
                }}
              >
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
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
