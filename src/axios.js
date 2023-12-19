import axios from "axios";

export const auth = axios.create({
    baseURL: "https://sociol-backend.vercel.app/auth"
})
