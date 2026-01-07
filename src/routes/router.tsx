import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import Member from '../page/mypage/Member'
import Layout from './Layout'
import Signup from '../page/account/Signup'
import Login from '../page/login/Login'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Navigate to="/mypage" replace />} />
            <Route path="/login" element={<Layout><Login /></Layout>} />
            <Route path="/mypage" element={<Layout><Member /></Layout>} />

            <Route index element={<Navigate to="/account" replace />} />
            <Route path="/account" element={<Layout><Signup /></Layout>} />
        </Route>
    )
)

export default router
