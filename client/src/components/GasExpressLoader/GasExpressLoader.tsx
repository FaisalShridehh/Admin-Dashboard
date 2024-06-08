// import { CircularProgress } from '@nextui-org/react'
import { useTheme } from '@/hooks/useTheme'
import { motion } from 'framer-motion'
import ClipLoader from 'react-spinners/ClipLoader'

export default function GasExpressLoader() {
    const { theme } = useTheme()
    return (
        // <div className="absolute top-0 h-screen w-full">
        <div
            className={` fixed top-0 flex h-screen  w-full flex-col items-center justify-center gap-3 bg-background text-text `}
        >
            <motion.div
                className={`project-logo dark:bg-darkBgColor bg-lightBgColor dark:text-darkTextColor text-lightTextColor  font-sans text-4xl font-bold md:text-6xl`}
                initial={{ scale: 3 }} // Initial animation properties
                animate={{ scale: 3 }} // Animate based on the `animate` state
            >
                <div className="flex flex-col items-center justify-center gap-2">
                    <h1>Gas Express</h1>
                    <div className="flex items-center justify-center gap-2 ">
                        <p className="text-xl font-semibold md:text-2xl  ">
                            Loading
                        </p>
                        <ClipLoader
                            aria-label="Loading..."
                            color={theme === 'dark' ? '#FFFFFF' : '#181C32'}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
        // {/* </div> */}
    )
}
