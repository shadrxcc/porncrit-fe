"use client";

import ButtonComponent from "@/components/shared/button.component";
import ListCommentsComponent from "@/components/ui/listcomments.component";

import ListLikes from "@/components/ui/listlikes.component";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import MyModal from "@/components/shared/modal.component";
import WriteReview from "@/components/ui/write-review.component";
import VideoListed from "@/components/ui/video-listed.component";
import VideoLikedComponent from "@/components/ui/video-liked.component";
import VideoViewed from "@/components/ui/video-viewed.component";

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
    title: "Likes",
    id: "likes",
  },
  {
    title: "Views",
    id: "views",
  },
];

const Video = ({ defaultIndex = 0 }: TabComponentProps) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);
  const [watch, setWatch] = useState(false);
  const [write, setWrite] = useState(false);

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  const getTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <ListCommentsComponent />;
      case 1:
        return <VideoListed />;
      case 2:
        return <VideoLikedComponent />;
      case 3:
        return <VideoViewed/>
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col lg:flex-row mx-auto justify-center mt-[30px] gap-11">
      <div className="space-y-3.5">
        <div className="flex flex-col gap-y-3.5">
          <Image
            src={`/assets/images/4some.png`}
            alt=""
            className="w-full"
            height={196}
            width={350}
          />
          <p>Title goes here if needed</p>
          <div className="flex items-center gap-4 flex-wrap">
            <ButtonComponent
              className="!gap-x-1.5"
              onClick={() => setWatch(!watch)}
              variant={watch ? "pink" : "outline-pink"}
            >
              <img src="/assets/icons/play.svg" alt="" />{" "}
              {watch ? "Rewatch" : "Watch now"}
            </ButtonComponent>
            <ButtonComponent variant="outline-pink" className="!gap-x-1.5">
              <img src="/assets/icons/add.svg" alt="" /> Save
            </ButtonComponent>
            <ButtonComponent variant="outline-pink" className="!gap-x-1.5">
              <img src="/assets/icons/list.svg" alt="" /> List
            </ButtonComponent>
            <ButtonComponent variant="outline-pink" className="!gap-x-1.5">
              <img src="/assets/icons/white-like.svg" alt="" /> Like
            </ButtonComponent>
          </div>
        </div>
        <div>
          <p>Rate</p>
          <img src="/assets/rating.png" alt="" />
        </div>

        <ButtonComponent onClick={() => setWrite(true)}>
          Write a review
        </ButtonComponent>
        <MyModal closeModal={() => setWrite(false)} isOpen={write}>
          <WriteReview closeModal={() => setWrite(false)} />
        </MyModal>

        <div className="flex flex-col gap-y-3">
          <p className="text-sm font-medium">Tags</p>
          <div className="flex flex-wrap items-center gap-4">
            <ButtonComponent className="rounded-[20px]" variant="tags">
              Big boobs
            </ButtonComponent>
            <ButtonComponent className="rounded-[20px]" variant="tags">
              Brunette
            </ButtonComponent>
            <ButtonComponent className="rounded-[20px]" variant="tags">
              Masturbation
            </ButtonComponent>
          </div>
          <div></div>
        </div>

        <div className="flex flex-col gap-y-3">
          <p className="text-sm font-medium">Performers</p>
          <div className="flex items-center gap-x-2">
            <img width={50} src="/assets/images/tori.png" alt="tori" />
            <ButtonComponent className="rounded-[20px]" variant="tags">
              Tori Black
            </ButtonComponent>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <p className="text-sm font-medium">Similar</p>
          <div className="flex flex-wrap items-center gap-4">
            <Image
              src={`/assets/images/videothumb.png`}
              className="rounded-[1.5px]"
              width={106}
              height={60}
              alt=""
            />
            <Image
              src={`/assets/images/sexyvideo.png`}
              className="rounded-[1.5px]"
              width={106}
              height={60}
              alt=""
            />
            <Image
              src={`/assets/images/hotvideo.png`}
              className="rounded-[1.5px]"
              width={106}
              height={60}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="space-y-3 lg:w-5/12">
        <div className="text-sm flex flex-col gap-y-4">
          <div className="flex flex-col sm:flex-row border-b border-pink gap-6">
            <div className="flex flex-col gap-y-2">
              <p className="text-sm">
                Rating average <span className="text-pink font-black">4.6</span>
              </p>
              <div className="flex items-center gap-x-1.5">
                <img src="/assets/images/rating.png" width={50} alt="" />
                <p className="text-xs">based on 18.4k ratings</p>
              </div>
            </div>

            <div>
              <img src="/assets/images/chart.svg" width={164} alt="" />
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-5 items-center">
            <div className="flex flex-wrap gap-y-5 items-center gap-x-2.5 sm:gap-x-2.5">
              {tabs.map((tab, index) => (
                <a className="text-sm text-nowrap text-center" key={index}>
                  <button
                    className={`${
                      activeTabIndex === index
                        ? "text-pink bg-white"
                        : "border border-mauve text-white"
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
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
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

          <div className="mt-9">{getTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Video;
