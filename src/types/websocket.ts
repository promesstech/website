// import ws from "ws";

import type { Message } from "./dashboard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type EventMap = Record<string, any>;

export type EventKey<T extends EventMap> = string & keyof T;
export type EventReceiver<T> = (params: T) => void;

export interface Emitter<T extends EventMap> {
    on<K extends EventKey<T>>
      (eventName: K, fn: EventReceiver<T[K]>): void;
    emit<K extends EventKey<T>>
      (eventName: K, params: T[K]): void;
};

export interface WebsocketEvents {
	messageCreate: Message;
    messageCreatePending: Message;
    messageCreateError: Message & { error: string };
    error: string;
    close: void;
    open: void;
};