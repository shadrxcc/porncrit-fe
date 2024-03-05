"use client"

import ButtonComponent from '@/components/shared/button.component'
import PopularReviewsComponent from '@/components/ui/popular-reviews.component'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/services/auth-services/selector'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { DaySvg } from '@/components/shared/day.component'
import LinkVideoInput from '@/components/shared/linkvideo-input'
import WeekSvg from '@/components/shared/week'
import YearSvg from '@/components/shared/year'
import HistorySvg from '@/components/shared/history'
import PopularSvg from '@/components/shared/popular'
import HighestSvg from '@/components/shared/highest'
import LowestSvg from '@/components/shared/lowest'
import NewestSvg from '@/components/shared/newest'
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
  { name: 'Top rated', icon: <HighestSvg /> },
  { name: 'Lowest rated', icon: <LowestSvg /> },
];

const fansOptions = [
  { name: 'Most popular', icon: <PopularSvg /> },
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Top rated', icon: <HighestSvg /> },
  { name: 'Lowest rated', icon: <LowestSvg /> },

];


const page = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [sort, setSort] = useState(false)
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return (
    <div className='mx-auto flex flex-col gap-y-8 md:w-standard'>
      <div className='flex flex-col gap-y-4 border-b pb-7 border-mauve border-opacity-30'>
        <div className='w-fit space-y-1'>
          <p className='text-xl font-bold'>Reviews</p>
          {isAuthenticated ?
            <p className='text-sm text-mauve'>Review the porn you love</p>
            :
            <p className='text-sm text-pink'>Join <span className='text-mauve'>PornCrit to review the porn you love</span></p>
          }

        </div>
        <LinkVideoInput placeholder="Paste the link for a video you want to review. " />
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