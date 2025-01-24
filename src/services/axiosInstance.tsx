import axios from 'axios'
import Cookies from 'js-cookie'

const BASE_URL = process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'http://192.168.0.87:8080';  // 배포된 서버 IP 또는 도메인 사용

// const onFulfilled = (res: AxiosResponse<any, any>) => {
//     if (!(res.status === 200 || res.status === 201 || res.status === 204)) throw new Error()
//     if (res.data.errors) throw new Error(res.data.errors)
//     return res
// }

// const onRejected = async (err: AxiosError<any>) => {
//     // no token found
//     if (err.response?.status === 401) {
//         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//         // @ts-ignore
//         if (err.response?.data?.error === '911') {
//             const userId = window.sessionStorage.getItem('userId') as string
//             const payload = await axios.post(`/cvm/auth/tk/ref?userId=${userId}`, {}, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     AuthorizationRT: Cookies.get('refreshToken'),
//                 },
//             })
//             Cookies.set('authToken', payload.headers.authorization, { expires: 1 })
//             Cookies.set('refreshToken', payload.headers.authorizationrt, { expires: 1 })
//             if (err.config?.headers) {
//                 err.config.headers.setAuthorization(payload.headers.authorization)
//                 // Retry the original request that got 911'd
//                 return await axios.request(err.config)
//             }
//         } else {
//             sessionStorage.clear()
//             Object.keys(Cookies.get()).forEach((cookieName) => {
//                 Cookies.remove(cookieName);
//             })
//             window.location.href = '/login'
//         }
//     }
//     return Promise.reject(err)
// }

/********** for Content-Type 'application/json' **********/
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    data: {},
    headers: {
        // 'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    },
})
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('authToken')
        if (token) {
            config.headers.Authorization = token
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    }
)
// axiosInstance.interceptors.response.use(onFulfilled, onRejected)

export default axiosInstance