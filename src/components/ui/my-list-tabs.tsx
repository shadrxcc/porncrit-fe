"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ListLikes from "./listlikes.component";
import ListCommentsComponent from "./listcomments.component";
import ListAbout from "./list-about";
import PopularSvg from "../shared/popular";
import NewestSvg from "../shared/newest";
import Oldest from "../shared/oldest";
import HighestSvg from "../shared/highest";
import LowestSvg from "../shared/lowest";
import FilterComponent from "../shared/filter.component";
import { LinkVideoModel, ListData } from "@/services/models/list.model";
import MyListVideos from "./mylist-videos.component";
import MyListComments from "./my-list-comments";



export type Tab = {
  id: string;
  title: string;
};

type TabComponentProps = {
  defaultIndex?: number;
  data: ListData;
  onRefresh?: () => void
  videos: LinkVideoModel[];
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



const MyListTabs = ({ defaultIndex = 0, data, videos, onRefresh }: TabComponentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);
  const [listvideos, setListVideos] = useState('')
  const [listcomments, setListComments] = useState('')
  const [listlikes, setListLikes] = useState('')

  const sortListVideos = (option: string) => {
    switch (option) {
      case "Newest":
        return [...videos]?.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as number);
      case "Oldest":
        return [...videos]?.sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) as number);
      case "Top rated":
        return [...videos]?.sort((a, b) => (b.likesCount - a.likesCount));
      case "Lowest rated":
        return [...videos]?.sort((a, b) => (a.likesCount - b.likesCount));
      default:
        return videos;
    }
  };

  const sortListComments = (option: string) => {
    switch (option) {
      case "Newest":
        return [...data?.comments]?.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as number);
      case "Oldest":
        return [...data?.comments]?.sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) as number);
      case "Most popular":
        return [...data?.comments]?.sort((a, b) => (b.likesCount - a.likesCount));
      default:
        return data?.comments;
    }
  };

  const sortListLikes = (option: string) => {
    switch (option) {
      case "Newest":
        return [...data?.likes]?.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) as number);
      case "Oldest":
        return [...data?.likes]?.sort((a, b) => (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) as number);
      default:
        return data?.likes;
    }
  };


  const filteredvideos = sortListVideos(listvideos)
  const filteredcomments = sortListComments(listcomments)
  const filteredlikes = sortListLikes(listlikes)

  const listVideoChange = (option: string) => {
    setListVideos(option);
  };

  const listCommentChange = (option: string) => {
    setListComments(option);
  };

  const listLikesChange = (option: string) => {
    setListLikes(option);
  };

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <MyListVideos data={filteredvideos} />
      case 1:
        return <MyListComments onRefresh={onRefresh} data={filteredcomments} list={data} />
      case 2:
        return <ListLikes like={filteredlikes} />
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
          {activeTabIndex === 0 && <FilterComponent data={videoOptions} onFilterChange={listVideoChange} />}
          {activeTabIndex === 1 && <FilterComponent data={commentOptions} onFilterChange={listCommentChange} />}
          {activeTabIndex === 2 && <FilterComponent data={likesOptions} onFilterChange={listLikesChange} />}
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
export default MyListTabs