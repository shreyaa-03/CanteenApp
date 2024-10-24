import React, { useState } from "react";
import {
    StatusBar, Pressable, Text, View, Image, KeyboardAvoidingView,
    Platform, StyleSheet, TextInput, TouchableOpacity,
    SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import * as IconF from "react-native-feather";
import Ionicons from "react-native-vector-icons/Ionicons";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { BASE_URL } from "../../constants/constant";

const CreateAccount = () => {
    const navigation = useNavigation();
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", password: "" });
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const handleInputChange = (field, value) => {
        const updatedValue = field === "email" ? value.toLowerCase() : value;
        setFormData({ ...formData, [field]: value })};
    const togglePasswordVisibility = () => setIsPasswordHidden(!isPasswordHidden);

    const renderIcon = (iconName) => {
        const Icon = IconF[iconName];
        return <Icon width={20} height={20} stroke="gray" />;
    };

    const inputFields = [
        { icon: "User", placeholder: "Name", field: "name", keyboardType: "default" },
        { icon: "Phone", placeholder: "Phone number", field: "phone", keyboardType: "phone-pad" },
        { icon: "Mail", placeholder: "Enter email", field: "email", keyboardType: "email-address" },
        { icon: "Lock", placeholder: "Password", field: "password", keyboardType: "default", isPassword: true }
    ];


    const { top, bottom } = useSafeAreaInsets();

    const handleSubmit = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/faculty/register`, formData);
          // Handle success, e.g., navigate to the OTP screen
          console.log(response.data);
          navigation.navigate("Otp", { email: formData.email });

        } catch (error) {
          // Handle error
          console.error(error.response ? error.response.data : error.message);
        }
      };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
            <SafeAreaView style={{
                flex: 1,
                paddingTop: Platform.OS === "ios" ? 0 : StatusBar.currentHeight,
                paddingBottom: Platform.OS === "ios" ? 0 : bottom,
            }} className="flex-1 bg-[#F4F5F9]">
                <StatusBar translucent backgroundColor="transparent" />
                <View className="bg-transparent px-4 py-3 z-[100]">
                    <GlobalHeader title="Create account" backgroundColor={'transparent'} textColor={'text-white'} iconColor={'white'} />
                </View>
                <View className="absolute top-0 left-0 right-0 bottom-0">
                    <Image source={require("../../assets/images/signIn/signIn.png")} style={styles.backgroundImage} />
                </View>
                <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6">
                    <View className='space-y-2'>
                        <View>
                            <Text style={styles.headerText} className='text-xl'>Create Account</Text>
                            {/* <Text style={styles.subHeaderText} className="text-[#868889] mt-[-4]">Quickly create </Text> */}
                        </View>

                        <View className="space-y-2">
                            {inputFields.map(({ icon, placeholder, field, keyboardType, isPassword }) => (
                                <View key={field} style={styles.inputContainer} className="space-x-2">
                                    {renderIcon(icon)}
                                    <TextInput
                                        placeholder={placeholder}
                                        value={formData[field]}
                                        onChangeText={(value) => handleInputChange(field, value)}
                                        keyboardType={keyboardType}
                                        secureTextEntry={isPassword && isPasswordHidden}
                                        style={styles.inputText}
                                        className="flex-1"
                                    />
                                    {isPassword && (
                                        <TouchableOpacity onPress={togglePasswordVisibility}>
                                            <Ionicons name={isPasswordHidden ? "eye-off" : "eye"} size={20} color="gray" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            ))}
                        </View>
                    </View>

                    <View className='mt-4 space-y-1'>
                        <LinearGradient colors={["#007022", "#54d17a", "#bcffd0"]} start={{ x: 0, y: 1 }} end={{ x: 1.9, y: 0 }} className="rounded-xl">
                            <Pressable className="p-3 justify-center items-center" onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Continue</Text>
                            </Pressable>
                        </LinearGradient>

                        <View style={styles.signUpContainer}>
                            <Text style={styles.signUpText}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
                                <Text style={[styles.signUpText, { fontFamily: FontFamily.poppinsSemiBold, color: '#0070FF' }]}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        resizeMode: "cover",
        height: "100%",
        width: "100%"
    },
    headerText: {
        fontFamily: FontFamily.poppinsBold,
        fontSize: FontSize.textRegularLowercase_size,
    },
    subHeaderText: {
        fontFamily: FontFamily.poppinsMedium,
        fontSize: FontSize.size_mini,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 8,
    },
    inputText: {
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_mini,
    },
    buttonText: {
        fontFamily: FontFamily.poppinsSemiBold,
        fontSize: FontSize.size_lg,
        color: 'white',
    },
    signUpContainer: {
        flexDirection: "row",
        justifyContent: "center",
    },
    signUpText: {
        fontFamily: FontFamily.poppinsRegular,
        fontSize: FontSize.size_mini,
        color: '#868889',
    },
});

export default CreateAccount;