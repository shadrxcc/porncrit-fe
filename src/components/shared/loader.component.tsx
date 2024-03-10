import React, { useEffect } from 'react';
import { easeInOut, motion, useAnimation } from "framer-motion";

const LoaderComponent = () => {
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            scale: [1, 2, 3, 4],
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: easeInOut,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 0.3,
            },
        });
    }, [controls]);

    return (
        <div className='h-screen w-full'>
            <motion.img src='/icon.png'
            width={10}
            className='loader w-2.5 h-2.5 mt-[40px] mx-auto rounded-[50%] bg-pink'
            initial={{ scale: 1, opacity: 0 }}
            animate={controls}
        />
        </div>
    );
};

export default LoaderComponent;
