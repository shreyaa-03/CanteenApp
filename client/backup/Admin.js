//***** INVENTORY CODE */
// import React, { useState, useRef , useEffect} from 'react';
// import { View, Text, Switch, ScrollView, TouchableOpacity, Dimensions, Animated, Platform, StatusBar, TextInput } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import Icon from 'react-native-vector-icons/Ionicons';
// import * as IconF from 'react-native-feather';
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { BASE_URL } from '../../../../constants/constant';
// import { socket } from '../../../../services/socketService';

// const { width } = Dimensions.get('window');
// const paddingHorizontal = 16;
// const tabWidth = (width - paddingHorizontal * 2) / 2;
 

// const Category = ({ categoryName, items }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [CustomOpen, IsCustomOpen] = useState(false);
//   const [localItems, setLocalItems] = useState(items); // Local state for managing item toggles

//   const toggleCategory = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleToggle = async (itemId, currentStatus) => {
//     try {
//       const token = await AsyncStorage.getItem("userToken");

//       const response = await fetch(`${BASE_URL}/food-item/update`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           itemId,
//           isOnline: !currentStatus,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Update local state for the item toggle switch
//         setLocalItems((prevItems) =>
//           prevItems.map((item) =>
//             item._id === itemId ? { ...item, isOnline: !currentStatus } : item
//           )
//         );
//       } else {
//         console.error("Error updating status:", data.message);
//       }
//     } catch (error) {
//       console.error("Server error:", error);
//     }
//   };


//   useEffect(() => {
//     // Event listener for item going online
//     socket.on("foodItemOnline", (updatedItem) => {
//       setLocalItems((prevItems) =>
//         prevItems.map((item) =>
//           item._id === updatedItem._id ? { ...item, isOnline: true } : item
//         )
//       );
//     });

//     // Event listener for item going offline
//     socket.on("foodItemOffline", (updatedItem) => {
//       setLocalItems((prevItems) =>
//         prevItems.map((item) =>
//           item._id === updatedItem._id ? { ...item, isOnline: false } : item
//         )
//       );
//     });

//     return () => {
//       socket.off("foodItemOnline");
//       socket.off("foodItemOffline");
//     };
//   }, []);

//   // Toggle for custom open/close state
//   const handleCustomToggle = () => {
//     IsCustomOpen((prevState) => !prevState); // Toggle the custom state
//   };

//   return (
//     <View className="mb-4">
//       <TouchableOpacity
//         onPress={toggleCategory}
//         className="flex-row justify-between items-center py-2 px-4 bg-yellow-100 rounded-lg"
//       >
//         <View className="flex-row space-x-2 items-center">
//           <Icon name={isOpen ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#000" />
//           <Text className="font-semibold">{categoryName}</Text>
//         </View>

//         <Switch
//           value={CustomOpen}
//           onValueChange={handleCustomToggle} // Set the toggle handler
//           trackColor={{ false: "#767577", true: "#F59E0B" }}
//           thumbColor="white"
//         />
//       </TouchableOpacity>

//       {isOpen && (
//         <View className="bg-white">
//           {localItems.map((item, index) => (
//             <View key={index} className="flex-row justify-between items-center py-2 px-4 border-b border-gray-200">
//               <Text>{item.itemName}</Text>
//               <Switch
//                 value={item.isOnline} // Use local state for isOnline
//                 onValueChange={() => handleToggle(item._id, item.isOnline)}
//                 trackColor={{ false: "#767577", true: "#F59E0B" }}
//                 thumbColor="white"
//               />
//             </View>
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };



// const Inventory = () => {
//   const [activeTab, setActiveTab] = useState('All items');
//   const [searchQuery, setSearchQuery] = useState(''); // Search query state
//   const slideAnim = useRef(new Animated.Value(0)).current;
//   const { top } = useSafeAreaInsets();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const token = await AsyncStorage.getItem("userToken");
//         const response = await fetch(`${BASE_URL}/category/getAllWithFoodItems`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           setCategories(data.categories); 
//           setItems(data.categories.flatMap(category => category.foodItems));
//         } else {
//           setError(data.message || "Something went wrong");
//         }
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   if (loading) return <Text>Loading...</Text>;
//   if (error) return <Text>Error: {error}</Text>;

//   const filteredCategories = categories
//     .map((category) => {
//       const isCategoryMatch = category.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
//       const filteredItems = category.foodItems.filter((item) =>
//         item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
//       );

//       if (isCategoryMatch) {
//         return category; // Return full category if category name matches
//       } else if (filteredItems.length > 0) {
//         return { ...category, foodItems: filteredItems }; // Return filtered items if only items match
//       } else {
//         return null; // Exclude if neither category nor items match
//       }
//     })
//     .filter((category) => category !== null); // Remove null entries

