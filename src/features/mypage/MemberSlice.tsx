import { createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axiosInstance'

const initialState: any = {
    loading: false,
}

export const getMembers = createAsyncThunk(
    'member/data',
    async (_, { rejectWithValue }) => {
        try {
            return await axiosInstance.post<any>('/selectMemberList')
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

const member = createSlice({
    name: 'member',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isFulfilled(getMembers), (_, { payload }) => {
                    console.log(payload.data)
                })
    }
})

export const {
} = member.actions

export default member.reducer