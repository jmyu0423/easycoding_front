import { RouterProvider } from 'react-router-dom'
import router from './routes/router.tsx'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'light', // ⭐ 다크모드 무시하고 라이트 고정
  },
})

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
