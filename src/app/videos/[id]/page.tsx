"use client";

import ButtonComponent from "@/components/shared/button.component";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import MyModal from "@/components/shared/modal.component";
import WriteReview from "@/components/ui/write-review.component";
import VideoListed from "@/components/ui/video-listed.component";

import VideoViewed from "@/components/ui/video-viewed.component";
import AddListComponent from "@/components/ui/addtolist.component";

import ListCommentComponent from "@/components/ui/listcomment.component";
import ListLikeComponent from "@/components/ui/listlike.component";
import VideoInfo from "@/components/ui/video-info.component";
import Link from "next/link";
import { DaySvg } from '@/components/shared/day.component'
import PopularSvg from "@/components/shared/popular";
import HighestSvg from "@/components/shared/highest";
import LowestSvg from "@/components/shared/lowest";
import NewestSvg from "@/components/shared/newest";
import Oldest from "@/components/shared/oldest";
import FilterComponent from "@/components/shared/filter.component";
import { asyncGetLinkedVideo, selectVideo } from "@/services/video-services/async-actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatchType } from "@/services/config-store";
import { useRouter } from "next/navigation";


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

const viewOptions = [
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];

const likeOptions = [
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Oldest', icon: <Oldest /> },
];


const Video = ({ params }: { params: { id: string } }) => {
  const id = params.id
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [watch, setWatch] = useState(false);
  const [write, setWrite] = useState(false);

  const router = useRouter()

  const [liked, setLiked] = useState(false)
  const [list, setList] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: AppDispatchType = useDispatch();
  const video = useSelector(selectVideo);


  useEffect(() => {
    setIsLoading(true)
    dispatch(asyncGetLinkedVideo({ id }))
      .finally(() => {
        setIsLoading(false)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
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
        return <VideoInfo video={video} />
      default:
        return null;
    }
  };
  return (
    <div className="mx-auto md:w-standard">

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src={video?.image}
          alt=""
          className="object-cover w-auto sm:w-[200px] rounded-[3px]"
          height={282}
          width={200}
        />

        <div className="flex flex-col gap-y-3.5">
          <p className="text-sm font-medium">{video?.title}</p>
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
          <ButtonComponent onClick={() => router.push(`/videos/write-review/${id}`)} className="!py-1 !px-7">
            Write your review
          </ButtonComponent>
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
        <div className="flex relative sm:flex-row-reverse sm:justify-end gap-x-5 items-center">
          <div className='flex items-center gap-x-1'>
            {activeTabIndex === 0 && <FilterComponent data={reviewOptions} />}
            {activeTabIndex === 1 && <FilterComponent data={listOptions} />}
            {activeTabIndex === 2 && <FilterComponent data={likeOptions} />}
            {activeTabIndex === 3 && <FilterComponent data={viewOptions} />}
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
