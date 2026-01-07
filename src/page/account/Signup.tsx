import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'
import { useAppDispatch } from '../../helper/hooks'
import { createAccount } from '../../features/account/AccountSlice'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const dispatch = useAppDispatch()

    const handleSignup = () => {
        dispatch(createAccount({
            username,
            password,
            email,
        }))
    }

    return (
        <Box
            sx={{
                width: 400,
                margin: '100px auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography variant="h5" align="center">
                회원가입
            </Typography>

            <TextField
                label="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
                label="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <Button variant="contained" onClick={handleSignup}>
                회원가입
            </Button>
        </Box>
    )
}

export default Signup