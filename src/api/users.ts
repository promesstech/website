import { makeRequest } from "./utils";

export const signup = (user: any) => {
    return makeRequest("/users/signup", {
        method: "POST",
        body: user,
    });
};