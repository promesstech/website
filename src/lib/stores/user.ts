import type { User } from "promess";
import { writable } from "svelte/store";

export const userStore = writable<User>({
    id: "user_Mmh7484YM2Dtt2Jp",
    email: "oscar@gmail.com",
    name: "oscar",
    avatar: {
        id: "av_x3c2ovd8ee2zk7fl",
        url: "https://avatars.dicebear.com/api/avataaars/fa.svg?translateY=-2&style=circle",
    },
});

export const setUser = (user: User) => {
    userStore.set(user);
};