import { useState } from 'react'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import { useAppDispatch } from '../../helper/hooks'
import { login } from '../../features/auth/AuthSlice'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()
    const [error, setError] = useState('')

    const handleLogin = async () => {
        try {
            setError('')
            await dispatch(login({ username, password })).unwrap()
        } catch (e) {
            setError('아이디 또는 비밀번호가 올바르지 않습니다.')
        }
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
                로그인
            </Typography>

            {error && <Alert severity="error">{error}</Alert>}

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

            <Button
                variant="contained"
                size="large"
                onClick={handleLogin}
            >
                로그인
            </Button>
        </Box>
    )
}

export default Login