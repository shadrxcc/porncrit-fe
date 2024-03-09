import { createSlice } from "@reduxjs/toolkit";
import { asyncGetLinkedVideo } from "./async-actions";
import { LinkVideoModel, LinkedVideoType } from "../models/list.model";
import { UsersModel } from "../models/user.model";


// Check if localStorage is available before accessing it

const initialState: LinkedVideoType = {
    status: "idle",
    page: 0,
    totalData: 0,
    video: {} as LinkVideoModel,
};

export const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(asyncGetLinkedVideo.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.video = action.payload.data.video;
        });
    },
});

export default videoSlice.reducer;
