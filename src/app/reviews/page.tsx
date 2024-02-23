"use client"

import ButtonComponent from '@/components/shared/button.component'
import PopularReviewsComponent from '@/components/ui/popular-reviews.component'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

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
        <p className='text-xl font-bold'>Reviews</p>
        <p className='text-sm text-pink'>Join <span className='text-mauve'>PornCrit to review the porn you love</span></p>
      </div>

      <div className='flex flex-col gap-y-7'>
        <div className='flex flex-wrap items-center gap-x-8 gap-y-5'>
        <div className="flex justify-around gap-x-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`w-fit ${activeTab.id === tab.id
                  ? ""
                  : "font-normal !text-white"
                  } relative px-3 py-1.5 text-sm text-pink transition `}
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

          <div className='flex items-center gap-x-1'>
            <Image src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' />
          </div>
        </div>

        <div className="flex flex-col gap-y-10">
          {[1, 2, 3, 4].map((e) => (
            <PopularReviewsComponent key={e} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default page