//   const switchTab = (tab) => {
//     setActiveTab(tab);
//     Animated.timing(slideAnim, {
//       toValue: tab === 'All items' ? 0 : 1,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   return (
//     <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? top : StatusBar.currentHeight }} className="flex-1 bg-yellow-50">
//       <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
//       <View className="flex-1 pt-3 px-4 space-y-2">
//         {/* Header */}
//         <View className="flex-row items-center justify-between h-8">
//           <Text className="text-2xl font-bold">Inventory</Text>
//           <View className="flex-row items-center space-x-4">
//             <TouchableOpacity>
//               <IconF.Bell height={24} width={24} stroke="black" />
//               <View className="absolute -top-2 -right-2 bg-red-500 w-4 h-4 rounded-full justify-center items-center">
//                 <Text className="text-white text-xs">4</Text>
//               </View>
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <IconF.Search height={24} width={24} stroke="black" />
//             </TouchableOpacity>
//             <TouchableOpacity>
//               <IconF.Settings height={24} width={24} stroke="black" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Tabs */}
//         <View className="bg-yellow-100 relative rounded-lg overflow-hidden">
//           <Animated.View
//             className="absolute top-0 bottom-0 bg-white"
//             style={{
//               width: tabWidth,
//               left: slideAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [0, tabWidth],
//               }),
//             }}
//           />
//           <View className="flex-row">
//             <TouchableOpacity className="flex-1 items-center py-3" onPress={() => switchTab('All items')}>
//               <Text className={`font-semibold ${activeTab === 'All items' ? 'text-yellow-500' : 'text-gray-400'}`}>All items</Text>
//             </TouchableOpacity>
//             <TouchableOpacity className="flex-1 items-center py-3" onPress={() => switchTab('Add-ons')}>
//               <Text className={`font-semibold ${activeTab === 'Add-ons' ? 'text-yellow-500' : 'text-gray-400'}`}>Add-ons</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Search Bar */}
//         <View className="flex-row items-center space-x-2 mt-4 bg-white rounded-lg p-3 shadow">
//           <IconF.Search height={20} width={20} stroke="gray" />
//           <TextInput
//             placeholder="Search for items or categories"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//             className="flex-1 ml-2"
//           />
//         </View>

//         <View className="flex-row items-center">
//         <Icon name="list" size={16} color="black" />
//           <Text className="font-semibold text-lg ml-1">Items</Text>
//         </View>

//         {/* Inventory List */}
//         <ScrollView className="flex-1 mt-4" showsVerticalScrollIndicator={false}>
//           {filteredCategories.map((category, index) => (
//             <Category key={index} categoryName={category.categoryName} items={category.foodItems} 

//             />
//           ))}
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// export default Inventory;













// *** ADMINHOME *** //
// // AdminHome.js
// import React, { useState, useEffect, useRef, useCallback } from "react";
// import {
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   Image,
//   Dimensions,
//   Switch,
//   Platform,
//   ScrollView,
//   TextInput,
//   ActivityIndicator,
//   Alert,
//   StyleSheet,
// } from "react-native";
// import * as Icon from "react-native-feather";
// import { useNavigation } from "@react-navigation/native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { BASE_URL } from "../../../../constants/constant";
// import ContentLoader, { Rect } from "react-content-loader/native";
// import io from "socket.io-client";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { selectCanteenId } from "../../../../store/Slices/orderServiceSlice";
// import { useSelector, useDispatch } from "react-redux";
// import { clearCart } from "../../../../store/Slices/cartSlice";
// import { CommonActions } from "@react-navigation/native";
// import { logoutUser } from "../../../../api/userAuth";

// // Import Sub-components
// import Header from "../../../../components/Admin/Header/HeaderAdmin";
// import Tabs from "../../../../components/Admin/Tabs/Tabs";
// import SearchBar from "../../../../components/Admin/SearchBar/SearchBar";
// import OrderList from "../../../../components/Admin/OrderList/OrderList";
// import EmptyState from "../../../../components/Admin/EmptyState/EmptyState";

// const socket = io(BASE_URL);

// const AdminHome = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const { width: screenWidth } = Dimensions.get("window");
//   const { top } = useSafeAreaInsets();
//   const [isOnline, setIsOnline] = useState(false);
//   const canteenId = useSelector(selectCanteenId);
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [actionLoading, setActionLoading] = useState({});
//   const flatListRef = useRef(null);

//   const [orders, setOrders] = useState([]); // Preparing Orders
//   const [pendingOrders, setPendingOrders] = useState([]); // Pending Orders
//   const [readyOrders, setReadyOrders] = useState([]); // Ready Orders
//   const [pickedUpOrders, setPickedUpOrders] = useState([]); // Picked Up Orders
//   const [activeTab, setActiveTab] = useState("Pending"); // Active Tab

