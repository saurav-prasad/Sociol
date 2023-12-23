import axios from "axios";
const URL = 'https://sociol-backend.vercel.app'
const URL2 = 'http://localhost:5000'

export const auth = axios.create({
    baseURL: `${URL}/auth`
})
export const profile = axios.create({
    baseURL: `${URL}/profile`
})
