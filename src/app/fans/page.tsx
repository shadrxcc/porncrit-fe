"use client"

import ButtonComponent from '@/components/shared/button.component'
import { DaySvg } from '@/components/shared/day.component'
import FollowerComponent from '@/components/ui/follower.component'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/services/auth-services/selector'
import React, { useState } from 'react'

const tabs = [
  { id: 1, label: "Popular" },
  { id: 2, label: "Recent" },
  { id: 3, label: "Following" },
];

const page = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [sort, setSort] = useState(false)
  const isAuthenticated = useSelector(selectIsAuthenticated);
  
  return (
    <div className='mx-auto mt-8 flex flex-col gap-y-8 md:w-standard'>
      <div className='w-fit space-y-1'>
        <p className='text-xl font-bold'>Fans</p>
        {isAuthenticated ?
          <p className='text-sm text-mauve'>Connect with fans who love the porn you love</p>
          :
          <p className='text-sm text-pink'>Join <span className='text-mauve'>PornCrit to find and follow porn fans</span></p>
        }      
      </div>

      <div className='flex flex-col gap-y-7'>
        <div className="flex relative sm:flex-row-reverse sm:justify-end gap-x-8 items-center">
          <div className='flex items-center gap-x-1'>
          <ButtonComponent onClick={() => setSort(!sort)} variant="secondary"><img src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' /></ButtonComponent>
            {sort ? <>
              {activeTab.id === 1 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 lg:left-auto lg:right-40  flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                <div className='flex items-center gap-x-2'><DaySvg /><p>This week</p></div>
                <div className='flex items-center gap-x-2'><DaySvg /> <p>This Month</p></div>
                <div className='flex items-center gap-x-2'><DaySvg /><p>This Year
                </p></div>
                <div className='flex items-center gap-x-2'><DaySvg /><p>All Time
                </p></div>
              </div> : null}

              {activeTab.id === 2 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 lg:left-auto lg:right-40  flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                <div className='flex items-center gap-x-2'><DaySvg /> <p>Most popular</p></div>
                <div className='flex items-center gap-x-2'><DaySvg /> <p>Top rated</p></div>
                <div className='flex items-center gap-x-2'><DaySvg /> <p>Lowest rated</p></div>
              </div> : null}

              {activeTab.id === 3 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 lg:left-auto lg:right-40  flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                <div className='flex items-center gap-x-2'><DaySvg /> <p>Most popular</p></div>
                <div className='flex items-center gap-x-2'><DaySvg /><p>Most active
                </p></div>
                <div className='flex items-center gap-x-2'><DaySvg /> <p>Recently active
                </p></div>
              </div> : null}
            </> : null}
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