import { configureStore } from '@reduxjs/toolkit';
import CategoryReducer from './slices/CategorySlice';


export default configureStore({
    reducer: {
        category: CategoryReducer
    }
})