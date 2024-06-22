import {IUser} from "./IUser.ts";

export interface IUserRequest {
    email: string;
    password?: string;
}

export interface IRegisterRequest extends IUserRequest {
    firstName: string;
    lastName: string;
    phone?: string;
    bio?: string;
}

export type EmailAddress = Pick<IUserRequest, "email">;
export type UpdatePassword = { newPassword: string, confirmNewPassword: string, currentPassword: string };
// export type UpdateNewPassword = Pick<IUser, "userId"> & UpdatePassword;
export type UpdateNewPassword = Pick<IUser, "userId"> & {password?: string, newPassword: string, confirmNewPassword: string }
