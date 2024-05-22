import ClipLoader from 'react-spinners/ClipLoader'

export default function LoadingSpinner() {
    return (
        <div className="flex flex-col gap-2 h-[calc(100vh-75px)] items-center justify-center text-primary">
            <ClipLoader
                // color="#36d7b7"
                className="!border-primary !border-b-transparent"
                size={72}
                aria-label="Loading Spinner"
        />
        <p className='font-semibold'>Loading...</p>
        </div>
    )
}
