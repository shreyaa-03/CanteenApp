import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { BASE_URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from "../../../store/Slices/cartSlice";
import * as Icon from "react-native-feather";
import { LinearGradient } from "expo-linear-gradient";

const SearchResults = ({
  searchResults,
  closeSearchModal,
  updateSearchHistory,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);

  const handleAddToCartPress = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    if (existingItem) {
      dispatch(
        updateCartQuantity({
          itemId: item._id,
          quantity: existingItem.quantity + 1,
        })
      );
    } else {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }

    updateSearchHistory(item);
    // closeSearchModal();
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem._id === itemId);
    if (item) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
    } else if (item && item.quantity === 1) {
      dispatch(removeFromCart({ itemId }));
    }
  };

  const renderItem = ({ item }) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );

    return (
      <View
        className="bg-white p-4 mt-2 rounded-lg shadow flex-row justify-between items-center"
        style={{ flexDirection: "row", marginVertical: 8 }}
      >
        <View className="flex-row items-center">
          <Image
            source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
            className="w-16 h-16 rounded-lg mr-3"
            style={{ resizeMode: "contain" }}
          />
          <View>
            <Text
              style={{
                fontFamily: FontFamily.poppinsMedium,
                fontSize: FontSize.size_md,
              }}
            >
              {item.itemName}
            </Text>
            <Text
              style={{
                fontFamily: FontFamily.poppinsRegular,
                fontSize: FontSize.size_sm,
                color: "#888",
              }}
            >
              ${item.itemPrice}
            </Text>
          </View>
        </View>
        {existingItem ? (
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity
              onPress={() => handleDecrement(item._id)}
              className="p-2 bg-gray-200 rounded-full"
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon.Minus width={16} height={16} stroke="black" />
            </TouchableOpacity>
            <Text>{existingItem.quantity}</Text>
            <TouchableOpacity
              onPress={() => handleIncrement(item._id)}
              className="p-2 bg-gray-200 rounded-full"
              style={{
                width: 30,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon.Plus width={16} height={16} stroke="black" />
            </TouchableOpacity>
          </View>
        ) : (
          <LinearGradient
            colors={["#007022", "#54d17a", "#bcffd0"]}
            start={{ x: 0, y: 1 }}
            end={{ x: 1.9, y: 0 }}
            className="rounded-md"
            style={{ paddingHorizontal: 10, paddingVertical: 5 }}
          >
            <TouchableOpacity
              onPress={() => handleAddToCartPress(item)}
              className="flex-row items-center justify-center"
              style={{ borderRadius: 5 }}
            >
              <Icon.ShoppingBag width={15} height={15} stroke="white" />
              <Text
                className="text-white ml-2"
                style={{
                  fontFamily: FontFamily.poppinsMedium,
                  fontSize: FontSize.size_xs,
                }}
              >
                Add to Cart
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </View>
    );
  };

  return (
    <View className="flex-1">
      {searchResults.length === 0 ? (
        <Text
          style={{
            fontFamily: FontFamily.poppinsRegular,
            fontSize: FontSize.size_md,
            color: "#888",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No items found
        </Text>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()}
          contentContainerStyle={{ paddingBottom: 10 }}
        />
      )}
    </View>
  );
};

export default SearchResults;
