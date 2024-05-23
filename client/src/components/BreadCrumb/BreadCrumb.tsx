import { cn } from '@/lib/utils'
import { ChevronRightIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

type BreadCrumbType = {
    title: string
    link: string
}

type BreadCrumbPropsType = {
    items: BreadCrumbType[]
}

export default function BreadCrumb({ items }: BreadCrumbPropsType) {
    return (
        <div className="text-muted-foreground mb-4 flex items-center space-x-1 text-sm">
            <Link
                to={'/dashboard'}
                className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
                Dashboard
            </Link>
            {items?.map((item: BreadCrumbType, index: number) => (
                <React.Fragment key={item.title}>
                    <ChevronRightIcon className="h-4 w-4" />
                    <Link
                        to={item.link}
                        className={cn(
                            'font-medium',
                            index === items.length - 1
                                ? 'text-foreground pointer-events-none'
                                : 'text-muted-foreground'
                        )}
                    >
                        {item.title}
                    </Link>
                </React.Fragment>
            ))}
        </div>
    )
}
