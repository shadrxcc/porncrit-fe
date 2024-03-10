"use client";

import { motion } from "framer-motion";

import React, { useState } from 'react'
import Terms from '@/components/ui/tc'
import Policy from '@/components/ui/policy'
import { Tab } from '../videos/[id]/page';

const tabs: Tab[] = [
    {
        title: "Terms & Conditions",
        id: "t&c",
    },
    {
        title: "Privacy Policy",
        id: "policy",
    }
];

const page = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const onTabClick = (index: number) => {
        setActiveTabIndex(index);
    };

    return (
        <div className='md:w-standard mx-auto flex flex-col gap-y-8'>
            <div className='w-fit space-y-1'>
                <p className='text-xl font-bold'>Terms & Privacy</p>
                <p className='text-sm text-mauve'>Welcome to PornCrit! Here you can find our Terms & Conditions, and Privacy policy.</p>
            </div>
            <div className="flex overflow-auto no-scroll gap-y-5 items-center gap-x-2.5 sm:gap-x-2.5">
                {tabs.map((tab, index) => (
                    <a className="text-sm text-nowrap text-center" key={index}>
                        <button
                            className={`${activeTabIndex === index
                                ? "text-pink"
                                : "text-white"
                                } py-2 px-5 relative font-medium transition focus-visible:outline-2`}
                            style={{
                                WebkitTapHighlightColor: "transparent",
                            }}
                            onClick={() => onTabClick(index)}
                        >
                            {activeTabIndex === index && (
                                <motion.span
                                    layoutId="bubble"
                                    className="absolute h-0.5 rounded-full top-[90%] inset-0 z-10 bg-pink"
                                    transition={{
                                        type: "spring",
                                        bounce: 0.5,
                                        duration: 0.6,
                                    }}
                                />
                            )}

                            {tab.title}
                        </button>
                    </a>
                ))}
            </div>
            {activeTabIndex === 0 ? <Terms /> : null}
            {activeTabIndex === 1 ? <Policy /> : null}
        </div>
    )
}

export default page
