import { usePage } from '@/hooks/useApp'
import { Button } from '../ui/button'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AsideBarLogo() {
    const { toggleSidebar, isMinimized } = usePage()

    return (
        <div className="px-4 md:w-full md:bg-secondaryBackground md:py-4  ">
            <div className="logo flex w-full items-center justify-between text-asideSectionText ">
                <Link to={'/'}>
                    <img
                        src="/GasExpressLogo.webp"
                        alt="Gas Express Logo"
                        className="h-auto w-20"
                    />
                </Link>
                <Button
                    variant={'ghost'}
                    onClick={toggleSidebar}
                    className="hidden p-0 md:flex"
                >
                    {isMinimized ? <ChevronsRight /> : <ChevronsLeft />}
                </Button>
            </div>
        </div>
    )
}
