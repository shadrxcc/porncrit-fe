import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError, HttpResponse } from "../models/shared.model";
import { ListData } from "../models/list.model";
import axiosInstance from "../httpClient";
import { API_URL } from "../utils";
import { RootStateType } from "../config-store";
import { toast } from "react-toastify";


export const asyncGetUserList = createAsyncThunk<HttpResponse<ListData[]>>(
    "videos/video",
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

export const selectLists: (state: RootStateType) => ListData[] = (
    state
) => state.lists.lists;

