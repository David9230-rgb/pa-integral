import { io } from "socket.io-client";

const socket = io("https://pa-integral-backend.onrender.com");

export default socket;