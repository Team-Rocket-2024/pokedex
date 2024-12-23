import axios from "axios";

const server = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_SERVER
});

export default server;