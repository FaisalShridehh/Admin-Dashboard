import { useApp } from '@/hooks/useApp'
import { useAuth } from '@/hooks/useAuth'
import { NavLink } from 'react-router-dom'

const AsideBarMenu = () => {
    const { isMinimized } = useApp()
    const { user } = useAuth()

    return (
        <nav className="aside-bar-menu w-full">
            <div className="W-full flex justify-end">
                <ul
                    className={`mr-2 flex  items-center gap-2 text-asideSectionSecondaryText transition-all duration-500 ease-in-out sm:gap-4 md:flex-col md:items-start md:justify-center  md:gap-4 ${isMinimized ? 'text-xs' : 'text-sm'} md:w-full`}
                >
                    <li className="py-2 text-xs md:w-full  md:bg-secondaryBackground md:px-4 md:text-base ">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                `md:before:mr-1 md:before:content-['-'] ${
                                    isPending
                                        ? 'pending text-secondary'
                                        : isActive
                                          ? 'active text-primary'
                                          : ''
                                }`
                            }
                            to="end-users"
                        >
                            End Users
                        </NavLink>
                    </li>
                    {user?.role === 'super_admin' && (
                        <li className="py-2 text-xs md:w-full md:bg-secondaryBackground md:px-4 md:text-base  ">
                            <NavLink
                                className={({ isActive, isPending }) =>
                                    `md:before:mr-1 md:before:content-['-'] ${
                                        isPending
                                            ? 'pending text-secondary'
                                            : isActive
                                              ? 'active text-primary'
                                              : ''
                                    }`
                                }
                                to="admins"
                            >
                                Admins
                            </NavLink>
                        </li>
                    )}
                    <li className="py-2 text-xs md:w-full md:bg-secondaryBackground md:px-4 md:text-base  ">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                `md:before:mr-1 md:before:content-['-'] ${
                                    isPending
                                        ? 'pending text-secondary'
                                        : isActive
                                          ? 'active text-primary'
                                          : ''
                                }`
                            }
                            to="suppliers"
                        >
                            Suppliers
                        </NavLink>
                    </li>
                    <li className="py-2 text-xs md:w-full md:bg-secondaryBackground md:px-4 md:text-base  ">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                `md:before:mr-1 md:before:content-['-'] ${
                                    isPending
                                        ? 'pending text-secondary'
                                        : isActive
                                          ? 'active text-primary'
                                          : ''
                                }`
                            }
                            to="financial-transactions"
                        >
                            Financial Transactions
                        </NavLink>
                    </li>
                    <li className="py-2 text-xs md:w-full md:bg-secondaryBackground md:px-4 md:text-base  ">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                `md:before:mr-1 md:before:content-['-'] ${
                                    isPending
                                        ? 'pending text-secondary'
                                        : isActive
                                          ? 'active text-primary'
                                          : ''
                                }`
                            }
                            to="orders"
                        >
                            Orders
                        </NavLink>
                    </li>
                    <li className="py-2 text-xs md:w-full md:bg-secondaryBackground md:px-4 md:text-base  ">
                        <NavLink
                            className={({ isActive, isPending }) =>
                                `md:before:mr-1 md:before:content-['-'] ${
                                    isPending
                                        ? 'pending text-secondary'
                                        : isActive
                                          ? 'active text-primary'
                                          : ''
                                }`
                            }
                            to="items"
                        >
                            Items
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default AsideBarMenu
