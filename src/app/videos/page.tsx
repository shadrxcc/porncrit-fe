"use client";

import ButtonComponent from "@/components/shared/button.component";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import MyModal from "@/components/shared/modal.component";
import WriteReview from "@/components/ui/write-review.component";
import VideoListed from "@/components/ui/video-listed.component";
import VideoLikedComponent from "@/components/ui/video-liked.component";
import VideoViewed from "@/components/ui/video-viewed.component";
import AddListComponent from "@/components/ui/addtolist.component";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import ListCommentComponent from "@/components/ui/listcomment.component";
import ListLikeComponent from "@/components/ui/listlike.component";
import VideoInfo from "@/components/ui/video-info.component";
import Link from "next/link";


export type Tab = {
  id: string;
  title: string;
  subheading?: string
};

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
    title: "Views",
    id: "views",
  },
  {
    title: "Info",
    id: "info",
  },
];

const Video = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [watch, setWatch] = useState(false);
  const [write, setWrite] = useState(false);
  const [liked, setLiked] = useState(false)
  const [list, setList] = useState(false)

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <ListCommentComponent />;
      case 1:
        return <VideoListed />;
      case 2:
        return <ListLikeComponent />;
      case 3:
        return <VideoViewed />
      case 4:
        return <VideoInfo />
      default:
        return null;
    }
  };
  return (
    <div className="mx-auto md:w-standard">

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src={`/assets/images/4some.png`}
          alt=""
          className="object-cover w-auto sm:w-min"
          height={282}
          width={200}
        />

        <div className="flex flex-col gap-y-3.5">
          <p className="text-sm font-medium">Title goes here if needed</p>
          <div className="flex gap-x-3 items-center">
            <img width={150} src="/assets/images/rating.png" alt="" />
            <p className="text-[10px] font-medium">based on 18.4k ratings</p>
          </div>
          <div className="flex items-center gap-4 overflow-auto no-scroll" style={{ whiteSpace: 'nowrap' }}>
            <ButtonComponent
              className="!gap-x-1.5 !p-2 !text-xs flex-1 !w-24"
              onClick={() => setWatch(!watch)}
              variant={watch ? "pink" : "outline-pink"}
            >
              <img src="/assets/icons/play.svg" alt="" />{" "}
              {watch ? "Rewatch" : "Watch now"}
            </ButtonComponent>
            <ButtonComponent variant="outline-pink" className="!gap-x-1.5 !text-xs !p-2 flex-1 !w-24">
              <img src="/assets/icons/add.svg" alt="" /> Save
            </ButtonComponent>
            <ButtonComponent onClick={() => setLiked(!liked)} variant={liked ? "pink" : "outline-pink"} className="!gap-x-1.5 !text-xs !p-2 flex-1 !w-24">
              {liked ? "Liked" : <><img src="/assets/icons/white-like.svg" alt="" />Like</>}
            </ButtonComponent>
          </div>
        </div>
      </div>


      <div className="flex mt-10 items-center justify-between bg-box rounded-box px-3 py-6">
        <div className="flex items-center gap-x-3">
          <img src="/assets/images/user.png" width={35} alt="" />
          <Link href={`/videos/write-review`}>
          <ButtonComponent className="!py-1 !px-7">
            Write your review
          </ButtonComponent>
          </Link>
        </div>

        <img width={100} src="/assets/images/rating.png" alt="" />
      </div>


      <MyModal closeModal={() => setWrite(false)} isOpen={write}>
        <WriteReview closeModal={() => setWrite(false)} />
      </MyModal>

      <MyModal closeModal={() => setList(false)} isOpen={list}>
        <AddListComponent />
      </MyModal>


      <div className="mt-9">
        <div className="flex sm:flex-row-reverse justify-end gap-x-5 items-center">
          <div className="flex items-center gap-x-1">
            <Image
              src={`/assets/icons/Sort.svg`}
              height={24}
              width={24}
              alt="sort"
            />
          </div>
          <div className="flex overflow-auto no-scroll gap-y-5 items-center gap-x-2.5 sm:gap-x-2.5">
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

      </div>
      <div className="mt-9">{getTabContent()}</div>
    </div>
  );
};

export default Video;
