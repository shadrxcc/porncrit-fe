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


export type Tab = {
  id: string;
  title: string;
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
        return <VideoLikedComponent />;
      case 3:
        return <VideoViewed />
      default:
        return null;
    }
  };
  return (
    <div className="flex flex-col lg:flex-col mx-auto justify-center mt-[30px] gap-11 lg:px-20">
      <div className="space-y-8 flex-1">
        <div className="flex flex-col gap-y-3.5">
          <Image
            src={`/assets/images/4some.png`}
            alt=""
            className="w-full"
            height={196}
            width={350}
          />
          <p>Title goes here if needed</p>
          <div className="flex w-full">
            <div className="flex items-center gap-4 overflow-auto no-scroll" style={{ whiteSpace: 'nowrap' }}>
              <ButtonComponent
                className="!gap-x-1.5 flex-1 w-full"
                onClick={() => setWatch(!watch)}
                variant={watch ? "pink" : "outline-pink"}
              >
                <img src="/assets/icons/play.svg" alt="" />{" "}
                {watch ? "Rewatch" : "Watch now"}
              </ButtonComponent>
              <ButtonComponent variant="outline-pink" className="!gap-x-1.5 flex-1 w-full">
                <img src="/assets/icons/add.svg" alt="" /> Save
              </ButtonComponent>
              <ButtonComponent onClick={() => setList(true)} variant="outline-pink" className="!gap-x-1.5 flex-1 w-full">
                <img src="/assets/icons/list.svg" alt="" /> List
              </ButtonComponent>
              <ButtonComponent onClick={() => setLiked(!liked)} variant={liked ? "pink" : "outline-pink"} className="!gap-x-1.5 flex-1 w-full">
                {liked ? "Liked" : <><img src="/assets/icons/white-like.svg" alt="" />Like</>}
              </ButtonComponent>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3">
          <p className="text-sm font-medium">Rate</p>
          <img width={100} src="/assets/images/rating.png" alt="" />
        </div>

        <ButtonComponent onClick={() => setWrite(true)}>
          Write a review
        </ButtonComponent>
        <MyModal closeModal={() => setWrite(false)} isOpen={write}>
          <WriteReview closeModal={() => setWrite(false)} />
        </MyModal>

        <MyModal closeModal={() => setList(false)} isOpen={list}>
          <AddListComponent />
        </MyModal>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>Tags</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-pink`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              ><Disclosure.Panel className="pb-2 pt-3" static>
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
                </Disclosure.Panel></Transition>

            </>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>Performers</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-pink`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              ><Disclosure.Panel className="pb-2 pt-3" static>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-x-2">
                      <img width={50} src="/assets/images/tori.png" alt="tori" />
                      <ButtonComponent className="rounded-[20px]" variant="tags">
                        Tori Black
                      </ButtonComponent>
                    </div>
                  </div>
                </Disclosure.Panel></Transition>

            </>
          )}
        </Disclosure>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                <span>Similar</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-pink`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              ><Disclosure.Panel className="pb-2 pt-3" static>
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
                </Disclosure.Panel></Transition>

            </>
          )}
        </Disclosure>
      </div>
      <div className="space-y-3 flex-[1.5_1_0]">
        <div className="text-sm flex flex-col gap-y-4">
          <div className="flex flex-col sm:flex-row border-b border-pink gap-8">
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
            <div className="flex overflow-auto no-scroll gap-y-5 items-center gap-x-2.5 sm:gap-x-2.5">
              {tabs.map((tab, index) => (
                <a className="text-sm text-nowrap text-center" key={index}>
                  <button
                    className={`${activeTabIndex === index
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