//   const [loading, setLoading] = useState(true); // Loading State
//   const [searchQuery, setSearchQuery] = useState(""); // Search Query State


//   useEffect(() => {
//     const simulateLoading = setTimeout(() => {
//       setLoading(false); // Simulate data load
//     }, 2000); // Replace with real fetch logic

//     return () => clearTimeout(simulateLoading);
//   }, []);

//   const FullScreenSkeleton = () => (
//     <View style={styles.skeletonContainer}>
//       {/* Header Skeleton */}
//       <ContentLoader
//         speed={2}
//         width={screenWidth}
//         height={60}
//         backgroundColor="#f3f3f3"
//         foregroundColor="#ecebeb"
//       >
//         <Rect x="10" y="15" rx="4" ry="4" width="150" height="30" />
//         <Rect x={screenWidth - 60} y="15" rx="15" ry="15" width="50" height="30" />
//       </ContentLoader>

//       {/* Tabs Skeleton */}
//       <ContentLoader
//         speed={2}
//         width={screenWidth}
//         height={50}
//         backgroundColor="#f3f3f3"
//         foregroundColor="#ecebeb"
//       >
//         <Rect x="10" y="15" rx="4" ry="4" width="80" height="20" />
//         <Rect x="100" y="15" rx="4" ry="4" width="80" height="20" />
//         <Rect x="190" y="15" rx="4" ry="4" width="80" height="20" />
//         <Rect x="280" y="15" rx="4" ry="4" width="80" height="20" />
//       </ContentLoader>

//       {/* Search Bar Skeleton */}
//       <ContentLoader
//         speed={2}
//         width={screenWidth}
//         height={50}
//         backgroundColor="#f3f3f3"
//         foregroundColor="#ecebeb"
//       >
//         <Rect x="10" y="10" rx="4" ry="4" width="95%" height="30" />
//       </ContentLoader>

//       {/* Orders Skeleton */}
//       {[1, 2, 3, 4].map((key) => (
//         <ContentLoader
//           key={key}
//           speed={2}
//           width={screenWidth}
//           height={100}
//           backgroundColor="#f3f3f3"
//           foregroundColor="#ecebeb"
//           style={{ marginBottom: 10 }}
//         >
//           <Rect x="10" y="15" rx="4" ry="4" width="90%" height="20" />
//           <Rect x="10" y="45" rx="4" ry="4" width="70%" height="20" />
//           <Rect x="10" y="75" rx="4" ry="4" width="50%" height="20" />
//         </ContentLoader>
//       ))}
//     </View>
//   );

//   const handleLogout = async () => {
//     await logoutUser(navigation, dispatch, () => { });
//   };

//   // Fetch Canteen Status
//   useEffect(() => {
//     const fetchCanteenData = async () => {
//       if (!canteenId) {
//         Alert.alert("Error", "Canteen ID not available.");
//         return;
//       }

//       try {
//         const responseStatus = await fetch(`${BASE_URL}/canteen/${canteenId}/status`);
//         if (!responseStatus.ok) {
//           throw new Error("Failed to fetch canteen status");
//         }

//         const dataStatus = await responseStatus.json();
//         setIsOnline(dataStatus.isOnline);
//       } catch (error) {
//         console.error("Failed to fetch canteen data:", error);
//       }
//     };

//     fetchCanteenData();
//   }, [canteenId]);


//   // Toggle Online Status
//   const toggleOnlineStatus = async () => {
//     if (!canteenId) return;

//     try {
//       const currentStatus = isOnline;
//       const newStatus = !currentStatus;

//       setIsOnline(newStatus);

//       const response = await fetch(`${BASE_URL}/canteen/${canteenId}/status`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ isOnline: newStatus }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update status");
//       }

//       const data = await response.json();
//       // Handle response if needed
//     } catch (error) {
//       console.error("Error updating status:", error);
//       setIsOnline(!isOnline); // Revert status if update fails
//     }
//   };

//   // Slides for Promo Banner (if any)
//   const slides = [
//     {
//       title: "Packaging as low as",
//       subtitle: "Up to 1500 credits on Hyperpure",
//       image: require("../../../../assets/images/admin/storeOpen.png"),
//     },
//     {
//       title: "Packaging as low as",
//       subtitle: "Up to 1500 credits on Hyperpure",
//       image: require("../../../../assets/images/home/coverFood.png"),
//     },
//   ];

//   // Slide Auto-Scroll
//   useEffect(() => {
//     const slideTimeout = setTimeout(() => {
//       setCurrentSlide((prev) => (prev + 1) % slides.length);
//     }, 3000);

