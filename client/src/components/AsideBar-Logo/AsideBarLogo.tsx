import { usePage } from '@/hooks/useApp'
import { Button } from '../ui/button'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AsideBarLogo() {
    const { toggleSidebar, isMinimized } = usePage()

    return (
        <div className="md:w-full px-4 md:bg-secondaryBackground md:py-4  ">
            <div className="logo flex w-full items-center justify-between text-asideSectionText ">
                <Link to={'/'}>
                    <h1
                        className={` font-bold uppercase ${isMinimized ? 'text-base md:text-xl' : 'text-base md:text-2xl'} font-inter transition-all duration-500 ease-in-out`}
                    >
                        Logo
                    </h1>
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
