import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: 'admin',
    initialState: false,
    reducers: {
        setAdmin: (state, value) => {
            state = value.payload;
            return state;
        }
    }
})

export const {setAdmin} = adminSlice.actions;
export default adminSlice.reducer;