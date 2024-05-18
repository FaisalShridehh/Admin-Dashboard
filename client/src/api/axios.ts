import axios from 'axios'
import Cookies from 'js-cookie'

const apiClient = axios.create({
    baseURL: 'https://gasexpress-v2.onrender.com/gas-express/api/v1/',
    withCredentials: true, // Include cookies with requests
})
apiClient.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token')
        if (token) {
            config.headers['Authorization'] = token
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default apiClient
