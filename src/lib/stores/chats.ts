import type { Chat, Message } from "promess";
import { writable } from "svelte/store";

export const chatsStore = writable<{ [key: string]: Chat & { messages?: Message[] } }>({
    "chat_07hnxxodgs246isr": {
        id: "chat_07hnxxodgs246isr",
        name: "general",
        organizationId: "org_hixcdyq9p15pz7e1",
        messages: [],
        // messages: [
        //     {
        //         author: {
        //             id: "user_zup76x4is0e53a8z",
        //             name: "Oscar",
        //             email: "oscarf@gmail.com",
        //             avatar: {
        //                 id: "av_3Hmi8hPvhJo97BBv",
        //                 url: "https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle",
        //             },
        //         },
        //         authorId: "user_zup76x4is0e53a8z",
        //         channelId: "chat_someid",
        //         content: "Hello everyone!",
        //         createdAt: Date.now(),
        //         id: "msg_someid",
        //     },
        //     {
        //         author: {
        //             id: "user_zup76x4is0e53a8z",
        //             name: "Oscar",
        //             email: "oscarf@gmail.com",
        //             avatar: {
        //                 id: "av_3Hmi8hPvhJo97BBv",
        //                 url: "https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle",
        //             },
        //         },
        //         authorId: "user_zup76x4is0e53a8z",
        //         channelId: "chat_someid",
        //         content: "How are you all doing?",
        //         createdAt: Date.now(),
        //         id: "msg_someid2",
        //     },
        //     {
        //         author: {
        //             id: "user_Tr9alOWhJTT0Ya24",
        //             name: "Jess",
        //             email: "jessicae@gmail.com",
        //             avatar: {
        //                 id: "av_1mugXoKTg2qdYjhvC",
        //                 url: "https://avatars.dicebear.com/api/avataaars/.svg?style=circle&top[]=longHair",
        //             },
        //         },
        //         authorId: "user_Tr9alOWhJTT0Ya24",
        //         channelId: "chat_someid",
        //         content: "Not too bad, thanks for asking! And you?",
        //         createdAt: Date.now(),
        //         id: "msg_someid3",
        //     },
        //     {
        //         author: {
        //             id: "user_zup76x4is0e53a8z",
        //             name: "Oscar",
        //             email: "oscarf@gmail.com",
        //             avatar: {
        //                 id: "av_3Hmi8hPvhJo97BBv",
        //                 url: "https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle",
        //             },
        //         },
        //         authorId: "user_zup76x4is0e53a8z",
        //         channelId: "chat_someid",
        //         content: "Pretty good :D",
        //         createdAt: Date.now(),
        //         id: "msg_someid3",
        //     },
        // ],
    },
});

export const setChats = (chats: Chat[]) => {
    const newChats: { [key: string]: Chat } = {};

    chats.forEach((chat) => {
        newChats[chat.id] = chat;
    });

    chatsStore.set(newChats);
};

export const addMessage = (message: Message) => {
    chatsStore.subscribe(chats => {
        const newChats = { ...chats };

        const chat = newChats[message.chatId];
        if (!chat) return;

        // every time you store.set() it runs this (subscribe) function
        // so it loops
        // so if the message exists in the array return
        if (chat.messages?.find(msg => msg.id === message.id)) return;

        newChats[message.chatId] = {
            ...chat,
            messages: [ ...chat.messages || [], message ],
        };

        chatsStore.set(newChats);
    });
};