import { createSlice } from '@reduxjs/toolkit'

export const CategorySlice = createSlice({
    name: 'is_posted',
    initialState: {
        value: "Dashboard"
    },

    reducers: {
        dashboard: state => {
            state.value = 'Dashboard'
        },
        
        posts: state => {
            state.value = 'Posts'
        },
    
        create: state => {
            state.value = 'Create'
        },
    }
})

export const { dashboard, posts, create } = CategorySlice.actions

export default CategorySlice.reducer;