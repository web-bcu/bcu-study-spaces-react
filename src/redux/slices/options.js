import { createSlice } from "@reduxjs/toolkit";

const optionsSlice = createSlice({
    name: 'options',
    initialState: [],
    reducers: {
        setOptions: (state, value) => {
            state = value.payload;
            return state;
        }
    }
})

export const {setOptions} = optionsSlice.actions;
export default optionsSlice.reducer;