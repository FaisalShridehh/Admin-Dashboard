import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function AlertError({ message }: { message: string }) {
    return (
        <div className="flex h-[calc(100vh-75px)] items-center justify-center  ">
            <Alert variant="destructive" className="w-[300px] border-2 ">
                <AlertCircle className="h-5 w-5" />
                <AlertTitle className="font-bold">Error</AlertTitle>
                <AlertDescription className="">{message}</AlertDescription>
            </Alert>
        </div>
    )
}
