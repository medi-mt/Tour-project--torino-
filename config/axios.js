import axios from 'axios';
import { getCookie, setCookie } from '../utils/cookie';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL



const httpReq = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
})


httpReq.interceptors.request.use(
    (request) => {
        const token = getCookie("accessToken")
        if (token) {
            request.headers.Authorization = `Bearer ${token}`
        }
        return request
    },
    (err) => {
        return Promise.reject(err)
    }
)

httpReq.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {
        const originReq = error.config
        if ((error?.response?.status === 401 || error?.response?.status === 403 || error?.response?.status === "Invalid token") && !originReq._retry) {
            originReq._retry = true
            const res = await setToken()

            if (res?.status === 200) {
                setCookie("accessToken", res?.data?.accessToken, 30)
                return httpReq(originReq)
            }

        }
        return Promise.reject(error);
    }

)


const setToken = async () => {

    const refreshToken = getCookie("refreshToken")

    if (!refreshToken) return

    try {
        const response = await axios.post(`${BASE_URL}/auth/refresh-token`, { refreshToken })
        return response
    } catch (error) {
        console.log(error);
    }
}

export default httpReq;