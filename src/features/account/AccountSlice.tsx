import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axiosInstance'

const initialState: any = {
    loading: false,
    account: {
        username: "",
        password: "",
        email: "",
    }
}

//사용자 등록
export const createAccount = createAsyncThunk(
    'account/create',
    async (input: any, { rejectWithValue }) => {
        const data = {
            username: input.username,
            password: input.password,
            email: input.email,
        }
        try {
            return await axiosInstance.post<any>('/createAccount', data)
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

const account = createSlice({
    name: 'account',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isFulfilled(createAccount), (state) => {
                    state.successFlag = true
                })
    }
})

export const {
} = account.actions

export default account.reducer