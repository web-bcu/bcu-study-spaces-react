import { combineReducers } from "@reduxjs/toolkit";
import activeSlice from './active'
import adminSlice from './admin'
import optionSlice from './options'
import fileListSlice from './fileList'
import fileList from "./fileList";

const rootReducer = combineReducers({
    active: activeSlice,
    admin: adminSlice,
    options: optionSlice,
    fileList: fileListSlice
})

export default rootReducer;