import { createSlice } from "@reduxjs/toolkit";
import { asyncGetUserList } from "./async-actions";
import { ListType } from "../models/list.model";


// Check if localStorage is available before accessing it

const initialState: ListType = {
    status: "idle",
    page: 0,
    totalData: 0,
    lists: [],
};

export const listSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncGetUserList.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.lists = action.payload.data;
        });
    },
});

export default listSlice.reducer;
