import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthStateType } from "../models/user.model";
import { asyncLoginUser, getUserProfile } from "./async-actions";


// Check if localStorage is available before accessing it
const isAuthenticated =
    typeof localStorage !== "undefined" && localStorage.getItem("pcK")
        ? true
        : false;
        
        
const user =
    typeof localStorage !== "undefined" && localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : undefined;   

const initialState: AuthStateType = {
    status: "idle",
    isAuthenticated,
    user,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: {
            prepare() {
                localStorage.removeItem("pcK");
                localStorage.removeItem("token_expiry_time");
                localStorage.removeItem("user");
                return { payload: false };
            },
            reducer(state, action: PayloadAction<boolean>) {
                state.isAuthenticated = action.payload;
            },
        }
    },
    extraReducers: (builder) => {
        builder.addCase(asyncLoginUser.pending, (state) => {
            state.status = "pending";
        });
        builder.addCase(asyncLoginUser.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.isAuthenticated = true;
            state.user = action.payload;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
        });
        builder.addCase(asyncLoginUser.rejected, (state) => {
            state.status = "rejected";
        });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
