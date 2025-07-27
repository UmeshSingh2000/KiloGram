import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { checkUserAuth } from '../../Service/userAuthenticationService'

const initialState = {
    isAuthenticated: null,
    loading: false,
    error: null,
    user: null
}
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem('token')
        if (!token) throw new Error('Token not found');
        const data = await checkUserAuth(token)
        console.log(data)
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data.message || error.message || 'Unauthorized')
    }
})
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem('token')
            state.isAuthenticated = false;
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(checkAuth.pending, (state) => {
            state.loading = true,
                state.error = null;
        })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload?.user || null
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            });
    }
})

// Action creators are generated for each case reducer function
export const { logout } = authSlice.actions

export default authSlice.reducer