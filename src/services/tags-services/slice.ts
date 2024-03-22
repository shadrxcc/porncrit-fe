import { createSlice } from "@reduxjs/toolkit";
import { GetTagsType } from "../models/list.model";
import { asyncGetAllTags } from "./async-actions";


// Check if localStorage is available before accessing it

const initialState: GetTagsType = {
    status: "idle",
    tags:[]
};

export const tagsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncGetAllTags.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.tags = action.payload.data;
        });
    },
});

export default tagsSlice.reducer;
