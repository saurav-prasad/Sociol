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
            state[postId] = comments
        },
        deleteComment: (state, action) => {
            const postId = action.payload.postId;
            const newState = state[postId].filter((data) => data.id !== action.payload.id);
            state[postId] = newState;
        },
        addComment: (state, action) => {
            const postId = action.payload.postId
            const comment = {
                ...action.payload.comment,
                key: nanoid()
            }
            const existingComments = [...state[postId] || []];
            existingComments.push(comment);
            state[postId] = existingComments
        },
        updateComment: (state, action) => {
            const postId = action.payload.postId

            const newState = state[postId].map((data) => (data.id === action.payload.id ?
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