import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Features/authSlice'
import postsReducer from './Features/postSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer
  },
})