//     return () => clearTimeout(slideTimeout);
//   }, [currentSlide, slides.length]);

//   useEffect(() => {
//     flatListRef.current?.scrollToIndex({ index: currentSlide, animated: true });
//   }, [currentSlide]);

//   const handleMomentumScrollEnd = useCallback(
//     (event) => {
//       const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
//       setCurrentSlide(index);
//     },
//     [screenWidth]
//   );

//   // Fetch Orders on Mount
//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true); // Set loading to true before fetching
//       try {
//         const adminToken = await AsyncStorage.getItem("userToken");
//         console.log(adminToken);
//         if (!adminToken) {
//           Alert.alert("Error", "Admin is not authenticated");
//           setLoading(false);
//           return;
//         }

//         const response = await fetch(`${BASE_URL}/admin/order/all`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${adminToken}`,
//           },
//         });

//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.message || "Failed to fetch orders");
//         }

//         const sortedOrders = data.orders.sort(
//           (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
//         );
//         setPendingOrders(sortedOrders.filter((order) => order.status === "Pending"));
//         setOrders(sortedOrders.filter((order) => order.status === "Preparing"));
//         setReadyOrders(sortedOrders.filter((order) => order.status === "Ready"));
//         setPickedUpOrders(sortedOrders.filter((order) => order.status === "Delivered"));
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//         Alert.alert("Error", error.message || "Something went wrong. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();

//     // Listen for new orders
//     socket.on("newOrder", (order) => {
//       setPendingOrders((prevOrders) => [order, ...prevOrders]);
//     });

//     return () => {
//       socket.off("newOrder");
//       socket.disconnect();
//     };
//   }, []);

//   // Listen for payment updates
//   useEffect(() => {
//     socket.on("paymentDone", (updatedOrder) => {
//       setPickedUpOrders((prevOrders) =>
//         prevOrders.map((order) =>
//           order._id === updatedOrder._id ? { ...order, payment: updatedOrder.payment } : order
//         )
//       );
//     });

//     return () => {
//       socket.off("paymentDone");
//     };
//   }, []);

//   // Update Order Status
//   const updateOrderStatus = async (id, status) => {
//     try {
//       // Ensure actionLoading is an object and update the loading state for the specific order
//       setActionLoading((prev) => ({ ...prev, [id]: true }));

//       const adminToken = await AsyncStorage.getItem("userToken");
//       if (!adminToken) {
//         Alert.alert("Error", "Admin is not authenticated");
//         setActionLoading((prev) => ({ ...prev, [id]: false }));
//         return;
//       }

//       const response = await fetch(`${BASE_URL}/admin/order/status/${id}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${adminToken}`,
//         },
//         body: JSON.stringify({ status }),
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to update order status");
//       }

//       // Handle specific status updates (e.g., moving order between tabs)
//       if (status === "Rejected") {
//         setPendingOrders((prevOrders) =>
//           prevOrders.filter((order) => order._id !== id)
//         );
//       } else if (status === "Preparing") {
//         handleAcceptOrder(id);
//       } else if (status === "Ready") {
//         handleOrderReady(id);
//       } else if (status === "Delivered") {
//         handlePickedUpOrder(id);
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//       Alert.alert(
//         "Error",
//         error.message || "Something went wrong. Please try again."
//       );
//     } finally {
//       // Reset the loading state for the specific order
//       setActionLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };



//   // Handle Accept Order
//   const handleAcceptOrder = (orderId) => {
//     const order = pendingOrders.find((order) => order._id === orderId);
//     if (order) {
//       setOrders((prev) =>
//         [...prev, order].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         )
//       );
//       setPendingOrders((prev) => prev.filter((order) => order._id !== orderId));
//     }
//   };

//   // Handle Reject Order
//   const handleRejectOrder = (orderId) => {
//     const order = pendingOrders.find((order) => order._id === orderId);
//     if (order) {
//       setOrders((prev) =>
//         [...prev, order].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         )
//       );
//       setPendingOrders((prev) => prev.filter((order) => order._id !== orderId));
//     }
//   };

//   // Handle Order Ready
//   const handleOrderReady = (orderId) => {
//     const order = orders.find((order) => order._id === orderId);
//     if (order) {
//       setReadyOrders((prev) =>
//         [...prev, order].sort(
//           (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//         )
//       );
//       setOrders((prev) => prev.filter((order) => order._id !== orderId));
//     }
//   };

//   // Handle Picked Up Order
//   const handlePickedUpOrder = (orderId) => {
//     const order = readyOrders.find((order) => order._id === orderId);
  
