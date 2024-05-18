import { Layers } from 'lucide-react'
import { ModeToggle } from '../ModeToggle/ModeToggle'
// import { Avatar } from 'primereact/avatar'
import { useAuth } from '@/hooks/useAuth'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup
} from '../ui/dropdown-menu'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function DashboardNav() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        // Perform logout action
        logout()
        // Redirect to login page
        navigate('/login')
    }
    return (
        <nav className="dashboard-nav relative border-b-2 border-b-[#fff]  bg-secondaryBackground py-2 text-secondaryText ">
            <div className="flex items-center justify-between  px-3 py-2">
                <div className="flex items-center gap-3">
                    <Layers size={20} />
                    <h1 className="font-inter text-base font-bold uppercase text-secondaryText">
                        Dashboard
                    </h1>
                </div>
                <div className="flex items-center justify-center gap-4 ">
                    <ModeToggle />
                    <div className="flex items-center justify-center gap-3 text-sectionSecondaryText">
                        <p className="text-xs">
                            Welcome,{' '}
                            <span className="text-sm">
                                <strong>{user?.userName}</strong>
                            </span>
                        </p>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                {/* <Avatar
                                    label={user?.userName
                                        .slice(0, 2)
                                        .toUpperCase()}
                                    // size={'xlarge'}
                                    className="h-[2.5rem]  w-[2.5rem] rounded-lg bg-accent-200 text-sm font-semibold text-accent"
                                    // shape="circle"
                                    image=""
                                    imageAlt="avatar"
                                /> */}
                                <Avatar className="h-[2.5rem]  w-[2.5rem]  font-semibold text-accent cursor-pointer">
                                    <AvatarImage
                                        src={''}
                                        alt={user?.userName ?? ''}
                                    />
                                    <AvatarFallback>
                                        {user?.userName
                                            ?.slice(0, 2)
                                            .toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1 gap-3">
                                        <p className="text-sm font-semibold leading-none">
                                            {user?.userName}
                                        </p>
                                        <p className="text-muted-foreground text-xs leading-none">
                                            {user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    )
}

