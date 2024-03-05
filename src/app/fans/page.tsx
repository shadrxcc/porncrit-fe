"use client"

import ButtonComponent from '@/components/shared/button.component'
import { DaySvg } from '@/components/shared/day.component'
import FollowerComponent from '@/components/ui/follower.component'
import { motion } from 'framer-motion'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/services/auth-services/selector'
import React, { useState } from 'react'
import WeekSvg from '@/components/shared/week'
import YearSvg from '@/components/shared/year'
import HistorySvg from '@/components/shared/history'
import PopularSvg from '@/components/shared/popular'
import RecentSvg from '@/components/shared/recent.component'
import NewestSvg from '@/components/shared/newest'
import Oldest from '@/components/shared/oldest'
import MostActiveSvg from '@/components/shared/mostactive'
import FilterComponent from '@/components/shared/filter.component'

const tabs = [
  { id: 1, label: "Popular" },
  { id: 2, label: "Recent" },
  { id: 3, label: "Following" },
];


const popularOptions = [
  { name: 'This week', icon: <DaySvg /> },
  { name: 'This month', icon: <WeekSvg /> },
  { name: 'This year', icon: <YearSvg /> },
  { name: 'All time', icon: <HistorySvg /> },
];

const recentOptions = [
  { name: 'Most popular', icon: <PopularSvg /> },
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];

const fansOptions = [
  { name: 'Most popular', icon: <PopularSvg /> },
  { name: 'Biggest Fan', icon: <MostActiveSvg /> },
  { name: 'Recently active', icon: <RecentSvg /> },
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
            {activeTab.id === 1 && <FilterComponent data={popularOptions} />}
            {activeTab.id === 2 && <FilterComponent data={recentOptions} />}
            {activeTab.id === 3 && <FilterComponent data={fansOptions} />}
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