import { makeRequest } from "./utils";
const upload = (files: unknown) => {
    return makeRequest("/files", {
        method: "POST",
        body: files,
    });
};

export default Object.freeze({
    upload,
});