import { FetchStatusType } from "./shared.model";


export interface UsersModel {
    _id: string;
    username: string;
    emailVerified: boolean;
    email: string;
    password: string;
    role: string
    accountDisabled: boolean
    profilePic?: string;
    lastActive?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export type AuthStateType = {
    status: FetchStatusType;
    isAuthenticated: boolean;
    user?: UsersModel;
    errorMessage?: string;
};

export interface RegisterUser {
    username: string;
    // acceptedTerms: boolean;
    email: string;
    password: string;
}

export interface ForgotPassword {
    email: string;
}
