import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import CategoryReducer from './slices/CategorySlice';
import { apiSlice } from './slices/api/AdminSlice';


export const store = configureStore({
    reducer: {
        category: CategoryReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(apiSlice.middleware);
    }
})

setupListeners(store.dispatch)