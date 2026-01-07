import { AnyAction, combineReducers, configureStore } from '@reduxjs/toolkit'
import memberSlice from './../features/mypage/MemberSlice'
import BoardSlice from './mypage/BoardSlice'
import AccountSlice from './account/AccountSlice'
import AuthSlice from './auth/AuthSlice'

const appReducer = combineReducers({
    member: memberSlice,
    board: BoardSlice,
    account: AccountSlice,
    auth: AuthSlice,
})

const reducerProxy = (state: any, action: AnyAction) => {
    if (action.type === 'state/reset') {
        return appReducer(undefined, action)
    }
    return appReducer(state, action)
}

const store = configureStore({
    reducer: reducerProxy,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch