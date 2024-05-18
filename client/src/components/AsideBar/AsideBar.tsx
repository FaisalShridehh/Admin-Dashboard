import { usePage } from '@/hooks/useApp'
import AsideBarLogo from '../AsideBar-Logo/AsideBarLogo'
import AsideBarMenu from '../AsideBar-Menu/AsideBarMenu'
// import { useAuth } from '@/hooks/useAuth'

export default function AsideBar() {
    const { isMinimized } = usePage()
    return (
        <section
            className={`aside-bar h-screen  bg-asideSectionBackground text-asideSectionSecondaryText transition-all duration-300 ease-in-out ${isMinimized ? 'flex-[1.5] md:flex-[1]' : 'flex-[2]'} font-poppins `}
        >
            <div className="aside-wrapper flex items-center justify-between gap-4 md:flex-col md:items-start md:justify-start ">
                <AsideBarLogo />
                <AsideBarMenu />
            </div>
        </section>
    )
}
