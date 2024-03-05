"use client"

import { useState } from "react";
import { Tab } from "../videos/page";
import { motion } from "framer-motion";
import ReviewsComponent from "@/components/ui/reviews.component";
import VideoListed from "@/components/ui/video-listed.component";
import { DaySvg } from '@/components/shared/day.component'
import TagLikeComponent from "@/components/ui/tag-like.component";
import TagFansComponent from "@/components/ui/tag-fans.component";
import List from "@/components/ui/general-list.component";
import ButtonComponent from "@/components/shared/button.component";
import PopularSvg from "@/components/shared/popular";
import RecentSvg from "@/components/shared/recent.component";
import FilterComponent from "@/components/shared/filter.component";
import HighestSvg from "@/components/shared/highest";
import LowestSvg from "@/components/shared/lowest";
import NewestSvg from "@/components/shared/newest";
import Oldest from "@/components/shared/oldest";
import MostActiveSvg from "@/components/shared/mostactive";



const tabs: Tab[] = [
    {
        title: "Reviews",
        id: "reviews",
        subheading: "Reviews of “Brunette” videos"
    },
    {
        title: "Lists",
        id: "lists",
        subheading: "Lists featuring “Brunette”"
    },
    {
        title: "Likes",
        id: "likes",
        subheading: "“Brunette” likes"
    },
    {
        title: "Fans",
        id: "fans",
        subheading: "“Brunette” fans"
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

const likeOptions = [
    { name: 'Newest', icon: <NewestSvg /> },
    { name: 'Oldest', icon: <Oldest /> },
];

const fansOptions = [
    { name: 'Most popular', icon: <PopularSvg /> },
    { name: 'Recently active', icon: <RecentSvg /> },
    { name: 'Biggest Fan', icon: <MostActiveSvg /> }
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
            <h1 className="text-xl font-extrabold leading-7">{tabs[activeTabIndex].subheading}</h1>
            <div className="flex relative sm:flex-row-reverse sm:justify-end gap-x-5 items-center">
                <div className='flex items-center gap-x-1'>
                    {activeTabIndex === 0 && <FilterComponent data={reviewOptions} />}
                    {activeTabIndex === 1 && <FilterComponent data={listOptions} />}
                    {activeTabIndex === 2 && <FilterComponent data={likeOptions} />}
                    {activeTabIndex === 3 && <FilterComponent data={fansOptions} />}
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

