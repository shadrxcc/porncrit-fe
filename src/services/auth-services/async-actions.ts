import { createAsyncThunk } from "@reduxjs/toolkit";
import { CustomError } from "../models/shared.model";
import { API_URL } from "../utils";
import axiosInstance from "../httpClient";


interface LoginParams {
  verify: () => void;
  close: () => void;
}

export const asyncLoginUser = createAsyncThunk(
  "auth/fetchAuth",
  async ({ email, password, verify, close }: LoginParams & { email: string; password: string }) => {
    try {
      const response = await axiosInstance.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const user = response.data.data;
      localStorage.setItem("user", JSON.stringify(user.user));
      localStorage.setItem("pcK", response.data.data.token.accessToken);

      close();
      return user;
    } catch (error) {
      const customError = error as CustomError;

      if (customError.response?.status === 403) {
        verify();
      } else {
        const errorMessage =
          customError?.response?.data?.message ||
          customError.message ||
          "There was an error";
        throw new Error(errorMessage);
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
      console.log(user);

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
