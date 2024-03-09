import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError, HttpResponse } from "../models/shared.model";
import { LinkVideoModel, LinkedVideoType } from "../models/list.model";
import axiosInstance from "../httpClient";
import { API_URL } from "../utils";
import { RootStateType } from "../config-store";

interface GetVidParams {
    id: string;
}

export const asyncGetLinkedVideo = createAsyncThunk<HttpResponse<LinkedVideoType>, GetVidParams, { rejectValue: CustomError }>(
    "videos/video",
    async (params, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`${API_URL}/videos/video-details/${params.id}`);

            const video = response?.data;
            return video;
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
export const selectVideo: (state: RootStateType) => LinkVideoModel = (
    state
) => state.videos.video;

