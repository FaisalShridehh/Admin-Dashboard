// import { CircularProgress } from '@nextui-org/react'
import { motion } from 'framer-motion'
import BarLoader from 'react-spinners/BarLoader'

export default function GasExpressLoader() {
    return (
        // <div className="absolute top-0 h-screen w-full">
        <div
            className={` fixed top-0 bg-background text-text  flex h-screen w-full flex-col items-center justify-center gap-3 `}
        >
            <motion.div
                className={`project-logo dark:bg-darkBgColor bg-lightBgColor dark:text-darkTextColor text-lightTextColor  font-sans text-4xl font-bold md:text-6xl`}
                initial={{ scale: 3 }} // Initial animation properties
                animate={{ scale: 3 }} // Animate based on the `animate` state
            >
                <div className="flex flex-col items-center justify-center">
                    <h1>Gas Express</h1>
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-xl font-semibold md:text-2xl  ">
                            Loading ....
                        </p>
                        <BarLoader
                            // size={72}
                            aria-label="Loading..."
                            // color="default"
                            // strokeWidth={1}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
        // {/* </div> */}
    )
}
