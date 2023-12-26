import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signIn: (state, action) => {
            const user = {
                ...state.user,
                ...action.payload,
                key: nanoid(),
            }
            console.log(user);
            state.user = { ...user }
        },
        updateUser: (state, action) => {
            const user = {
                ...state.user,
                ...action.payload,
            }
            state.user = {...user}
        },
        signOut: (state, action) => {
            state.user = null
        }
    }
})

export const { signIn, signOut,updateUser } = authSlice.actions

export default authSlice.reducer