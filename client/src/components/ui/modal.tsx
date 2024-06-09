import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface ModalProps {
    title: string
    description: string
    isOpen: boolean
    onClose: () => void
    className?: string
    dialogClassName?: string
    children?: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({
    title,
    description,
    isOpen,
    onClose,
    className = '',
    dialogClassName = '',
    children,
}) => {
    const onChange = (open: boolean) => {
        console.log("trigggered");
        if (!open) {
            onClose()
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent className={dialogClassName}>
                <DialogHeader className="text-text">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className={className}>{children}</div>
            </DialogContent>
        </Dialog>
    )
}
