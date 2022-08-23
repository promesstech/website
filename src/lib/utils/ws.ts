import ioClient, { Socket } from "socket.io-client";
import type {
    ClientToServerEvents,
    ServerToClientEvents,
} from "promess";

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = ioClient("http://localhost:50451");

export const io = socket;