//     if (order) {
//       setPickedUpOrders((prev) => {
//         const isDuplicate = prev.some((existingOrder) => existingOrder._id === order._id);
//         if (!isDuplicate) {
//           // Include deliveredAt if it's set
//           const updatedOrder = { ...order, deliveredAt: new Date() };  // Adding deliveredAt time
//           const updatedOrders = [updatedOrder, ...prev];
//           updatedOrders.sort(
//             (a, b) => new Date(b.orderPlacedAt) - new Date(a.orderPlacedAt)
//           );
//           return updatedOrders;
//         }
//         return prev;
//       });
  
//       // Remove from ready orders
//       setReadyOrders((prev) => prev.filter((order) => order._id !== orderId));
//     }
//   };
  

//   // Handle Payment Done
//   const handlePaymentDone = async (orderId) => {
//     try {
//       setActionLoading((prev) => ({ ...prev, [orderId]: true }));

//       const token = await AsyncStorage.getItem("userToken");
//       const response = await fetch(`${BASE_URL}/admin/payment/${orderId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ payment: 1 }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPickedUpOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, payment: 1 } : order
//           )
//         );
//       } else {
//         const errorData = await response.json();
//         Alert.alert(
//           "Error",
//           errorData.message || "Failed to update payment status"
//         );
//       }
//     } catch (error) {
//       console.error("Error updating payment status:", error);
//       Alert.alert("Error", "Something went wrong. Please try again.");
//     } finally {
//       setActionLoading((prev) => ({ ...prev, [orderId]: false }));
//     }
//   };

//   // Filter orders based on search query for the active tab
//   const getFilteredOrders = () => {
//     const query = searchQuery.trim().toLowerCase();
//     if (query === "") {
//       return activeTab === "Pending"
//         ? pendingOrders
//         : activeTab === "Preparing"
//           ? orders
//           : activeTab === "Ready"
//             ? readyOrders
//             : pickedUpOrders;
//     }

//     const filterByQuery = (order) => {
//       const orderId = order.orderId?.toString().toLowerCase() || ""; // Safely access and convert to string
//       const userName = order.userName?.toLowerCase() || ""; // Safely access and convert to string
//       return orderId.includes(query) || userName.includes(query);
//     };

//     switch (activeTab) {
//       case "Pending":
//         return pendingOrders.filter(filterByQuery);
//       case "Preparing":
//         return orders.filter(filterByQuery);
//       case "Ready":
//         return readyOrders.filter(filterByQuery);
//       case "PickedUp":
//         return pickedUpOrders.filter(filterByQuery);
//       default:
//         return [];
//     }
//   };


//   const filteredOrders = getFilteredOrders();

//   // console.log(orders)
//   return (
//     <View
//       style={{
//         flex: 1,
//         paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
//       }}
//       className="bg-white"
//     >
//       <StatusBar barStyle="dark-content" backgroundColor={"white"} translucent />
//       {loading ? (
//         <FullScreenSkeleton />
//       ) : (

//         <View style={styles.container}>
//           {/* Header */}
//           <Header isOnline={isOnline} toggleOnlineStatus={toggleOnlineStatus} handleLogout={handleLogout} />

//           {/* Tabs */}
//           <Tabs
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             pendingCount={pendingOrders.length}
//             preparingCount={orders.length}
//             readyCount={readyOrders.length}
//             pickedUpCount={pickedUpOrders.length}
//           />

//           {/* Search Bar */}
//           <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

//           {/* Orders List */}

//           <OrderList
//             loading={loading}
//             orders={filteredOrders}
//             activeTab={activeTab}
//             actionLoading={actionLoading}
//             updateOrderStatus={updateOrderStatus}
//             handlePaymentDone={handlePaymentDone}
//           />

//         </View>
//       )}
//       {/* Footer */}
//       {/* <AdminFooter /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 12,
//     paddingHorizontal: 16,
//     backgroundColor: "#FFFFFF",
//   },
// });

// export default AdminHome;






// *** ORDER LISTT  *** 
// // OrderList.js
// import React from "react";
// import { View, ScrollView, ActivityIndicator, Image, Text } from "react-native";
// import OrderItem from "./OrderItem";
// import EmptyState from "../EmptyState/EmptyState";

// const OrderList = ({ loading, orders, activeTab, actionLoading, updateOrderStatus, handlePaymentDone }) => {
//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center mt-10">
//         <ActivityIndicator size="large" color="#309624" />
//       </View>
//     );
//   }

//   if (orders.length === 0) {
//     return <EmptyState activeTab={activeTab} />;
//   }

//   return (
//     <ScrollView showsVerticalScrollIndicator={false}>
//       {orders.map((order) => (
//         <OrderItem
//           key={order._id}
//           order={order}
//           activeTab={activeTab}
//           actionLoading={actionLoading[order._id]}
//           updateOrderStatus={updateOrderStatus}
//           handlePaymentDone={handlePaymentDone}
//         />
//       ))}
//     </ScrollView>
//   );
// };

