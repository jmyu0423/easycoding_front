import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import Member from '../page/mypage/Member'
import Layout from './Layout'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Navigate to="/mypage" replace />} />

            <Route path="/mypage" element={<Layout><Member /></Layout>} />
        </Route>

    )
)

export default router
