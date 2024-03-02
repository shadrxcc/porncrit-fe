"use client";

import axios from "axios";
import { CustomError } from "./models/shared.model";
import { API_URL } from "./utils";


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

if (typeof window !== "undefined") {
  axiosInstance.interceptors.request.use(
    async (conf) => {
      const token = localStorage.getItem("pcK");
      if (token) {
        conf.headers["authorization"] = `Bearer ${token}`;
      }
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const customError = error as CustomError;
      const errorMessage =
        customError?.response?.data?.message ||
        customError.message ||
        "There was an error";

      if (error?.response?.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken"); // Retrieve the refresh token
        if (refreshToken) {
          try {
            // Attempt to refresh the token
            const refreshResponse = await axios.post(
              `${API_URL}/api/v1/auth/refresh`, // Assuming this is your refresh token endpoint
              {
                refreshToken,
              },
              {
                headers: {
                  authorization: `Bearer ${refreshToken}`,
                },
              }
            );

            // If the token is successfully refreshed, update the local storage and retry the original request
            if (refreshResponse.status === 200) {
              const newAccessToken = refreshResponse.data.accessToken; // Assuming the new access token is returned in the response
              localStorage.setItem("pcK", newAccessToken);
              // Retry the original request with the new token
              const originalRequest = error.config;
              originalRequest.headers["authorization"] = `Bearer ${newAccessToken}`;
              return axiosInstance(originalRequest);
            }
          } catch (refreshError) {
            console.error("Failed to refresh token", refreshError);
            // Handle token refresh failure (e.g., logout the user)
            localStorage.removeItem("pcK");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            window.location.replace(`/`)
            // Redirect the user to the login page or handle the failure as appropriate
          }
        } else {
          console.log(errorMessage || 'Error Completing request. Try again later.');
        }
      }
      return Promise.reject(error);
    }
  );
}


export default axiosInstance;