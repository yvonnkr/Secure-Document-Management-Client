import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl, isJsonContentType, processError, processResponse} from "../utils/requestutils.ts";
import {IResponse} from "../models/IResponse.ts";
import {QrCodeRequest, User} from "../models/IUser.ts";
import {IRegisterRequest, IUserRequest} from "../models/ICredentials.ts";
import {Http} from "../enum/http.method.ts";

export const userAPI = createApi({
    reducerPath: "userAPI",
    baseQuery: fetchBaseQuery({baseUrl, credentials: "include", isJsonContentType}),
    tagTypes: ["User"],
    endpoints: (builder) => ({
        fetchUser: builder.query<IResponse<User>, void>({
            query: () => ({
                url: "/profile",
                method: Http.GET,
            }),
            keepUnusedDataFor: 120,
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            providesTags: (result, error) => ["User"]
        }),
        loginUser: builder.mutation<IResponse<User>, IUserRequest>({
            query: (credentials) => ({
                url: "/login",
                method: Http.POST,
                body: credentials
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
        }),
        registerUser: builder.mutation<IResponse<void>, IRegisterRequest>({
            query: (registerRequest) => ({
                url: "/register",
                method: Http.POST,
                body: registerRequest
            }),
            transformErrorResponse: processError
        }),
        verifyAccount: builder.mutation<IResponse<void>, string>({
            query: (key) => ({
                url: `/verify/account?key=${key}`,
                method: Http.GET
            }),
            transformErrorResponse: processError
        }),
        verifyQrCode: builder.mutation<IResponse<User>, QrCodeRequest>({
            query: (qrCodeRequest) => ({
                url: "/verify/qrcode",
                method: Http.POST,
                body: qrCodeRequest
            }),
            transformResponse: processResponse<User>,
            transformErrorResponse: processError,
            invalidatesTags: (result, error) => error ? [] : ["User"] //this updates the existing cache with the new response we get from this request
        })

    })
})