"use client";

import axios from "axios";
import { logout } from "./auth-services/slice";
import { StoreType } from "./config-store";
import { CustomError } from "./models/shared.model";
import { API_URL } from "./utils";


// 
// 
const interceptor = (store: StoreType): void => {
    if (typeof window !== "undefined") {
        // browser code
        axios.interceptors.request.use(
            async (conf) => {
                const token = localStorage.getItem("get_crib_key");
                if (token) {
                    conf.headers["authorization"] = `Bearer ${token}`;
                }
                conf.headers["ngrok-skip-browser-warning"] = "true";
                return conf;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
        axios.interceptors.response.use(
            (next) => {
                return Promise.resolve(next);
            },
            async (error) => {
                const customError = error as CustomError;

                const errorMessage =
                    customError?.response?.data?.message ||
                    customError?.response?.data?.error?.message ||
                    customError.message ||
                    "There was an error";

                if (error?.response?.status === 401) {
                    const token = localStorage.getItem("get_crib_key");
                    if (token) {
                        await axios.put(
                            `${API_URL}/api/v1/auth/logout`,
                            {
                                token,
                            },
                            {
                                headers: {
                                    authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        localStorage.removeItem("get_crib_key");
                        localStorage.removeItem("token_expiry_time");
                        localStorage.removeItem("user");
                        store.dispatch(logout());
                    } else {
                        console.log(errorMessage || 'Error Completing request. Try again later.')
                    }
                }
                return Promise.reject(error);
            }
        );
    }
};
export default interceptor;
