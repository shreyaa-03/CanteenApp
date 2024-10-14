import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { BASE_URL } from "../../constants/constant";
import * as Icon from "react-native-feather";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const userId = await AsyncStorage.getItem("userId");

        if (!token || !userId) {
          Alert.alert("Error", "User is not authenticated");
          return;
        }

        const response = await fetch(`${BASE_URL}/user/order/${userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch order history");
        }
        const sortedOrders = data.orders?.sort(
          (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
        );
        setOrderHistory(sortedOrders || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
        Alert.alert(
          "Error",
          error.message || "Something went wrong. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  const renderOrderItem = ({ item }) => {
    const orderDate = new Date(item.orderPlacedAt);
    const formattedDate = orderDate.toLocaleDateString();
    const formattedTime = orderDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <View className="bg-white p-4 rounded-lg mb-4">
        <Text className="font-bold text-lg mb-2">Order Details</Text>
        <Text className="text-gray-500 mb-2">Canteen: {item.canteenName}</Text>
        <Text className="text-gray-500 mb-2">
          Ordered On: {formattedDate} at {formattedTime}
        </Text>
        <Text className="font-bold mb-2">Items:</Text>
        
        {/* Loop through all items in the order */}
        {item.items.map((orderItem) => (
          <View
            key={orderItem.itemId}
            className="flex-row items-center justify-between mb-2"
          >
            {/* Display item image if available */}
            {orderItem.itemImage && (
              <Image
                source={{ uri: `${BASE_URL}/items_uploads/${orderItem.itemImage}` }}
                style={{ width: 50, height: 50, borderRadius: 8 }}
              />
            )}
            <View className="flex-1 ml-4">
              {/* Display item name */}
              <Text className="font-semibold">{orderItem.itemName}</Text>
              <Text className="text-gray-500">Quantity: {orderItem.itemQuantity}</Text>
            </View>
          </View>
        ))}
        
        <Text className="text-gray-500 mt-2">Total: ${item.totalAmount}</Text>
        <Text className={`mt-2 ${item.status === 'Delivered' ? 'text-green-600' : 'text-gray-500'}`}>
          Status: {item.status}
        </Text>
      </View>
    );
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Back Button */}
      <View className="flex-row items-center mb-4">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="p-2 bg-gray-200 rounded-full"
        >
          <Icon.ChevronLeft width={24} height={24} stroke="black" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-semibold">Order History</Text>
      </View>

      {orderHistory.length === 0 ? (
        <Text className="text-center text-lg font-semibold">
          No orders found
        </Text>
      ) : (
        <FlatList
          data={orderHistory}
          keyExtractor={(item) => item._id}
          renderItem={renderOrderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default OrderHistoryPage;