import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError } from "../models/shared.model";
import { API_URL } from "../utils";
import axiosInstance from "../httpClient";
import { toast } from "react-toastify";


interface LoginParams {
  close: () => void;
}

export const asyncLoginUser = createAsyncThunk(
  "auth/fetchAuth",
  async ({ email, password, close }: LoginParams & { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const user = response.data.data;
      localStorage.setItem("pcK", response.data.data.token.accessToken);
      localStorage.setItem("refreshToken", response.data.data.token.refreshToken)

      close();
      return user;
    } catch (error: any) {
      if (error.response?.status === 403) {
        const userId = error?.response?.data?.data?._id;

        // Return the necessary data for a 403 error
        return { error: '403', email, userId };
      } else {
        const errorMessage =
          error?.response?.data?.message ||
          error.message ||
          "There was an error";
        toast(errorMessage);
      }
    }
  }
);

export const getUserProfile = createAsyncThunk(
  "auth/profile",
  async () => {
    try {
      const response = await axiosInstance.get(`${API_URL}/users/get-current`);
      const user = response.data.data;

      return user;
    } catch (error) {
      const customError = error as CustomError;
      const errorMessage =
        customError?.response?.data?.message ||
        customError.message ||
        "There was an error";
      throw new Error(errorMessage);
    }
  }
);
