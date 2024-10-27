import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../constants/constant";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchcategory = createAsyncThunk(
  "category/fetchcategory",
  async () => {
    const token = await AsyncStorage.getItem("userToken");
    const response = await fetch(`${BASE_URL}/category/get`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    const data = await response.json();
    return data.categories;
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchcategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // Should be an array
      })
      .addCase(fetchcategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice;
