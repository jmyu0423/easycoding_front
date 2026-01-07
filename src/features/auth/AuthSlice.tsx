import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axiosInstance'

interface LoginPayload {
    username: string
    password: string
}

export const login = createAsyncThunk(
    'auth/login',
    async ({ username, password }: LoginPayload, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post('/login', {
                username,
                password,
            })

            const { access_token, refresh_token, expires_in } = res.data.data
            sessionStorage.setItem('accessToken', access_token)
            sessionStorage.setItem('refreshToken', refresh_token)
            sessionStorage.setItem('expiresIn', expires_in)

            return res.data
        } catch (e) {
            return rejectWithValue('LOGIN_FAILED')
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {},
})

export default authSlice.reducer
