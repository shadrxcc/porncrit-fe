"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import MyLikes from "./mylikes.component";
import MyFollowers from "./myfollowers";
import MyActivityComponent from "./myactivity.component";
import MyLists from "./mylist.component";
import MyWatched from "./mywatched.component";
import UserReviews from "./user-reviews.component";
import UserAbout from "./user-bio";
import UserLists from "./user-list";
import { DaySvg } from '@/components/shared/day.component'
import ButtonComponent from "../shared/button.component";
import PopularSvg from "../shared/popular";
import HighestSvg from "../shared/highest";
import LowestSvg from "../shared/lowest";
import NewestSvg from "../shared/newest";
import Oldest from "../shared/oldest";
import FilterComponent from "../shared/filter.component";


export type Tab = {
  id: string;
  title: string;
};

type TabComponentProps = {
  defaultIndex?: number;
};

const tabs = [
  {
    title: "Reviews",
    id: "reviews",
  },
  {
    title: "Lists",
    id: "lists",
  },
  {
    title: "Friends",
    id: "friends",
  },
  {
    title: "Likes",
    id: "likes",
  },
  {
    title: "About",
    id: "about",
  },
];

const reviewOptions = [
  { name: 'Most popular', icon: <PopularSvg /> },
  { name: 'Top rated', icon: <HighestSvg /> },
  { name: 'Lowest rated', icon: <LowestSvg /> },
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];

const listOptions = [
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];

const fansOptions = [
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];

const likeOptions = [
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];




const UserProfileTabComponent = ({ defaultIndex = 0 }: TabComponentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <UserReviews />
      case 1:
        return <UserLists />
      case 2:
        return <MyFollowers />
      case 3:
        return <MyLikes />
      case 4:
        return <UserAbout />
      default:
        return null;
    }
  };


  return (
    <div>
      <div className="flex relative sm:flex-row-reverse justify-end gap-x-5 items-center">
        <div className='flex items-center gap-x-1'>
          {activeTabIndex === 0 && <FilterComponent data={reviewOptions} />}
          {activeTabIndex === 1 && <FilterComponent data={listOptions} />}
          {activeTabIndex === 3 && <FilterComponent data={likeOptions} />}
          {activeTabIndex === 2 && <FilterComponent data={fansOptions} />}
        </div>
        <div className="flex overflow-auto no-scroll gap-y-5 items-center gap-x-5 sm:gap-x-10">
          {tabs.map((tab, index) => (
            <a
              className="text-sm text-nowrap text-center"
              key={index}
            >
              <button
                className={`${activeTabIndex === index ? "text-pink" : "text-white"
                  } py-2 px-5 relative font-medium  transition`}
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
      </div>

      <div className="mt-9">
        {getTabContent()}
      </div>
    </div>
  );
};

export default UserProfileTabComponent;


