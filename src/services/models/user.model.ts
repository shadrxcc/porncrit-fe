import { FetchStatusType } from "./shared.model";

// 
export interface UsersModel {
    id: string;
    username: string;
    emailVerified: boolean;
    email: string;
    password: string;
    profilePic?: string;
    deletedAt?: Date;
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
