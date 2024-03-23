import { createAsyncThunk, createSlice, isFulfilled, isRejected } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axiosInstance'
import { AppState } from '../../ts/types'
const initialState: any = {
    loading: false,
    successFlag: false,
    dataList: [],
    selectedId: '',
    selectedIdList: [],
    selectBoard: {
        title: '',
        content: ''
    }
}
//게시판 조회
export const getBoards = createAsyncThunk(
    'board/data',
    async (_, { rejectWithValue, getState }) => {
        try {
            return await axiosInstance<any>('/selectBoardList')
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
//게시판 등록
export const createBoards = createAsyncThunk(
    'board/create',
    async (input: any, { rejectWithValue, getState }) => {
        const data = {
            title: input.title,
            content: input.content,
            regSeq: 1,
        }
        try {
            return await axiosInstance.post<any>('/createBoard', data)
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
//게시판 삭제
export const deleteBoards = createAsyncThunk(
    'board/delete',
    async (_, { rejectWithValue, getState }) => {
        const state = getState() as AppState
        const { selectedIdList } = state.board
        const data = {
            seqList: selectedIdList
        }
        try {
            return await axiosInstance.post<any>('/deleteBoards', data)
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
//게시판 수정
export const updateBoards = createAsyncThunk(
    'board/update',
    async (input: any, { rejectWithValue, getState }) => {
        const state = getState() as AppState
        const { selectedId } = state.board
        const data = {
            title: input.title,
            content: input.content,
            seq: selectedId
        }
        try {
            return await axiosInstance.post<any>('/updateBoards', data)
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)
const board = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setSuccessFlag(state, action) {
            state.successFlag = action.payload
        },
        setSelectedIdList(state, action) {
            state.selectedIdList = action.payload
        },
        setSelectedId(state, action) {
            state.selectedId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                isFulfilled(getBoards), (state, { payload }) => {
                    state.dataList = payload.data
                })
            .addMatcher(
                isFulfilled(createBoards, deleteBoards, updateBoards), (state, { payload }) => {
                    state.successFlag = true
                })
    }
})

export const {
    setSuccessFlag,
    setSelectedIdList,
    setSelectedId
} = board.actions

export default board.reducer