import { createSlice, nanoid } from "@reduxjs/toolkit"

let initialState = {}

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        createComment: (state, action) => {
            const postId = action.payload.postId;

            let comments = action.payload.comments;
            comments = comments.map(data => ({ ...data, key: nanoid() }));

            state[postId] = comments;
        },
        deleteComment: (state, action) => {
            const postId = action.payload.postId
            const newState = state[action.payload.postId].filter((data) => data.key !== action.payload.key);
            state[postId] = newState
        },
        addComment: (state, action) => {
            const postId = action.payload[0]
            const comment = {
                ...action.payload[1].comment,
                key: nanoid()
            }
            const existingComments = [...state[postId] || []];
            existingComments.push(comment);
            state[postId] = existingComments
        },
        updateComment: (state, action) => {
            const postId = action.payload.postId
            const newState = state[action.payload.postId].map((data) => (data.key === action.payload.key ?
                {
                    ...data,
                    ...action.payload
                } : data));
            state[postId] = newState
        }
    }
})



export const { createComment, deleteComment, addComment, updateComment } = commentSlice.actions

export default commentSlice.reducer