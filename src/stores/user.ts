import type { User } from "src/types/dashboard";
import { writable } from "svelte/store";

export const userStore = writable<User>({
    id: "user_zup76x4is0e53a8z",
    email: "oscarfal2006@gmail.com",
    name: "oscar",
    avatar: {
        id: "av_x3c2ovd8ee2zk7fl",
        url: "https://storage.googleapis.com/alertbot-images/assets/av_x3c2ovd8ee2zk7fl.webp",
    },
});

export const setUser = (user: User) => {
    userStore.set(user);
};