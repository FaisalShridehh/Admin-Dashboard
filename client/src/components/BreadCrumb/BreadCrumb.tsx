import React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

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
            <p
                // href={'/dashboard'}
                className="overflow-hidden text-ellipsis whitespace-nowrap"
            >
                Dashboard
            </p>
            {items?.map((item: BreadCrumbType, index: number) => (
                <React.Fragment key={item.title}>
                    <ChevronRight className="h-4 w-4" />
                    <p
                        // href={item.link}
                        className={cn(
                            'font-medium',
                            index === items.length - 1
                                ? 'text-foreground pointer-events-none'
                                : 'text-muted-foreground'
                        )}
                    >
                        {item.title}
                    </p>
                </React.Fragment>
            ))}
        </div>
    )
}
