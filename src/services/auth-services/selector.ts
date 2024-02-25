import { RootStateType } from "../config-store";
import { FetchStatusType } from "../models/shared.model";
import { UsersModel } from "../models/user.model";

export const selectIsAuthenticated: (state: RootStateType) => boolean = (
    state
) => state.auth.isAuthenticated;

export const selectAuthUser: (
    state: RootStateType
) => UsersModel | undefined = (state) => state.auth.user;

export const selectAuthErrorMessage: (
    state: RootStateType
) => string | undefined = (state) => state.auth.errorMessage;

export const selectAuthStatus: (state: RootStateType) => FetchStatusType = (
    state
) => state.auth.status;
