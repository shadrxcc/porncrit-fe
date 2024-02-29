"use client"

import List from '@/components/ui/general-list.component'
import { motion } from 'framer-motion'

import Image from 'next/image'
import { DaySvg } from '@/components/shared/day.component'
import React, { useEffect, useRef, useState } from 'react'
import ButtonComponent from '@/components/shared/button.component'
import { useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/services/auth-services/selector'
import HistorySvg from '@/components/shared/history'
import WeekSvg from '@/components/shared/week'
import YearSvg from '@/components/shared/year'
import PopularSvg from '@/components/shared/popular'
import LinkVideoInput from '@/components/shared/linkvideo-input'
import Link from 'next/link'

const tabs = [
  { id: 1, label: "Popular" },
  { id: 2, label: "Recent" },
  { id: 3, label: "Following" },
];


const page = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [sort, setSort] = useState(false)
  const trigger = useRef<HTMLButtonElement | null>(null);
  const dropdwn = useRef<HTMLDivElement | null>(null);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdwn.current) return;
      const targetNode = target as Node;
      if (
        !sort ||
        dropdwn.current.contains(targetNode) ||
        trigger.current?.contains(targetNode)
      )
        return;
      setSort(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <div className='mx-auto flex flex-col gap-y-8  md:w-standard'>
      <div className='flex flex-col gap-y-4 border-b pb-7 border-mauve border-opacity-30'>
        <div className='w-fit space-y-1'>
          <p className='text-xl font-bold'>Lists</p>
          {isAuthenticated ?
            <p className='text-sm text-pink'>
              Create <span className='text-mauve'>and share lists of the porn you love</span>
            </p>
            :
            <p className='text-sm text-pink'>
              Join <span className='text-mauve'>PornCrit to create and share lists of the porn you love</span>
            </p>
          }
        </div>
        <Link href={`/my-account/lists/new`}><ButtonComponent className='!w-fit place-self-center'>Create your own list</ButtonComponent></Link>
      </div>


      <div className='flex flex-col gap-y-7'>
        <div className="flex relative sm:flex-row-reverse sm:justify-end gap-x-8 items-center">
          <div className='flex items-center gap-x-1'>
            <ButtonComponent ref={trigger} onClick={() => setSort(!sort)} variant="secondary"><img src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' /></ButtonComponent>
            {sort ? <>
              {activeTab.id === 1 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 sm:left-auto sm:right-40  flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                <div className='flex items-center gap-x-2'><DaySvg /><p>This week</p></div>
                <div className='flex items-center gap-x-2'><WeekSvg /> <p>This Month</p></div>
                <div className='flex items-center gap-x-2'><YearSvg /><p>This Year
                </p></div>
                <div className='flex items-center gap-x-2'><HistorySvg /><p>All Time
                </p></div>
              </div> : null}

              {activeTab.id === 2 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 sm:left-auto sm:right-40  flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                <div className='flex items-center gap-x-2'><PopularSvg /> <p>Most popular</p></div>
                <div className='flex items-center gap-x-2'><img src="/assets/icons/highest.svg" alt="" /> <p>Top rated</p></div>
                <div className='flex items-center gap-x-2'><img src="/assets/icons/lowest.svg" alt="" />  <p>Lowest rated</p></div>
              </div> : null}

              {activeTab.id === 3 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 sm:left-auto sm:right-40  flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                <div className='flex items-center gap-x-2'><DaySvg /> <p>Most popular</p></div>
                <div className='flex items-center gap-x-2'><DaySvg /><p>Newest</p></div>
                <div className='flex items-center gap-x-2'><DaySvg /> <p>Oldest</p></div>
                <div className='flex items-center gap-x-2'><img src="/assets/icons/highest.svg" alt="" /> <p>Top rated</p></div>
                <div className='flex items-center gap-x-2'><img src="/assets/icons/lowest.svg" alt="" />  <p>Lowest rated</p></div>
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

        <div className="flex flex-col gap-y-10">
          {[1, 2, 3, 4].map((e) => (
            <List key={e} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default page