// export default OrderList;







// *** ORDER ITEM ******* //

// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

// const OrderItem = ({ order, activeTab, updateOrderStatus, handlePaymentDone }) => {
//   // State to manage loading for specific buttons
//   const [buttonLoading, setButtonLoading] = useState(null);

//   // Wrapper to handle button presses with loading states
//   const handleButtonPress = async (orderId, status) => {
//     setButtonLoading(status); // Set loading for the specific action
//     try {
//       await updateOrderStatus(orderId, status); // Execute the update action
//     } finally {
//       setButtonLoading(null); // Reset the loading state
//     }
//   };

//   const handlePaymentPress = async (orderId) => {
//     setButtonLoading("Payment");
//     try {
//       await handlePaymentDone(orderId); // Handle payment action
//     } finally {
//       setButtonLoading(null);
//     }
//   };
//   // console.log(order);

//   return (
//     <View className="p-4 bg-gray-50 rounded-lg shadow-sm my-2">
//       {/* Order Header */}
//       <View className="flex-row justify-between">
//       <Text className="text-xl font-bold">ID: {String(order.orderId).padStart(2, "0")}</Text>
//       </View>
//       <Text className="text-sm text-blue-500">1st order by {order.userName}</Text>
//       <Text className="text-sm text-blue-500"> Delivery Location: {order.deliverTo || 'Not available'}</Text>
//       <View className="mt-2">
  
//   {/* Conditional Time Display */}
//   <View className="mt-2">
//         {activeTab === "Pending" && (
//           <Text className="text-sm text-gray-500">
//             Placed on: {new Date(order.orderPlacedAt).toLocaleDateString()} at {new Date(order.orderPlacedAt).toLocaleTimeString()}
//           </Text>
//         )}
//         {activeTab === "PickedUp" && order.deliveredAt && !isNaN(new Date(order.deliveredAt)) ? (
//     <Text className="text-sm text-gray-500">
//       Delivered At: {new Date(order.deliveredAt).toLocaleDateString()} at {new Date(order.deliveredAt).toLocaleTimeString()}
//     </Text>
//   ) : (
//     <Text className="text-sm text-gray-500">Delivery time not available</Text>
//   )}
// </View>

// </View>
//       {/* Order Items */}
//       {order.items.map((item) => (
//         <View key={item.itemId} className="flex-row justify-between mt-2">
//           <Text className="text-base">
//             {item.itemQuantity} x {item.itemName}
//           </Text>
//         </View>
//       ))}


//       {/* Total Bill */}
//       <View className="flex-row justify-between mt-2">
//         <Text className="text-base font-bold">Total Bill</Text>
//         <Text className="text-base font-bold">₹{order.totalAmount}</Text>
        
//       </View>

//       {/* Action Buttons */}
//       <View className="flex-row justify-between mt-4">
//         {activeTab === "Pending" && (
//           <>
//             <TouchableOpacity
//               onPress={() => handleButtonPress(order._id, "Rejected")}
//               className="flex-1 bg-red-100 rounded-lg py-2 mr-2"
//               disabled={buttonLoading === "Rejected"}
//             >
//               {buttonLoading === "Rejected" ? (
//                 <ActivityIndicator size="small" color="#FF0000" />
//               ) : (
//                 <Text className="text-red-500 text-center">Reject</Text>
//               )}
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => handleButtonPress(order._id, "Preparing")}
//               className="flex-1 bg-yellow-400 rounded-lg py-2"
//               disabled={buttonLoading === "Preparing"}
//             >
//               {buttonLoading === "Preparing" ? (
//                 <ActivityIndicator size="small" color="#FFFFFF" />
//               ) : (
//                 <Text className="text-center text-white">Accept</Text>
//               )}
//             </TouchableOpacity>
//           </>
//         )}

//         {activeTab === "Preparing" && (
//           <TouchableOpacity
//             onPress={() => handleButtonPress(order._id, "Ready")}
//             className="bg-yellow-500 p-2 rounded-lg flex-1"
//             disabled={buttonLoading === "Ready"}
//           >
//             {buttonLoading === "Ready" ? (
//               <ActivityIndicator size="small" color="#FFFFFF" />
//             ) : (
//               <Text className="text-white text-center">Order Ready</Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {activeTab === "Ready" && (
//           <TouchableOpacity
//             onPress={() => handleButtonPress(order._id, "Delivered")}
//             className="bg-green-500 p-2 rounded-lg flex-1"
//             disabled={buttonLoading === "Delivered"}
//           >
//             {buttonLoading === "Delivered" ? (
//               <ActivityIndicator size="small" color="#FFFFFF" />
//             ) : (
//               <Text className="text-white text-center">Order Picked Up</Text>
//             )}
//           </TouchableOpacity>
//         )}

