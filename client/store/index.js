// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userDetailSlice from './Slices/userDetailSlice';
import SagaData from './saga';
import categorySlice from './Slices/categorySlice';
import foodItemSlice from './Slices/foodItemSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    users: userDetailSlice.reducer,
    category: categorySlice.reducer,
    foodItem: foodItemSlice.reducer
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(sagaMiddleware),
});

// Run the saga
// sagaMiddleware.run(SagaData);

export default store;

