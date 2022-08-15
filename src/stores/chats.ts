import type { Channel, Message } from "src/types/dashboard";
import { writable } from "svelte/store";

export const chatsStore = writable<{ [key: string]: Channel & { messages?: Message[] } }>({
    "chat_someid": {
        id: "chat_someid",
        name: "general",
        organizationId: "org_mc8fgruax5eohjwj",
        messages: [
            {
                author: {
                    id: "user_zup76x4is0e53a8z",
                    name: "Oscar",
                    email: "oscarf@gmail.com",
                    avatar: {
                        id: "av_3Hmi8hPvhJo97BBv",
                        url: "https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle",
                    },
                },
                authorId: "user_zup76x4is0e53a8z",
                channelId: "chat_someid",
                content: "Hello everyone!",
                createdAt: Date.now(),
                id: "msg_someid",
            },
            {
                author: {
                    id: "user_zup76x4is0e53a8z",
                    name: "Oscar",
                    email: "oscarf@gmail.com",
                    avatar: {
                        id: "av_3Hmi8hPvhJo97BBv",
                        url: "https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle",
                    },
                },
                authorId: "user_zup76x4is0e53a8z",
                channelId: "chat_someid",
                content: "How are you all doing?",
                createdAt: Date.now(),
                id: "msg_someid2",
            },
            {
                author: {
                    id: "user_Tr9alOWhJTT0Ya24",
                    name: "Jess",
                    email: "jessicae@gmail.com",
                    avatar: {
                        id: "av_1mugXoKTg2qdYjhvC",
                        url: "https://avatars.dicebear.com/api/avataaars/.svg?style=circle&top[]=longHair",
                    },
                },
                authorId: "user_Tr9alOWhJTT0Ya24",
                channelId: "chat_someid",
                content: "Not too bad, thanks for asking! And you?",
                createdAt: Date.now(),
                id: "msg_someid3",
            },
            {
                author: {
                    id: "user_zup76x4is0e53a8z",
                    name: "Oscar",
                    email: "oscarf@gmail.com",
                    avatar: {
                        id: "av_3Hmi8hPvhJo97BBv",
                        url: "https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle",
                    },
                },
                authorId: "user_zup76x4is0e53a8z",
                channelId: "chat_someid",
                content: "Pretty good :D",
                createdAt: Date.now(),
                id: "msg_someid3",
            },
        ],
    },
});

export const setChats = (chats: Channel[]) => {
    const newChats: { [key: string]: Channel } = {};

    chats.forEach((chat) => {
        newChats[chat.id] = chat;
    });

    chatsStore.set(newChats);
};

export const addMessage = (message: Message) => {
    chatsStore.subscribe(chats => {
        const newChats = { ...chats };

        const chat = newChats[message.channelId];
        if (!chat) return;

        // every time you store.set() it runs this (subscribe) function
        // so it loops
        // so if the message exists in the array return
        if (chat.messages?.find(msg => msg.id === message.id)) return;

        newChats[message.channelId] = {
            ...chat,
            messages: [ ...chat.messages || [], message ],
        };

        chatsStore.set(newChats);
    });
};