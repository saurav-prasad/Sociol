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
            const newState = state.filter((data) => data.key !== action.payload.key);
            return newState
        },
        addPost: (state, action) => {
            const post = {
                ...action.payload,
                key: nanoid()
            }
            state.push(post)
        },
        updatePost: (state, action) => {
            const newState = state.map((data) => (data.id === action.payload._id ?
                {
                    ...data,
                    ...action.payload
                } : data));
            return newState;
        },
        updatePostByProfileId: (state, action) => {
            const newState = state.map((data) => (data.profileId === action.payload.profileId ?
                {
                    ...data,
                    ...action.payload
                } : data));
            return newState;
        }
    }
})



export const { createPost, deletePost, addPost, updatePost,updatePostByProfileId } = postSlice.actions

export default postSlice.reducer