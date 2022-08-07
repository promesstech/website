import type { Channel, Message } from "src/types/dashboard";
import { writable } from "svelte/store";

export const chatsStore = writable<{ [key: string]: Channel & { messages?: Message[] } }>({});

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