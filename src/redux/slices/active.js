import { createSlice } from "@reduxjs/toolkit";

const activeSlice = createSlice({
    name: 'active',
    initialState: false,
    reducers: {
        setActive: (state) => !state,
    }
})

export const {setActive} = activeSlice.actions;
export default activeSlice.reducer;