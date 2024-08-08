import React from "react";
import { View, Text, Image,Pressable, TouchableOpacity, Platform, StatusBar, TextInput, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontFamily, FontSize } from "../../GlobalStyles";
import * as Icon from "react-native-feather";
import { BASE_URL } from "@env";

const FoodItem = () => {
    const { top, bottom } = useSafeAreaInsets();
    const navigation = useNavigation();
    const route = useRoute();
    const { foodItem } = route.params || {}; // Use default empty object if route.params is undefined

    if (!foodItem) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No food item data available</Text>
            </View>
        );
    }

    const handlePress = () => {
        navigation.navigate('Home');
    };

    return (
        <LinearGradient
            colors={['#d4f4d1', '#ffffff']} // Light green to white gradient
            style={{ flex: 1 }} // Ensures the gradient takes up the entire container
        >
            <View
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === "ios" ? top : StatusBar.currentHeight,
                    paddingBottom: Platform.OS === "ios" ? 0 : bottom,
                }}
                className=""
            >
                <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

                <View className="flex-1 flex-col items-center space-x-2 px-4 py-2">
                    <View className='w-full'>
                        <TouchableOpacity onPress={handlePress} className="p-2">
                            <Ionicons name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    {/* food image */}
                    <View className='w-full h-full'>
                        <Image
                            source={{ uri: `${BASE_URL}/items_uploads/${foodItem.image}` }} // Use the correct image source
                            style={{ width: '100%', height: '100%' }} // Adjust height as needed
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View className='flex-1'>
                    <View className="space-y-3 px-4 py-2 flex-1 bg-[#F4F5F9]">
                        <View>
                            <View className='flex-row items-center justify-between'>
                                <Text
                                    className='text-[#54D17A]'
                                    style={{
                                        fontFamily: FontFamily.poppinsSemiBold,
                                        fontSize: FontSize.size_11xl,
                                    }}
                                >
                                    ${foodItem.itemPrice}
                                </Text>
                                <Icon.Heart width={24} height={24} stroke="black" />
                            </View>
                            <Text
                                className='mt-[-2]'
                                style={{
                                    fontFamily: FontFamily.poppinsSemiBold,
                                    fontSize: FontSize.size_11xl,
                                }}
                            >
                                {foodItem.itemName}
                            </Text>
                            <View className=''>
                                <Text style={{
                                    fontFamily: FontFamily.poppinsRegular,
                                    fontSize: FontSize.size_mini,
                                }}>
                                    {foodItem.itemIncredients || 'No description available.'}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.inputContainer} className='space-x-2'>
                            <TextInput
                                placeholder="Enter quantity"
                                style={{
                                    fontFamily: FontFamily.poppinsRegular,
                                    fontSize: FontSize.size_mini,
                                }}
                                className='flex-1'
                            />
                        </View>
                        <LinearGradient
                            colors={["#007022", "#54d17a", "#bcffd0"]}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1.9, y: 0 }}
                            className='rounded-xl'
                        >
                            <Pressable className='flex-row space-x-2 p-3 justify-center items-center' onPress={handlePress}>
                                <Icon.ShoppingBag width={20} height={20} stroke="white" />
                                <Text className='text-white' style={{ fontFamily: FontFamily.poppinsSemiBold, fontSize: FontSize.size_lg }}>Add to cart</Text>
                            </Pressable>
                        </LinearGradient>
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 10,
        borderRadius: 8,
    },
});

export default FoodItem;
