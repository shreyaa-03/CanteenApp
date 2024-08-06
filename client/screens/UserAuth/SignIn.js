// import React, { useState } from "react";
// import {
//   StatusBar,
//   Pressable,
//   Text,
//   View,
//   Image,
//   TextInput,
//   Alert,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { LinearGradient } from "expo-linear-gradient";
// import { FontFamily, FontSize } from "../../GlobalStyles";
// import * as Icon from "react-native-feather";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../store/Slices/userDetailSlice";

// const SignIn = () => {
//   const [phone, setPhone] = useState("");
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const loginStatus = useSelector((state) => state.users.loginStatus);
//   const loading = useSelector((state) => state.users.loading);
//   const error = useSelector((state) => state.users.error);

//   const handleLogin = async () => {
//     try {
//       await dispatch(loginUser({ phone })).unwrap();
//       Alert.alert("Success", "Logged in successfully");
//       navigation.navigate("SignUp"); // Navigate to SignUp on successful login
//     } catch (error) {
//       // console.error('Login Error:', error);
//       Alert.alert("Error", ` ${error}`);
//       // Failed to log in:
//     }
//   };

//   return (
//     <View className="flex-1 bg-[#F4F5F9]">
//       <StatusBar translucent backgroundColor="transparent" />
//       <View className="absolute top-0 left-0 right-0 bottom-0">
//         <Image
//           source={require("../../assets/images/signIn/signIn.png")}
//           style={{ resizeMode: "cover", height: "100%", width: "100%" }}
//         />
//       </View>
//       <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6 space-y-5">
//         <View>
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsBold,
//               fontSize: FontSize.textRegularLowercase_size,
//             }}
//           >
//             Welcome back!
//           </Text>
//           <Text
//             style={{
//               fontFamily: FontFamily.poppinsMedium,
//               fontSize: FontSize.size_mini,
//             }}
//             className="text-[#868889] mt-[-4]"
//           >
//             Log in or Sign up{" "}
//           </Text>
//         </View>
//         <View className="space-y-2">
//           <View className="flex-row items-center bg-[#FFFFFF] p-3 rounded-md">
//             <Icon.Phone height={20} width={20} stroke="gray" />

//             <TextInput
//               placeholder="+91"
//               value={phone}
//               onChangeText={setPhone}
//               // keyboardType='phone-pad'
//               className="flex-1 ml-3"
//             />
//           </View>
//         </View>
//         <LinearGradient
//           colors={["#007022", "#54d17a", "#bcffd0"]}
//           start={{ x: 0, y: 1 }}
//           end={{ x: 1.9, y: 0 }}
//           className="rounded-xl"
//         >
//           <Pressable
//             className="p-3 justify-center items-center"
//             onPress={handleLogin}
//           >
//             <Text
//               className="text-white"
//               style={{
//                 fontFamily: FontFamily.poppinsSemiBold,
//                 fontSize: FontSize.size_lg,
//               }}
//             >
//               {loading ? "Loading..." : "Continue"}
//             </Text>
//           </Pressable>
//         </LinearGradient>
//         {/* {error && console.error('Login Error:', error)}  */}
//       </View>
//     </View>
//   );
// };

// export default SignIn;


import React, { useState } from "react";
import {
  StatusBar,
  Pressable,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, FontSize } from "../../GlobalStyles";
import * as Icon from "react-native-feather";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/Slices/userDetailSlice";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const loginStatus = useSelector((state) => state.users.loginStatus);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  const handleLogin = async () => {
    try {
      await dispatch(loginUser({ phone: `+91${phone}` })).unwrap();
      Alert.alert("Success", "Logged in successfully");
      navigation.navigate("SignUp"); // Navigate to SignUp on successful login
    } catch (error) {
      console.error("Login Error:", error);
      Alert.alert("Error", `Failed to log in: ${error.message}`);
    }
  };

  return (
    <View className="flex-1 bg-[#F4F5F9]">
      <StatusBar translucent backgroundColor="transparent" />
      <View className="absolute top-0 left-0 right-0 bottom-0">
        <Image
          source={require("../../assets/images/signIn/signIn.png")}
          style={{ resizeMode: "cover", height: "100%", width: "100%" }}
        />
      </View>
      <View className="absolute bottom-0 w-full flex-1 bg-[#F4F5F9] rounded-t-2xl px-4 py-6 space-y-5">
        <View>
          <Text
            style={{
              fontFamily: FontFamily.poppinsBold,
              fontSize: FontSize.textRegularLowercase_size,
            }}
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
        <View className="space-y-2">
          <View style={styles.inputContainer}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              placeholder="Enter phone number"
              value={phone}
              onChangeText={setPhone}
            //   keyboardType="phone-pad"
              style={styles.textInput}
            />
          </View>
        </View>
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
              {loading ? "Loading..." : "Continue"}
            </Text>
          </Pressable>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    position: "relative",
  },
  prefix: {
    color: "#007022",
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.poppinsMedium,
    position: "absolute",
    left: 10,
  },
  textInput: {
    flex: 1,
    marginLeft: 35, // Space to accommodate the prefix
    fontSize: FontSize.size_mini,
  },
});

export default SignIn;