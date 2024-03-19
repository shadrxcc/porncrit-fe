import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError, HttpResponse } from "../models/shared.model";
import { LinkVideoModel, VideoModel } from "../models/list.model";
import axiosInstance from "../httpClient";
import { API_URL } from "../utils";
import { RootStateType } from "../config-store";
import { toast } from "react-toastify";

interface GetVidParams {
    id: string;
}

export const asyncGetLinkedVideo = createAsyncThunk<HttpResponse<VideoModel>, GetVidParams>(
    "videos/video",
    async (params) => {
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
                toast.error(errorMessage)
        }
    }
);
export const selectVideo: (state: RootStateType) => VideoModel = (
    state
) => state.videos.video;

