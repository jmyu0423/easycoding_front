import { createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom'
import Member from '../page/mypage/Member'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<Member />}>
            <Route index element={<Navigate to="mypage" replace />} />
        </Route>

    )
)

export default router
