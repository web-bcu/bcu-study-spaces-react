import { createSlice } from "@reduxjs/toolkit";

const fileListSlice = createSlice({
    name: 'fileList',
    initialState: false,
    reducers: {
        setFileList: (state, value) => {
            state = value.payload;
            return state
        },
    }
})

export const {setFileList} = fileListSlice.actions;
export default fileListSlice.reducer;