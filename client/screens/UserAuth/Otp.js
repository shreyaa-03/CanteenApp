import React, { useState, useRef } from "react";
import {
  Text,
  Pressable,
  TextInput,
  View,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  StatusBar as RNStatusBar,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";

const OTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  const route = useRoute();

  const phone = route.params?.phone;

  const handleChangeText = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    setFocusedIndex(index);

    if (text.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
        setFocusedIndex(index - 1);
      }
    }
  };

  const handleBackPress = () => {
    navigation.navigate("SignIn");
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "http://10.0.5.94:3000/user/verify/phone/otp",
        {
          phone: phone,
          otp: otp.join(""),
        }
      );

      if (response.status === 200) {
        // Alert.alert("Success", "OTP Verified Successfully");
        navigation.replace("Home");
      } else {
        Alert.alert("Error", "Invalid OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to verify OTP");
      console.error("Verification Error:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
      className="bg-[#ffffff]"
    >
      <RNStatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <View className="flex-1 items-center">
        <View className="w-[90%] space-y-10 mt-4">
          <TouchableOpacity
            onPress={handleBackPress}
            className="p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <View className="items-center">
            <Text className="text-3xl font-bold text-primary">
              OTP Verification
            </Text>
            <Text className="text-sm font-semibold text-gray-700 mt-2">
              Verification code sent to +91-{phone}
            </Text>
          </View>

          <View className="flex-row justify-center">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                value={digit}
                onChangeText={(text) => handleChangeText(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                className={`caret-transparent w-12 h-12 border rounded-md text-3xl font-bold text-gray-800 items-center text-center mx-2 ${
                  focusedIndex === index || digit
                    ? "border-orange-500"
                    : "border-chocolate-100"
                }`}
                maxLength={1}
                keyboardType="numeric"
                returnKeyType="next"
              />
            ))}
          </View>

          <View className="rounded-md">
            <LinearGradient
              colors={["#007022", "#54d17a", "#bcffd0"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1.9, y: 0 }}
              className="rounded-xl"
            >
              <Pressable
                onPress={handleVerify}
                className="p-3 justify-center items-center"
              >
                <Text
                  className="text-white"
                  style={{
                    fontFamily: FontFamily.poppinsSemiBold,
                    fontSize: FontSize.size_lg,
                  }}
                >
                  Verify
                </Text>
              </Pressable>
            </LinearGradient>

            <View className="flex-row justify-center mt-4">
              <Text className="text-gray-700 text-sm font-semibold">
                Didn’t receive a code?
              </Text>
              <TouchableOpacity>
                <Text className="text-orange-500 text-sm font-bold ml-1">
                  Resend
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTP;


