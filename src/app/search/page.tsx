"use client"

import { useState } from "react";
import { Tab } from "../videos/page";
import { motion } from "framer-motion";
import ReviewsComponent from "@/components/ui/reviews.component";
import VideoListed from "@/components/ui/video-listed.component";
import TagListComponent from "@/components/ui/tag-lists.component";
import TagLikeComponent from "@/components/ui/tag-like.component";
import TagFansComponent from "@/components/ui/tag-fans.component";
import List from "@/components/ui/general-list.component";



const tabs: Tab[] = [
  {
    title: "Reviews",
    id: "reviews",
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
    title: "Fans",
    id: "fans",
  },
];

const page = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <ReviewsComponent />;
      case 1:
        return <List />;
      case 2:
        return <TagLikeComponent />;
      case 3:
        return <TagFansComponent />
      default:
        return null;
    }
  };


  return (
    <div className="space-y-5 md:w-standard mt-8 mx-auto">
      <h1 className="text-xl font-extrabold leading-7">“Search query goes here”</h1>
      <div className="flex sm:flex-row-reverse justify-end gap-x-5 items-center">
      <div className="flex items-center gap-x-1">
          <img
            src={`/assets/icons/Sort.svg`}
            height={24}
            width={24}
            alt="sort"
          />
        </div>
        <div className="flex overflow-auto no-scroll gap-y-5 items-center gap-x-2.5 sm:gap-x-12">
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
      </div>

      <div className="mt-9">{getTabContent()}</div>
    </div>
  )
}

export default page

