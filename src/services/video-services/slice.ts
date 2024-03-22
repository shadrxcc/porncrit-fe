import { createSlice } from "@reduxjs/toolkit";
import { asyncGetAllVideos, asyncGetLinkedVideo } from "./async-actions";
import { GetVideoType, LinkVideoModel, VideoModel, } from "../models/list.model";
import { UsersModel } from "../models/user.model";


// Check if localStorage is available before accessing it

const initialState: GetVideoType = {
    status: "idle",
    video: {} as VideoModel,
    videos: []
};

export const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncGetLinkedVideo.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.video = action.payload.data;
        });
        builder.addCase(asyncGetAllVideos.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.videos = action.payload.data;
        });
    },
});

export default videoSlice.reducer;
