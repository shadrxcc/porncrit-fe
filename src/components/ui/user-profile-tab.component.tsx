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


export type Tab = {
  id: string;
  title: string;
};

type TabComponentProps = {
  defaultIndex?: number;
};

const tabs = [
  {
    title: "Watched",
    id: "watched",
  },
  {
    title: "Reviews",
    id: "reviews",
  },
  {
    title: "Activity",
    id: "activity",
  },
  {
    title: "Lists",
    id: "lists",
  },
  {
    title: "Likes",
    id: "likes",
  },
  {
    title: "Followers",
    id: "followers",
  },
];

const UserProfileTabComponent = ({ defaultIndex = 0 }: TabComponentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getTabContent = () => {
    switch (activeTabIndex) {
        case 0:
            return <MyWatched/>
        case 1:
            return <UserReviews/>
        case 2:
            return <MyActivityComponent/>
        case 3:
            return <MyLists/>
        case 4:
            return <MyLikes/>
        case 5:
            return <MyFollowers/>
        default:
            return null;
    }
};


  return (
    <div>
      <div className="flex flex-wrap gap-5 items-center">
        <div className="flex flex-wrap gap-y-5 items-center gap-x-5 sm:gap-x-10">
          {tabs.map((tab, index) => (
            <a
              className="text-sm text-nowrap text-center"
              key={index}
            >
              <button
                className={`${
                  activeTabIndex === index ? "text-pink bg-white" : "border border-mauve text-white"
                } py-2 px-5 relative rounded-full font-medium  transition focus-visible:outline-2`}
                style={{
                  WebkitTapHighlightColor: "transparent",
                }}
                onClick={() => onTabClick(index)}
              >
                {activeTabIndex === index && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute inset-0 z-10 bg-transparent"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                {tab.title}
              </button>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-x-1">
          <Image
            src={`/assets/icons/Sort.svg`}
            height={24}
            width={24}
            alt="sort"
          />
          <p className="text-xs">Sort by</p>
        </div>
      </div>

      <div className="mt-9">
        {getTabContent()}
      </div>
    </div>
  );
};

export default UserProfileTabComponent;
