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

const page = () => {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const [sort, setSort] = useState(false)
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
            <div className="flex relative sm:flex-row-reverse justify-end gap-x-5 items-center">
                <div className='flex items-center gap-x-1'>
                    <ButtonComponent onClick={() => setSort(!sort)} variant="secondary"><img src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' /></ButtonComponent>

                    {sort ? <>
                        {activeTabIndex === 0 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 lg:left-auto lg:right-32  flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                            <div className='flex items-center gap-x-2'><DaySvg /> <p>Most popular</p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /><p>Top rated</p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /> <p>Lowest rated</p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /><p>Newest</p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /> <p>Oldest</p></div>
                        </div> : null}

                        {activeTabIndex === 1 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 lg:left-auto lg:right-32 flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                            <div className='flex items-center gap-x-2'><DaySvg /> <p>Most popular</p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /><p>Newest</p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /> <p>Oldest</p></div>
                        </div> : null}

                        {activeTabIndex === 2 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 lg:left-auto lg:right-32 flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                            <div className='flex items-center gap-x-2'><DaySvg /><p>Newest</p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /> <p>Oldest</p></div>
                        </div> : null}
                        {activeTabIndex === 3 ? <div className="flex absolute border border-mauve w-fit top-12 text-xs left-0 lg:left-auto lg:right-32  flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                            <div className='flex items-center gap-x-2'><DaySvg /><p>Most popular
                            </p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /> <p>Recently active
                            </p></div>
                            <div className='flex items-center gap-x-2'><DaySvg /> <p>Biggest Fan
                            </p></div>
                        </div> : null}
                    </> : null}
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

