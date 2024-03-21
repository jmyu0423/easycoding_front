import { useEffect } from 'react'
import { getMembers } from '../../features/mypage/MemberSlice'
import { useAppDispatch, useAppSelector } from '../../helper/hooks'

const Member = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getMembers())
    }, [])

    return (
        <>test</>
    )
}
export default Member