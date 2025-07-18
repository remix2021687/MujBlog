import { createSlice } from '@reduxjs/toolkit';

export const DeleteModelSlice = createSlice({
    name: 'deleteModel',
    initialState: {
        isOpen: false,   
    },

    reducers: {
        openDeleteModel: (state) => {
            state.isOpen = true;
        },

        closeDeleteModel: (state) => {
            state.isOpen = false;
        },
    }
})

export const { openDeleteModel, closeDeleteModel } = DeleteModelSlice.actions;
export default DeleteModelSlice.reducer;