// useRouter hook for accessing the router object

import { useNavigate } from 'react-router-dom'

// In React Router v6, router methods are accessed via the useNavigate hook
export const useRouter = () => {
    const navigate = useNavigate()
    return {
        push: navigate,
        replace: (to) => navigate(to, { replace: true }),
        // You can add other methods here like back, forward, etc. as needed
    }
}
