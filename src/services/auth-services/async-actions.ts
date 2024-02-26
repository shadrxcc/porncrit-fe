import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CustomError } from "../models/shared.model";
import { API_URL } from "../utils";


interface LoginParams {
    verify: () => void;
    close: () => void;
  }
  
  export const asyncLoginUser = createAsyncThunk(
    "auth/fetchAuth",
    async ({ email, password, verify,close }: LoginParams & { email: string; password: string }) => {
      try {
        const response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        });
        localStorage.setItem("pcK", response.data.data.token.accessToken);
        close()
        const user = response.data.data;
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
            const response = await axios.get(`${API_URL}/users/get-current-user`);
            const user = response.data;
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
