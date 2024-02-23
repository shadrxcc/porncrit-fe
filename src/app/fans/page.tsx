"use client"

import FollowerComponent from '@/components/ui/follower.component'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'

const tabs = [
  { id: 1, label: "Popular" },
  { id: 2, label: "Recent" },
  { id: 3, label: "Following" },
];

const page = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className='mx-auto mt-8 flex flex-col gap-y-8 md:w-standard'>
      <div className='w-fit space-y-1'>
        <p className='text-xl font-bold'>Fans</p>
        {/* show when signed in */}
        {/* <p className='text-sm text-mauve'>Connect with fans who love the porn you love</p> */}
        <p className='text-sm text-pink'>Join <span className='text-mauve'>PornCrit to find and follow porn fans</span></p>
      </div>

      <div className='flex flex-col gap-y-7'>
        <div className="flex sm:flex-row-reverse sm:justify-end gap-x-8 items-center">
          <div className='flex items-center gap-x-1'>
            <Image src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' />
          </div>
          <div className="flex overflow-auto no-scroll justify-around gap-x-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`w-fit ${activeTab.id === tab.id
                  ? ""
                  : "hover:text-black/60 font-normal !text-white"
                  } relative px-3 py-1.5 text-sm text-pink font-medium transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {activeTab.id === tab.id && (
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
                {tab.label}
              </button>
            ))}</div>

        </div>

        <div className='flex flex-col gap-11'>
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <FollowerComponent key={e} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default page