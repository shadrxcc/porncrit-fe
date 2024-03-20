import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError, HttpResponse } from "../models/shared.model";
import { GetReviews, Reviews, ReviewsModel } from "../models/list.model";
import axiosInstance from "../httpClient";
import { API_URL } from "../utils";
import { toast } from "react-toastify";
import { RootStateType } from "../config-store";

export const asyncGetUserReviews = createAsyncThunk<HttpResponse<Reviews>>(
    "reviews/user",
    async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/reviews/user/`);
            const reviews = response?.data;

            return reviews;
        } catch (error) {
            const customError = error as CustomError;
            const errorMessage =
                customError?.response?.data?.message ||
                customError.message ||
                "There was an error";
            toast.error(errorMessage)
        }
    }
);

export const asyncGetAllReviews = createAsyncThunk<HttpResponse<GetReviews[]>>(
    "reviews/all",
    async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/reviews/get-all`);
            const reviews = response?.data;

            return reviews;
        } catch (error) {
            const customError = error as CustomError;
            const errorMessage =
                customError?.response?.data?.message ||
                customError.message ||
                "There was an error";
            toast.error(errorMessage)
        }
    }
);

export const asyncGetPopularReviews = createAsyncThunk<HttpResponse<GetReviews[]>>(
    "reviews/popular",
    async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/reviews/get-popular`);
            const reviews = response?.data;

            return reviews;
        } catch (error) {
            const customError = error as CustomError;
            const errorMessage =
                customError?.response?.data?.message ||
                customError.message ||
                "There was an error";
            toast.error(errorMessage)
        }
    }
);

export const selectMyReviews
: (state: RootStateType) => Reviews = (
    state
) => state.reviews.myreview;

export const selectAllReviews
: (state: RootStateType) => GetReviews[] = (
    state
) => state.reviews.allreviews;

export const selectPopularReviews
: (state: RootStateType) => GetReviews[] = (
    state
) => state.reviews.popular;