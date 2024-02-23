"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ListLikes from "./listlikes.component";
import ListCommentsComponent from "./listcomments.component";
import ListedVideo from "@/components/ui/listedvideo-component"
import ListAbout from "./list-about";



export type Tab = {
  id: string;
  title: string;
};

type TabComponentProps = {
  defaultIndex?: number;
};

const tabs = [
  {
    title: "Videos",
    id: "videos",
  },
  {
    title: "Comments",
    id: "comments",
  },
  {
    title: "Likes",
    id: "likes",
  },
  {
    title: "About",
    id: "about",
  }
];

const ListTabs = ({ defaultIndex = 0 }: TabComponentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <ListedVideo />
      case 1:
        return <ListCommentsComponent />
      case 2:
        return <ListLikes />
      case 3:
        return <ListAbout/>
      default:
        return null;
    }
  };


  return (
    <div>
      <div className="flex sm:flex-row-reverse justify-end gap-x-5 items-center">
        <Image
          src={`/assets/icons/Sort.svg`}
          height={24}
          width={24}
          alt="sort"
        />

        <div className="flex overflow-auto no-scroll gap-y-5 items-center gap-x-5 sm:gap-x-10">
          {tabs.map((tab, index) => (
            <a
              className="text-sm text-nowrap text-center"
              key={index}
            >
              <button
                className={`${activeTabIndex === index ? "text-pink" : "text-white"
                  } py-2 px-5 relative font-medium  transition focus-visible:outline-2`}
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
export default ListTabs