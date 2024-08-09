import React from "react";
import { View, Text, Image, Pressable, TouchableOpacity } from "react-native";
import { FontFamily, FontSize } from "../../GlobalStyles";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FoodCard = ({ foodItem }) => {
  const navigation = useNavigation();
  const handleAdd = () => {
    navigation.navigate("FoodItem");
  };
  return (
    <View className="flex-1 ">
      <View className="bg-white rounded-lg p-2 w-full items-center space-y-1">
        <View className="w-full h-20 rounded-lg bg-green-400"></View>
        <Text
          style={{
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_mini,
          }}
          className="text-green-600"
        >
          ${foodItem.itemPrice}
        </Text>
        <Text
          style={{
            fontFamily: FontFamily.poppinsMedium,
            fontSize: FontSize.size_mini,
          }}
          className=""
        >
          {foodItem.itemName}
        </Text>
        <LinearGradient
          colors={["#007022", "#54d17a", "#bcffd0"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1.9, y: 0 }}
          className="rounded-md w-full"
        >
          <TouchableOpacity
            onPress={handleAdd}
            className="py-1 justify-center items-center flex-row space-x-1"
          >
            <View
              className="justify-center items-center"
              style={{
                height: FontSize.size_mini * 1.3,
                marginBottom: Platform.OS === "android" ? 2 : 0,
              }}
            >
              <Icon.ShoppingBag width={15} height={15} stroke="white" />
            </View>
            <Text
              className="text-white"
              style={{
                fontFamily: FontFamily.poppinsMedium,
                fontSize: FontSize.size_mini,
              }}
            >
              Add to cart
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
      <Text
        className="text-white"
        style={{
          fontFamily: FontFamily.poppinsMedium,
          fontSize: FontSize.size_mini,
        }}
      >
        Add to cart
      </Text>
    </View>
  );
};

export default FoodCard;