//         {activeTab === "PickedUp" && (
//           <>
//             <Text
//               className={`text-base font-bold ${
//                 order.payment === 1 ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {order.payment === 1 ? "Payment Done" : "Pending Payment"}
//             </Text>
//             {order.payment !== 1 && (
//               <TouchableOpacity
//                 onPress={() => handlePaymentPress(order._id)}
//                 className="bg-green-500 p-2 rounded-lg"
//                 disabled={buttonLoading === "Payment"}
//               >
//                 {buttonLoading === "Payment" ? (
//                   <ActivityIndicator size="small" color="#FFFFFF" />
//                 ) : (
//                   <Text className="text-white text-center">Payment Done</Text>
//                 )}
//               </TouchableOpacity>
//             )}
//           </>
//         )}
//       </View>
//     </View>
//   );
// };

// export default OrderItem;






//ORDER ITEM - BULK ITEMS 
// import React, { useState } from "react";
// import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

// const OrderItem = ({
//   order,
//   activeTab,
//   isSelected,
//   toggleSelectOrder,
//   updateOrderStatus,
//   handlePaymentDone,
// }) => {
//   const [buttonLoading, setButtonLoading] = useState(null);

//   const handleButtonPress = async (status) => {
//     setButtonLoading(status);
//     try {
//       await updateOrderStatus(order._id, status);

//     } finally {
//       setButtonLoading(null);
//     }
//   };

//   const handlePaymentPress = async () => {
//     setButtonLoading("Payment");
//     try {
//       await handlePaymentDone(order._id);
//     } finally {
//       setButtonLoading(null);
//     }
//   };

//   const {
//     orderId = "N/A",
//     userName = "Unknown",
//     deliverTo = "Not available",
//     orderPlacedAt,
//     deliveredAt,
//     items = [],
//     totalAmount = 0,
//     payment = 0,
//   } = order;

//   const formatDateTime = (date) => new Date(date).toLocaleString();

//   return (
//     <View className="p-4 bg-gray-100 rounded-lg shadow-sm mb-2">
//       {/* Header with Checkbox */}
//       <View className="flex-row justify-between items-center">
//         <Text className="text-lg font-bold">ID: {String(orderId).padStart(2, "0")}</Text>
//         {/* Custom Checkbox */}
//         <TouchableOpacity
//           onPress={() => toggleSelectOrder(order._id)}
//           className={`w-6 h-6 border rounded flex items-center justify-center ${
//             isSelected ? "bg-green-500 border-green-500" : "bg-white border-gray-400"
//           }`}
//         >
//           {isSelected && <Text className="text-white font-bold">✓</Text>}
//         </TouchableOpacity>
//       </View>
//       <Text className="text-sm text-blue-500 mt-2">1st order by {userName}</Text>
//       <Text className="text-sm text-blue-500">Delivery Location: {deliverTo}</Text>

//       {/* Conditional Date/Time */}
//       {activeTab === "Pending" && orderPlacedAt && (
//         <Text className="text-sm text-gray-600 mt-2">
//           Placed on: {formatDateTime(orderPlacedAt)}
//         </Text>
//       )}
//       {activeTab === "PickedUp" && deliveredAt && (
//         <Text className="text-sm text-gray-600 mt-2">
//           Delivered At: {formatDateTime(deliveredAt)}
//         </Text>
//       )}

//       {/* Order Items */}
//       {items.map((item) => (
//         <View key={item.itemId} className="flex-row justify-between mt-2">
//           <Text className="text-base">
//             {item.itemQuantity} x {item.itemName}
//           </Text>
//         </View>
//       ))}

//       {/* Total */}
//       <View className="flex-row justify-between mt-2">
//         <Text className="text-base font-bold">Total Bill</Text>
//         <Text className="text-base font-bold">₹{totalAmount}</Text>
//       </View>

