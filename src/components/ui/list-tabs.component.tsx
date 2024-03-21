"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ListLikes from "./listlikes.component";
import ListCommentsComponent from "./listcomments.component";
import ListedVideo from "@/components/ui/listedvideo-component"
import ListAbout from "./list-about";
import PopularSvg from "../shared/popular";
import NewestSvg from "../shared/newest";
import Oldest from "../shared/oldest";
import HighestSvg from "../shared/highest";
import LowestSvg from "../shared/lowest";
import FilterComponent from "../shared/filter.component";
import { LinkVideoModel, ListData } from "@/services/models/list.model";
import ListVideos from "./listvideos.component";



export type Tab = {
  id: string;
  title: string;
};

type TabComponentProps = {
  defaultIndex?: number;
  data: ListData;
  videos: Partial<LinkVideoModel[]>
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


const videoOptions = [
  { name: 'Top rated', icon: <HighestSvg /> },
  { name: 'Lowest rated', icon: <LowestSvg /> },
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];

const commentOptions = [
  { name: 'Most popular', icon: <PopularSvg /> },
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];

const likesOptions = [
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];



const ListTabs = ({ defaultIndex = 0, data, videos }: TabComponentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <ListVideos data={videos as LinkVideoModel[]} />
      case 1:
        return <ListCommentsComponent data={data}/>
      case 2:
        return <ListLikes like={data?.likes}/>
      case 3:
        return <ListAbout data={data} />
      default:
        return null;
    }
  };


  return (
    <div>
      <div className="flex relative sm:flex-row-reverse justify-end gap-x-5 items-center">
        <div className='flex items-center gap-x-1'>
          {activeTabIndex === 0 && <FilterComponent data={videoOptions} />}
          {activeTabIndex === 1 && <FilterComponent data={commentOptions} />}
          {activeTabIndex === 2 && <FilterComponent data={likesOptions} />}
        </div>

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