import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'
import commentReducer from '../features/comment/commentSlice'

export const store = configureStore({
    reducer: {
        authReducer,
        postReducer,
        commentReducer
    }
})
