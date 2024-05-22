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

//* This code creates an Axios client instance, which is a popular library for making HTTP requests in JavaScript. The instance is configured to include cookies with requests by setting the `withCredentials` property to `true`.

//* The `interceptors.request` property is used to add a middleware that is executed before each request is sent. In this case, the middleware checks if there is a token stored in cookies. If there is, it adds the token to the request headers with the key `Authorization`. This allows the server to verify the identity of the user making the request based on the token.

//* The middleware also catches any errors that occur during the request process and returns a rejected promise with the error.

//* Finally, the instance is exported as `apiClient`, which can be used to make requests to the server. By using this client instance, all requests will automatically include the token from cookies if there is one, and will catch any errors that occur during the request process.
