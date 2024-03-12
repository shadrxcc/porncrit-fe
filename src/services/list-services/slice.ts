import { createSlice } from "@reduxjs/toolkit";
import { asyncGetAllLists, asyncGetList, asyncGetUserList } from "./async-actions";
import { ListData, ListType } from "../models/list.model";


// Check if localStorage is available before accessing it

const initialState: ListType = {
    status: "idle",
    page: 0,
    totalData: 0,
    lists: [],
    list: {} as ListData,
    allLists: []
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
        builder.addCase(asyncGetAllLists.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.allLists = action.payload.data;
        });
        builder.addCase(asyncGetList.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.list = action.payload.data;
        });
    },
});

export default listSlice.reducer;
