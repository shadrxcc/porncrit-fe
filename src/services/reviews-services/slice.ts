import { createSlice } from "@reduxjs/toolkit";
import { ListData, ListType, Reviews, ReviewsType } from "../models/list.model";
import { asyncGetAllReviews, asyncGetUserReviews } from "./async-actions";


// Check if localStorage is available before accessing it

const initialState: ReviewsType = {
    status: "idle",
    page: 0,
    totalData: 0,
    allreviews: [],
    myreview: {} as Reviews
};

export const reviewsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncGetUserReviews.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.myreview = action.payload.data;
        });
        builder.addCase(asyncGetAllReviews.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.allreviews = action.payload.data;
        });
    },
});

export default reviewsSlice.reducer;
