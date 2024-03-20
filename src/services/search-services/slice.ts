import { createSlice } from "@reduxjs/toolkit";
import { SearchResults, SearchType } from "../models/list.model";
import { asyncSearch } from "./async-actions";

// Check if localStorage is available before accessing it

const initialState: SearchType = {
    status: "idle",
    results:{} as SearchResults
};

export const reviewsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncSearch.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.results= action.payload.data;
        });
    },
});

export default reviewsSlice.reducer;
