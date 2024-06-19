import {IResponse} from "../models/IResponse.ts";
import {Key} from "../enum/cache.key.ts";

export const baseUrl = "http://localhost:8085/user";

export const isJsonContentType = (headers: Headers) =>
    ['application/vnd.api+json', 'application/json', 'application/vnd.hal+json', 'application/pdf', 'multipart/form-data']
        .includes(headers.get('content-type')?.trimEnd()!);

export const processResponse = <T>(response: IResponse<T>, meta: any, args: unknown): IResponse<T> => {
    const {request} = meta;

    if (request?.uri?.includes("logout")) {
        localStorage.removeItem(Key.LOGGEDIN);
    }

    if (!request?.uri?.includes("profile")) {
        // todo show toast notification
    }

    console.log({response});
    return response;
}

export const processError = (error: { status: number, data: IResponse<void> }, meta: unknown, args: unknown): {
    status: number,
    data: IResponse<void>
} => {
    if (error?.data?.code === 401 && error.data.status === "UNAUTHORIZED" && error.data.message == "You are not logged in") {
        localStorage.setItem(Key.LOGGEDIN, "false");
    }
    // todo show toast notification
    console.log({error})
    return error;
}