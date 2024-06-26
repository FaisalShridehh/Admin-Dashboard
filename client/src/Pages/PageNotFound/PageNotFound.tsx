import { NavLink } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className="flex h-[100dvh] flex-col items-center justify-center bg-background px-4 text-center text-text">
            <div className="flex flex-col items-center justify-center space-y-4 gap-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl ">
                    Oops! Page not found.
                </h1>
                <p className="max-w-[600px] text-secondary md:text-xl/relaxed font-semibold">
                    The page you were looking for could not be located. It may
                    have been moved or deleted.
                </p>
                <NavLink
                    to="/dashboard"
                    className="text-text hover:bg-primary/90 focus-visible:ring-ring inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
                >
                    Go Back Home
                </NavLink>
            </div>
        </div>
    )
}
