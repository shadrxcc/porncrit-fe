import { createSlice } from "@reduxjs/toolkit";
import { ListData, ListType, Reviews, ReviewsModel, ReviewsType } from "../models/list.model";
import { asyncGetAllReviews, asyncGetPopularReviews, asyncGetReview, asyncGetUserReviews } from "./async-actions";


// Check if localStorage is available before accessing it

const initialState: ReviewsType = {
    status: "idle",
    page: 0,
    totalData: 0,
    allreviews: [],
    popular: [],
    myreview: {} as Reviews,
    review: {} as ReviewsModel
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
        builder.addCase(asyncGetPopularReviews.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.popular = action.payload.data;
        });
        builder.addCase(asyncGetReview.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.review = action.payload.data;
        });
    },
});

export default reviewsSlice.reducer;
