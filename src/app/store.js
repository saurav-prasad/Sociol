import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/post/postSlice'
import commentReducer from '../features/comment/commentSlice'
import profilesReducer from '../features/profiles/profilesSlice'

export const store = configureStore({
    reducer: {
        authReducer,
        postReducer,
        commentReducer,
        profilesReducer,
    }
})
