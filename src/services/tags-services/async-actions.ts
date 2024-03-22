import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError, HttpResponse } from "../models/shared.model";
import { TagsModel } from "../models/list.model";
import axiosInstance from "../httpClient";
import { API_URL } from "../utils";
import { toast } from "react-toastify";
import { RootStateType } from "../config-store";

export const asyncGetAllTags = createAsyncThunk<HttpResponse<TagsModel[]>>(
    "tags/all",
    async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/tags/get-tags`);
            const tags = response?.data;

            return tags;
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

export const selectAllTags
    : (state: RootStateType) => TagsModel[] = (
        state
    ) => state.tags.tags;
