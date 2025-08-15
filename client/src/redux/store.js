import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AdminAPISlice } from './slices/api/AdminSlice';
import { PostsSliceAPI } from './slices/api/PostsSlice';
import CategoryReducer from './slices/CategorySlice';
import DeleteModelReducer from './slices/DeleteModelSlice';


export const store = configureStore({
    reducer: {
        category: CategoryReducer,
        deletemodel: DeleteModelReducer,
        [AdminAPISlice.reducerPath]: AdminAPISlice.reducer,
        [PostsSliceAPI.reducerPath]: PostsSliceAPI.reducer
        
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(AdminAPISlice.middleware, PostsSliceAPI.middleware);
    }
})

setupListeners(store.dispatch)