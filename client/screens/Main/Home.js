import {
  Image,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar as RNStatusBar,
  Animated,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Icon from "react-native-feather";
import SafeAreaAndroid from "../../components/SafeAreaAndroid";
import { FontFamily, FontSize } from "../../GlobalStyles";
import foodCategories from "./HomeData";
import FoodCard from "./FoodCard";

const Home = () => {
  const { width: screenWidth } = Dimensions.get("window");
  const aspectRatio = 183 / 402;
  const imageHeight = screenWidth * aspectRatio;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleScrollEnd = ({ nativeEvent }) => {
    const offsetY = nativeEvent.contentOffset.y;
    setIsScrolled(offsetY > 0);
  };

  return (
<<<<<<< HEAD
    // add shadow to search bar
    // add style to card
    // enhance footer with border top and shadow
    <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0 }} className='bg-[#ffffff]'>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      {/* search bar */}
      <View style={{}} className="flex-row items-center space-x-2 px-4 py-4">
        <View className="flex-row flex-1 bg-[#F4F5F9] items-center p-2 rounded-lg">
          <Icon.Search height='20' width='20' stroke='gray' />
          <TextInput placeholder='What are you craving?' className="flex-1 ml-2" />
        </View>
        <View className="">
          <Icon.ShoppingCart width='20' height='20' strokeWidth={2} stroke='gray' />
        </View>
      </View>
=======
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
      }}
      className="bg-[#ffffff]"
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
>>>>>>> refs/remotes/origin/main
      <Animated.ScrollView
        onScroll={handleScroll}
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={16}
<<<<<<< HEAD
        showsVerticalScrollIndicator={false}
      >
        <View className='px-4 pb-4 space-y-2'>
=======
      >
        <View className="px-4 py-4 space-y-2">
          {/* search bar */}
          <View className="flex-row items-center space-x-2">
            <View className="flex-row flex-1 bg-[#F4F5F9] items-center p-2 rounded-lg">
              <Icon.Search height="20" width="20" stroke="gray" />
              <TextInput
                placeholder="What are you craving?"
                className="flex-1 ml-2"
              />
            </View>
            <View className="">
              <Icon.ShoppingCart
                width="20"
                height="20"
                strokeWidth={2}
                stroke="gray"
              />
            </View>
          </View>
>>>>>>> refs/remotes/origin/main
          {/* pagination window */}
          <View>
            <Image
              source={require("../../assets/images/home/home-slider.png")}
              resizeMode="contain"
              style={{ width: "100%", height: imageHeight }}
              className="rounded-lg w-full"
            />
          </View>
          {/* categories */}
          <View className="space-y-2">
            <Text
              style={{
                fontFamily: FontFamily.poppinsSemiBold,
                fontSize: FontSize.size_xl,
              }}
            >
              Categories
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="space-x-4"
            >
              {foodCategories.map((item) => (
                <View key={item.id} className="items-center">
                  <Image
                    source={item.image}
                    className="h-[62] w-[61] rounded-full"
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      fontFamily: FontFamily.poppinsMedium,
                      fontSize: FontSize.size_xs,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        {/* Shadow separator */}
        {isScrolled && (
          <View
            className="h-[1px] bg-transparent shadow-lg"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          />
        )}
        {/* menu bar */}
        <View className="px-4 py-2 space-y-2 flex-1 bg-[#F4F5F9]">
          <Text
            style={{
              fontFamily: FontFamily.poppinsSemiBold,
              fontSize: FontSize.size_xl,
            }}
          >
            Menu
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {foodCategories.map((item) => (
              <View key={item.id} className="w-[48%] mb-4">
                <FoodCard item={item} />
              </View>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      {/* footer */}
      <View className="flex-row justify-around items-center bg-white">
        <TouchableOpacity className="items-center py-2">
          <Icon.Home width={24} height={24} stroke="gray" />
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_xs,
            }}
          ></Text>
        </TouchableOpacity>
        <TouchableOpacity className="items-center py-2">
          <Icon.User width={22} height={22} stroke="gray" />
          <Text
            style={{
              fontFamily: FontFamily.poppinsMedium,
              fontSize: FontSize.size_xs,
            }}
          ></Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
