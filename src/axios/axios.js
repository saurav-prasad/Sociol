import axios from "axios";
const URLl = 'https://sociol-backend.vercel.app'
const URL = 'http://localhost:5000'

export const auth = axios.create({
    baseURL: `${URL}/auth`
})
export const profile = axios.create({
    baseURL: `${URL}/profile`
})
export const post = axios.create({
    baseURL: `${URL}/post`
})
export const liked = axios.create({
    baseURL: `${URL}/like`
})
export const comment = axios.create({
    baseURL: `${URL}/comment`
})
export const follow = axios.create({
    baseURL: `${URL}/follow`
})
