import { makeRequest } from "./utils";

const signup = (user: unknown) => {
    return makeRequest("/user", {
        method: "POST",
        body: user,
    });
};

const login = (user: unknown) => {
    return makeRequest("/user/login", {
        method: "POST",
        body: user,
    });
};

const logout = () => {
    return makeRequest("/user/logout", {
        method: "GET",
    });
};

const get = () => {
    return makeRequest("/user", {
        method: "GET",
    });
};

export default Object.freeze({
    signup,
    login,
    logout,
    get,
});