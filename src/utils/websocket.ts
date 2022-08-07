/* eslint-disable @typescript-eslint/no-explicit-any */
import type { EventMap, Emitter, EventKey, EventReceiver, WebsocketEvents } from "../types/websocket";

// had to build my own event emitter :skull:
class EventEmitter {
    private events: Map<string, (() => any)[]> = new Map();

    on (event: string, callback: any) {
        const events = this.events.get(event);
        this.events.set(event, [
            ...events || [],
            callback,
        ]);
    };

    emit (event: string, ...args: any) {
        const events = this.events.get(event);
        if (events) {
            events.forEach(callback => {
                // eslint-disable-next-line prefer-spread
                callback.apply(null, args);
            });
        };
    };
};

class TypedEventEmitter<T extends EventMap> implements Emitter<T> {
    private emitter = new EventEmitter();

    on<K extends EventKey<T>>(eventName: K, fn: EventReceiver<T[K]>) {
        this.emitter.on(eventName, fn);
    };

    emit<K extends EventKey<T>>(eventName: K, params?: T[K]) {
        this.emitter.emit(eventName, params);
    };
};

class CustomWebsocket extends TypedEventEmitter<WebsocketEvents> {
    private ws: WebSocket;
    public open = false;

    constructor() {
        super();

        const ws = new WebSocket("ws://localhost:8999");
        this.ws = ws;

        ws.onmessage = webSocketMessage => {
            if (!ws) return this.emit("error", "websocket is not initialized");
            if (ws.readyState === 0) return this.emit("error", "websocket is connecting");
            if (ws.readyState === 2) return this.emit("error", "websocket is closing");
            if (ws.readyState === 3) return this.emit("error", "websocket is closed");

            const {
                event,
                data,
            } = JSON.parse(webSocketMessage.data.toString());
        
            this.emit(event, data);
        };

        ws.onopen = () => {
            console.log("Connected to server");
            this.open = true;
            this.emit("open");
        };
        
        ws.onclose = () => {
            console.log("Disconnected from server");
            this.open = false;
            this.emit("close");
        };

        this.on("error", console.log);
    };

    send(event: string, data: any) {
        this.ws.send(JSON.stringify({
            event,
            data,
        }));
    };
};

export default CustomWebsocket;