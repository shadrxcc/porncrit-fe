import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError, HttpResponse } from "../models/shared.model";
import { GetReviews, Reviews, ReviewsModel, SearchResults } from "../models/list.model";
import axiosInstance from "../httpClient";
import { API_URL } from "../utils";
import { toast } from "react-toastify";
import { RootStateType } from "../config-store";

interface SearchParams {
    query: string;
}

export const asyncSearch = createAsyncThunk<HttpResponse<SearchResults>, SearchParams, { rejectValue: CustomError }>(
    "search/search",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/general/search/${params.query}`);

            const results = response?.data;
            return results;
        } catch (error) {
            const customError = error as CustomError;
            const errorMessage =
                customError?.response?.data?.message ||
                customError.message ||
                "There was an error";
            return rejectWithValue({ message: errorMessage });
        }
    }
);

export const selectSearchResults
: (state: RootStateType) => SearchResults = (
    state
) => state.search.results;
