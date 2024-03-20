import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError, HttpResponse } from "../models/shared.model";
import { LinkVideoModel, ListData, ReviewsModel } from "../models/list.model";
import axiosInstance from "../httpClient";
import { API_URL } from "../utils";
import { RootStateType } from "../config-store";
import { toast } from "react-toastify";
import axios from "axios";

// get-popular
export const asyncGetUserList = createAsyncThunk<HttpResponse<ListData[]>>(
    "list/user-list",
    async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/list/user-list/`);
            const lists = response?.data;

            return lists;
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

export const asyncGetAllLists = createAsyncThunk<HttpResponse<ListData[]>>(
    "lists/all-lists",
    async () => {
        try {
            const response = await axios.get(`${API_URL}/list/get-all`);
            const lists = response?.data;

            return lists;
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

export const asyncGetPopularLists = createAsyncThunk<HttpResponse<ListData[]>>(
    "lists/popular",
    async () => {
        try {
            const response = await axios.get(`${API_URL}/list/get-popular`);
            const lists = response?.data;

            return lists;
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

interface GetListParams {
    id: string;
}

export const asyncGetList = createAsyncThunk<HttpResponse<ListData>, GetListParams, { rejectValue: CustomError }>(
    "lists/list",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/list/get-details/${params.id}`);

            const list = response?.data;
            return list;
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

export const asyncGetListVideos = createAsyncThunk<HttpResponse<LinkVideoModel[]>, GetListParams, { rejectValue: CustomError }>(
    "lists/list-videos",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/list/get-videos/${params.id}`);

            const videos = response?.data;
            return videos;
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

export const selectLists: (state: RootStateType) => ListData[] = (
    state
) => state.lists.lists;

export const selectList: (state: RootStateType) => ListData = (
    state
) => state.lists.list;

export const selectAllList: (state: RootStateType) => ListData[] = (
    state
) => state.lists.allLists;

export const selectPopularList: (state: RootStateType) => ListData[] = (
    state
) => state.lists.popular;

export const selectListVideos: (state: RootStateType) => LinkVideoModel[] = (
    state
) => state.lists.listvideos;
