import { makeRequest } from "./utils";

export const getAllChats = async (organizationId: string) => {
    return makeRequest("/channels", {
        query: { organizationId },
        method: "GET",
    });
};

export const getChatMessages = async (channelId: string) => {
    return makeRequest(`/channels/${channelId}/messages`);
};