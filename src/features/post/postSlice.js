import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit"

let initialState = []

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        createPost: (state, action) => {
            // console.log(action.payload);
            let posts = action.payload
            posts = posts.map(data => { return { ...data, key: nanoid() } })
            // console.log(posts);
            state.push(...posts);
        },
        deletePost: (state, action) => {
            state = state.filter((data) =>
                data.key !== action.payload.key
            )
        },
        addPost: (state, action) => {
            const post = { 
                ...action.payload,
                key: nanoid()
            }
            state.push(post)
        },
        updatePost: (state, action) => {
            state = state.map((data) => (data.key === action.payload.key ? { ...data, ...action.payload } : data));
        }
    }
})



export const { createPost, deletePost, addPost, updatePost } = postSlice.actions

export default postSlice.reducer