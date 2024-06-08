import Cookies from 'js-cookie'

export const getAuthToken = () => {
    const token = Cookies.get('token')
    if (!token) {
        throw new Error('Unauthorized')
    }
    return token
}
