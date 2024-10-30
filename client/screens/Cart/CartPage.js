import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StatusBar,
  Pressable,
  Modal,
  PanResponder,
  Animated,
  Dimensions,
  ScrollView,
  Platform,
  TextInput,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartQuantity,
  clearCart,
  addToCart,
} from "../../store/Slices/cartSlice";
import * as Icon from "react-native-feather";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BASE_URL } from "../../constants/constant";
import {
  saveCartToStorage,
  loadCartFromStorage,
} from "../../utils/storageUtils";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalHeader from "../../components/Layout/GlobalHeader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import io from "socket.io-client";

const socket = io(BASE_URL); 

const { width } = Dimensions.get("window");

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); // For offers modal
  const [sliderValue] = useState(new Animated.Value(0)); // Animation value for the slider
  const modalizeRef = useRef(null); // Reference to the modalize component
  const [deliveryType, setDeliveryType] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(""); // For room number
  const [selectedCanteen, setSelectedCanteen] = useState("Canteen 1"); 

  const handleChangeDelivery = () => {
    modalizeRef.current?.open(); // Open the modal
  };

  const closeModal = () => {
    modalizeRef.current?.close(); // Close the modal
  };

  const handleConfirmDelivery = () => {
    // Implement any logic needed to save room and canteen changes
    closeModal(); // Close the modal after confirmation
  };

  // Example values for taxes, delivery charges, offers, and tips
  const deliveryCharge = 50; // Example delivery charge
  const offerDiscount = 63; // Example discount (Cashback)
  const taxes = 25.25; // Example taxes
  const donation = 5; // Example donation

  const totalItems = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const totalBill = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.itemPrice * item.quantity,
        0
      ),
    [cartItems]
  );

  const finalTotal = useMemo(
    () => totalBill + deliveryCharge + taxes + donation - offerDiscount,
    [totalBill]
  );

  const handlePayment = () => {
    navigation.navigate("PaymentOption");
  };
  useEffect(() => {
    // Load cart data when the component mounts
    const loadCart = async () => {
      const savedCart = await loadCartFromStorage();

      // Ensure items are only added to the cart if they are not already present
      savedCart.forEach((item) => {
        const itemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
        if (!itemInCart) {
          dispatch(addToCart(item));
        }
      });
    };

    loadCart();
  }, [dispatch, cartItems]); 
  
  const handlePlaceOrder = async () => {
    try {
      // Retrieve necessary data from AsyncStorage
      const userId = await AsyncStorage.getItem("userId");
      const canteenName = "Engineering Canteen";
      const totalBill = cartItems.reduce(
        (sum, item) => sum + item.itemPrice * item.quantity,
        0
      ); // Calculate total bill

      const totalAmount = finalTotal.toFixed(2);
      // Prepare data for each cart item
      const orderData = cartItems.map((item) => ({
        itemId: item._id,
        itemName: item.itemName,
        itemQuantity: item.quantity,
      }));

      const payload = {
        userId,
        canteenName,
        totalAmount,
        items: orderData,
        payment: 1,
        status: "Pending",
      };
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch(`${BASE_URL}/user/order/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Navigate to payment service
        navigation.navigate("PaymentService");

        // Clear the cart
        dispatch(clearCart()); // Clear Redux cart state
        saveCartToStorage([]); // Clear cart from AsyncStorage

        Alert.alert("Order Placed", `Your total is ₹${totalAmount}`);
      } else {
        throw new Error("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      Alert.alert(
        "Order Failed",
        error.message || "Something went wrong. Please try again."
      );
    }
  };

  const [itemOnlineStatus, setItemOnlineStatus] = useState({});

  // useEffect(() => {
  //   // Initialize online status based on fetched items
  //   const initialStatus = {};
  //   cartItems.forEach(item => {
  //     initialStatus[item._id] = item.isOnline; // Assuming item has isOnline property
  //   });
  //   setItemOnlineStatus(initialStatus);

  //   // Listen for changes in the item's online status
  //   socket.on("foodItemOnline", (updatedItem) => {
  //     setItemOnlineStatus((prevStatus) => ({
  //       ...prevStatus,
  //       [updatedItem._id]: true, // Set item as online
  //     }));
  //   });

  //   socket.on("foodItemOffline", (updatedItem) => {
  //     setItemOnlineStatus((prevStatus) => ({
  //       ...prevStatus,
  //       [updatedItem._id]: false, // Set item as offline
  //     }));
      
  //     // Automatically remove the item from the cart if it goes offline
  //     const itemInCart = cartItems.find(item => item._id === updatedItem._id);
  //     if (itemInCart) {
  //       dispatch(removeFromCart({ itemId: updatedItem._id }));
  //       Alert.alert("Item Unavailable", `${itemInCart.itemName} is now offline and has been removed from your cart.`);
  //     }
  //   });

  //   // Clean up listeners on unmount
  //   return () => {
  //     socket.off("foodItemOnline");
  //     socket.off("foodItemOffline");
  //   };
  // }, [cartItems, dispatch, socket]);


  // PanResponder to handle slider movement
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 0 && gestureState.dx < width - 100) {
        // Restrict movement within bounds
        sliderValue.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      const threshold = width - 120; // Adjust threshold as needed
      if (gestureState.dx > threshold) {
        // If slider moved sufficiently
        Animated.timing(sliderValue, {
          toValue: width - 100, // Move to the end
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          handlePlaceOrder();
          resetSlider();
        });
      } else {
        Animated.spring(sliderValue, {
          toValue: 0,
          useNativeDriver: false,
          friction: 5,
        }).start();
      }
    },
  });

  const resetSlider = () => {
    Animated.timing(sliderValue, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleRemoveFromCart = (itemId) => {
    dispatch(removeFromCart({ itemId }));
  };

  const handleIncrement = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (item && item.quantity > 1) {
      dispatch(updateCartQuantity({ itemId, quantity: item.quantity - 1 }));
    }
  };

  
  const { top } = useSafeAreaInsets();

  const renderCartItem = ({ item }) => (
    <View className="flex-row items-center space-x-2 my-1 p-3 bg-white rounded-lg">
      <Image
        source={{ uri: `${BASE_URL}/items_uploads/${item.image}` }}
        style={{ width: 60, height: 60, borderRadius: 8 }}
      />
      <View className="flex-1">
        <Text className="font-semibold text-lg">{item.itemName}</Text>
        <Text className="text-gray-500">₹{item.itemPrice}</Text>
        {/* {!itemOnlineStatus[item._id] && (
          <Text className="text-red-500 font-semibold">Not Available</Text>
        )} */}
      </View>
      <View className="flex-row items-center space-x-2 h-8">
        <View className="flex-row items-center space-x-2 bg-gray-200 rounded-md">
          <TouchableOpacity
            onPress={() => handleDecrement(item._id)}
            disabled={!itemOnlineStatus[item._id]}
            className="p-2"
          >
            <Icon.Minus width={16} height={16} stroke="green" strokeWidth="3" />
          </TouchableOpacity>
          <View className="w-3.5 items-center justify-center">
            <Text adjustsFontSizeToFit numberOfLines={1} className="font-bold">
              {item.quantity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleIncrement(item._id)}
            disabled={!itemOnlineStatus[item._id]}
            className="p-2"
          >
            <Icon.Plus width={16} height={16} stroke="green" strokeWidth="3" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => handleRemoveFromCart(item._id)}
          className="bg-red-200 p-2 rounded-md justify-center items-center"
        >
          <Icon.Trash2 color={"red"} height={16} width={16} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      className="flex-1 bg-white"
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? top : 0,
      }}
    >
      {/* Status bar with white background */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={false}
      />

      {/* Header */}
      <View className="bg-white px-4 py-3">
        <GlobalHeader title="Food Cart" />
      </View>

      {cartItems.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-center text-lg font-semibold">
            Your cart is empty
          </Text>
        </View>
      ) : (
        <View className="flex-1 bg-gray-100">
          <ScrollView
            className="flex-1 px-4"
            contentContainerStyle={{ paddingBottom: 170 }}
            showsVerticalScrollIndicator={false}
          >
            <FlatList
              data={cartItems}
              keyExtractor={(item) => item._id}
              renderItem={renderCartItem}
              className="my-2"
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />

            {/* Offers section */}
            <View className="bg-white p-3 rounded-lg shadow-md mb-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">Offers</Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                  <Text className="text-green-600">View offers</Text>
                </TouchableOpacity>
              </View>
              {/* Highlighted Applied Cashback */}
              <Text className="text-gray-500 mt-2 bg-green-100 p-2 rounded-lg">
                ₹{offerDiscount} Cashback applied!
              </Text>
            </View>

            {/* Tip section */}
            <View className="bg-white p-3 rounded-lg shadow-md mb-2">
              <Text className="text-lg font-semibold">
                Please tip your delivery partner
              </Text>
              <View className="flex-row justify-start space-x-4 mt-3">
                <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
                  <Text>₹50</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
                  <Text>₹70</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
                  <Text>₹100</Text>
                </TouchableOpacity>
                <TouchableOpacity className="px-4 py-2 bg-gray-200 rounded-md">
                  <Text>Other</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Billing Details */}
            <View className="bg-white p-3 rounded-lg shadow-md mb-2">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold">
                  Item Total ({totalItems} items)
                </Text>
                <Text>₹{totalBill.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Delivery Charge</Text>
                <Text>₹{deliveryCharge}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Taxes & charges</Text>
                <Text>₹{taxes.toFixed(2)}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="text-gray-500">Donate ₹5 to charity</Text>
                <Text>₹{donation}</Text>
              </View>
              <View className="flex-row justify-between mt-1">
                <Text className="font-semibold">Grand Total</Text>
                <Text className="font-semibold">
                  ₹{finalTotal.toFixed(2)}
                </Text>
              </View>
            </View>

            {/* Payment method */}
            <TouchableOpacity
              onPress={handlePayment}
              className="bg-white p-3 rounded-lg shadow-md mb-2 flex-row justify-between"
            >
              <View>
                <Text className="text-lg font-semibold">Payment Method</Text>
                <Text className="text-gray-500 mt-1">UPI (Default)</Text>
              </View>
              <Icon.ChevronRight width={24} height={24} stroke="gray" />
            </TouchableOpacity>
          </ScrollView>

          {/* Bottom Bar */}
          <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
            {/* Delivery Information Section */}
            <View className="flex-row justify-between items-center mb-4">
              <View className="flex-1">
                {/* Deliver To Section */}
                <View className="flex-row items-center space-x-2 mb-2">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color="#4CAF50"
                    />
                    <Text className="ml-2 text-base font-semibold text-black">
                      Delivering to
                    </Text>
                  </View>
                  <Text className="text-sm font-medium text-gray-500">
                    B-203
                  </Text>
                </View>

                {/* From Section */}
                <View className="flex-row items-center space-x-2">
                  <View className="flex-row items-center">
                    <Ionicons
                      name="restaurant-outline"
                      size={20}
                      color="#4CAF50"
                    />
                    <Text className="ml-2 text-base font-semibold text-black">
                      From
                    </Text>
                  </View>
                  <Text className="text-sm font-medium text-gray-500">
                    {selectedCanteen}
                  </Text>
                </View>
              </View>

              {/* Change Button */}
              <TouchableOpacity
                onPress={handleChangeDelivery}
                className="flex-row items-center"
              >
                <Icon.ChevronDown
                  width={16}
                  height={16}
                  stroke="green"
                  strokeWidth="3"
                />
                <Text className="text-green-600 font-semibold ml-1">
                  Change
                </Text>
              </TouchableOpacity>
            </View>

            {/* Slide to Pay */}
            <View>
              <View style={{ alignItems: "center" }}>
                <LinearGradient
                  colors={["green", "green"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: width - 32,
                    height: 60,
                    borderRadius: 99,
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ textAlign: "center", color: "white", fontSize: 16 }}
                  >
                    Slide to Pay
                  </Text>
                  <Animated.View
                    {...panResponder.panHandlers}
                    style={{
                      position: "absolute",
                      left: sliderValue,
                      marginLeft: 7,
                      width: 50,
                      height: 50,
                      borderRadius: 99,
                      backgroundColor: "white",
                      justifyContent: "center",
                      alignItems: "center",
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.3,
                      shadowRadius: 2,
                      elevation: 5,
                    }}
                  >
                    <Icon.ArrowRight width={24} height={24} stroke="green" />
                  </Animated.View>
                </LinearGradient>
              </View>
            </View>
          </View>

          {/* Change Delivery Details Modal */}
          <GestureHandlerRootView className='flex'>
            <Modalize
              ref={modalizeRef}
              modalHeight={500}
              handleStyle={{backgroundColor:'#D3D3D3'}}
              onClose={() => setDeliveryType(null)}
              handlePosition="outside"
            >
              <View className="p-4 flex-1">
                {/* Close Icon */}
                <TouchableOpacity
                  onPress={closeModal}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 10,
                  }}
                >
                  <Ionicons name="close-circle" size={30} color="gray" />
                </TouchableOpacity>

                <Text className="text-xl font-bold mb-4">
                  Choose Service Type
                </Text>

                {/* Service Type and Canteen Selection */}
                <View>
                  <Text className="text-lg mb-2">Select Service Type:</Text>

                  <TouchableOpacity
                    onPress={() => setDeliveryType("Pickup")}
                    className={`p-2 mb-2 rounded-lg border ${
                      deliveryType === "Pickup"
                        ? "bg-green-100 border-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    <Text className="text-lg">Pickup</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setDeliveryType("Table Service")}
                    className={`p-2 mb-2 rounded-lg border ${
                      deliveryType === "Table Service"
                        ? "bg-green-100 border-green-600"
                        : "border-gray-300"
                    }`}
                  >
                    <Text className="text-lg">Table Service</Text>
                  </TouchableOpacity>

                  {/* Canteen Selection */}
                  <Text className="text-lg mb-2 mt-4">Select Canteen:</Text>
                  {["Canteen 1", "Canteen 2", "Canteen 3"].map((canteen) => (
                    <TouchableOpacity
                      key={canteen}
                      onPress={() => setSelectedCanteen(canteen)}
                      className={`p-2 mb-2 rounded-lg border ${
                        selectedCanteen === canteen
                          ? "bg-green-100 border-green-600"
                          : "border-gray-300"
                      }`}
                    >
                      <Text className="text-lg">{canteen}</Text>
                    </TouchableOpacity>
                  ))}

                  {/* If "Table Service" is selected, show Room Number input */}
                  {deliveryType === "Table Service" && (
                    <>
                      <Text className="text-lg mb-2 mt-4">
                        Enter Room Number:
                      </Text>
                      <TextInput
                        value={selectedRoom}
                        onChangeText={setSelectedRoom}
                        className="border p-2 mb-4 rounded-lg"
                        placeholder="Enter Room Number"
                        keyboardType="numeric"
                      />
                    </>
                  )}

                  {/* Confirm Button */}
                  {deliveryType && (
                    <TouchableOpacity
                      onPress={handleConfirmDelivery}
                      className="bg-green-500 p-3 rounded-lg mt-4"
                    >
                      <Text className="text-white text-center text-lg font-bold">
                        Confirm
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </Modalize>
          </GestureHandlerRootView>

          {/* Modal for Offers */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
              <View className="bg-white p-4 rounded-lg w-3/4">
                <Text className="text-lg font-bold mb-2">Available Offers</Text>

                <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
                  <Text>
                    Bank Offer: Get 10% Cashback on XYZ Bank Cards
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
                  <Text>UPI Offer: ₹50 Cashback on UPI payments</Text>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2 p-2 bg-gray-200 rounded-lg">
                  <Text>Coupon: Use "SAVE50" to get ₹50 off</Text>
                </TouchableOpacity>

                <Pressable
                  className="mt-4 p-2 bg-green-600 rounded-lg"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-white text-center">Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default CartPage;