//       {/* Action Buttons */}
//       <View className="flex-row justify-between mt-4">
//         {activeTab === "Pending" && (
//           <>
//             <TouchableOpacity
//               onPress={() => handleButtonPress("Rejected")}
//               className="flex-1 bg-red-100 rounded-lg py-2 mr-2"
//               disabled={buttonLoading === "Rejected"}
//             >
//               {buttonLoading === "Rejected" ? (
//                 <ActivityIndicator size="small" color="#FF0000" />
//               ) : (
//                 <Text className="text-red-500 text-center">Reject</Text>
//               )}
//             </TouchableOpacity>
//             <TouchableOpacity
//               onPress={() => handleButtonPress("Preparing")}
//               className="flex-1 bg-yellow-400 rounded-lg py-2"
//               disabled={buttonLoading === "Preparing"}
//             >
//               {buttonLoading === "Preparing" ? (
//                 <ActivityIndicator size="small" color="#FFFFFF" />
//               ) : (
//                 <Text className="text-white text-center">Accept</Text>
//               )}
//             </TouchableOpacity>
//           </>
//         )}
//         {activeTab === "Preparing" && (
//           <TouchableOpacity
//             onPress={() => handleButtonPress("Ready")}
//             className="bg-yellow-500 p-2 rounded-lg flex-1"
//             disabled={buttonLoading === "Ready"}
//           >
//             {buttonLoading === "Ready" ? (
//               <ActivityIndicator size="small" color="#FFFFFF" />
//             ) : (
//               <Text className="text-white text-center">Order Ready</Text>
//             )}
//           </TouchableOpacity>
//         )}
//         {activeTab === "Ready" && (
//           <TouchableOpacity
//             onPress={() => handleButtonPress("Delivered")}
//             className="bg-green-500 p-2 rounded-lg flex-1"
//             disabled={buttonLoading === "Delivered"}
//           >
//             {buttonLoading === "Delivered" ? (
//               <ActivityIndicator size="small" color="#FFFFFF" />
//             ) : (
//               <Text className="text-white text-center">Order Picked Up</Text>
//             )}
//           </TouchableOpacity>
//         )}
//         {activeTab === "PickedUp" && (
//           <>
//             <Text
//               className={`text-base font-bold ${
//                 payment === 1 ? "text-green-500" : "text-red-500"
//               }`}
//             >
//               {payment === 1 ? "Payment Done" : "Pending Payment"}
//             </Text>
//             {payment !== 1 && (
//               <TouchableOpacity
//                 onPress={handlePaymentPress}
//                 className="bg-green-500 p-2 rounded-lg"
//                 disabled={buttonLoading === "Payment"}
//               >
//                 {buttonLoading === "Payment" ? (
//                   <ActivityIndicator size="small" color="#FFFFFF" />
//                 ) : (
//                   <Text className="text-white text-center">Payment Done</Text>
//                 )}
//               </TouchableOpacity>
//             )}
//           </>
//         )}
//       </View>
//     </View>
//   );
// };

// export default OrderItem;







//ORDER LIST - BULK ORDERS 
// import React, { useState } from "react";
// import { View, ScrollView, Button, Text, TouchableOpacity } from "react-native";
// import OrderItem from "./OrderItem";
// import EmptyState from "../EmptyState/EmptyState";

// const OrderList = ({
//   loading = false,
//   orders = [],
//   activeTab = "Pending",
//   actionLoading = {},
//   updateOrderStatus,
//   handlePaymentDone,
// }) => {
//   const [selectedOrders, setSelectedOrders] = useState([]);

//   const toggleSelectOrder = (orderId) => {
//     setSelectedOrders((prevSelected) =>
//       prevSelected.includes(orderId)
//         ? prevSelected.filter((id) => id !== orderId)
//         : [...prevSelected, orderId]
//     );
//   };

//   const handleBulkAction = async (action) => {
//     if (selectedOrders.length === 0) {
//       alert("No orders selected!");
//       return;
//     }
//     if (selectedOrders.length > 10) {
//       alert("You can select up to 10 orders at a time!");
//       return;
//     }
//     try {
//       await updateOrderStatus(selectedOrders, action); // Bulk update
//       setSelectedOrders([]); // Clear selection
//     } catch (error) {
//       console.error("Bulk action failed:", error);
//     }
//   };
  

//   if (loading) {
//     return (
//       <View className="flex-1 justify-center items-center mt-10">
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   if (!orders.length) {
//     return <EmptyState activeTab={activeTab} />;
//   }

//   return (
//     <View className="flex-1 mt-2">
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {orders.map((order) => (
//           <OrderItem
//             key={order._id}
//             order={order}
//             activeTab={activeTab}
//             isSelected={selectedOrders.includes(order._id)}
//             toggleSelectOrder={toggleSelectOrder}
//             actionLoading={actionLoading[order._id]}
//             updateOrderStatus={updateOrderStatus}
//             handlePaymentDone={handlePaymentDone}
//           />
//         ))}
//       </ScrollView>
//       {/* Bulk Action Buttons */}
//       <View className="flex-row justify-around p-4 bg-gray-100">
//         <TouchableOpacity
//           onPress={() => handleBulkAction("Accepted")}
//           className="bg-green-500 px-4 py-2 rounded"
//         >
//           <Text className="text-white">Accept Selected</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => handleBulkAction("Rejected")}
//           className="bg-red-500 px-4 py-2 rounded"
//         >
//           <Text className="text-white">Reject Selected</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default OrderList;













