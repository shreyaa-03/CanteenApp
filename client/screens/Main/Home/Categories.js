import { useRef, useState, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontFamily, FontSize } from "../../../GlobalStyles";
import { BASE_URL } from "@env";
import { fetchcategory } from "../../../store/Slices/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();

  const category = useSelector((state) => state.category.items);
  const categoryStatus = useSelector((state) => state.category.status);
  const categoryError = useSelector((state) => state.category.error);

  useEffect(() => {
    if (categoryStatus === "idle") {
      dispatch(fetchcategory());
    }
  }, [categoryStatus, dispatch]);

  return (
    <View className="space-y-2">
      <Text
        style={{
          fontFamily: FontFamily.poppinsSemiBold,
          fontSize: FontSize.size_xl,
        }}
      >
        Categories
      </Text>
      {categoryStatus === "loading" ? (
        <ActivityIndicator size="large" color="#007022" />
      ) : categoryStatus === "failed" ? (
        <Text>Error: {categoryError}</Text>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-4"
        >
          {category.map((item) => (
            <View key={item._id} className="items-center">
              <Image
                source={{ uri: `${BASE_URL}/uploads/${item.image}` }}
                className="h-[62] w-[61] rounded-full"
                resizeMode="cover"
              />
              <Text
                style={{
                  fontFamily: FontFamily.poppinsMedium,
                  fontSize: FontSize.size_xs,
                }}
              >
                {item.categoryName}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Categories;
