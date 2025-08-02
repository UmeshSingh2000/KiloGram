import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getMypost } from "../../Service/postService"


const initialState = {
    loading: false,
    error: null,
    posts: []
}

export const fetchPost = createAsyncThunk('post/fetchPosts', async (_, { rejectWithValue }) => {
    try {
        const posts = await getMypost()
        return posts
    } catch (error) {
        console.log(error)
        return rejectWithValue(error.response?.data.message || error.message || 'Something Wrong')
    }
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts = [action.payload, ...state.posts]
        },
        // toggleLike: (state, action) => {
        //     const { postId, userId } = action.payload
        //     const post = state.posts.filter((p) => p._id === postId)
        //     const index = post.indexOf(userId);
        //     if (index !== -1) {
        //         post.likes.filter((like) => like !== userId)
                
        //     }

        // }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.posts = action.payload;
        })
        builder.addCase(fetchPost.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
})

export const { addPost } = postSlice.actions
export default postSlice.reducer