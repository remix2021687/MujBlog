import { configureStore } from '@reduxjs/toolkit';
import CategoryReducer from './slices/CategorySlice';
import { apiSlice } from './slices/api/AdminSlice';


export default configureStore({
    reducer: {
        category: CategoryReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    }
})