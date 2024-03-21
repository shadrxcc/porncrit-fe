"use client"

import { useEffect, useState } from "react";
import { Tab } from "../../videos/[id]/page";
import { motion } from "framer-motion";
import ReviewsComponent from "@/components/ui/reviews.component";
import VideoListed from "@/components/ui/video-listed.component";
import TagListComponent from "@/components/ui/tag-lists.component";
import TagLikeComponent from "@/components/ui/tag-like.component";
import TagFansComponent from "@/components/ui/tag-fans.component";
import List from "@/components/ui/general-list.component";
import PopularSvg from "@/components/shared/popular";
import RecentSvg from "@/components/shared/recent.component";
import HighestSvg from "@/components/shared/highest";
import LowestSvg from "@/components/shared/lowest";
import NewestSvg from "@/components/shared/newest";
import Oldest from "@/components/shared/oldest";
import MostActiveSvg from "@/components/shared/mostactive";
import FilterComponent from "@/components/shared/filter.component";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import { asyncSearch, selectSearchResults } from "@/services/search-services/async-actions";
import SearchLists from "@/components/ui/search-lists.component";
import SearchFans from "@/components/ui/search-fans.component";
import LoaderComponent from "@/components/shared/loader.component";



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

const page = ({ params }: { params: { query: string } }) => {

  const query = params.query;
  const [activeTabIndex, setActiveTabIndex] = useState(0);


  const dispatch: AppDispatchType = useDispatch();
  const results = useSelector(selectSearchResults);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(asyncSearch({ query })).finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  console.log(results);


  const getTabContent = () => {
    let content;
    let subheading;
    switch (activeTabIndex) {
      case 0:
        content = <ReviewsComponent data={results} />;
        subheading = `“${query}” reviews`;
        break;
      case 1:
        content = <SearchLists />;
        subheading = `“${query}” lists`;
        break;
      case 2:
        content = <TagLikeComponent />;
        subheading = `“${query}” likes`;
        break;
      case 3:
        content = <SearchFans />;
        subheading = `“${query}” fans`;
        break;
      default:
        content = null;
        subheading = '';
    }
    return { content, subheading };
  };


  const { content, subheading } = getTabContent();

  return (
    <div className="space-y-5 md:w-standard mt-8 mx-auto">
      {isLoading && <LoaderComponent />}
      {!isLoading && <>
        <h1 className="text-xl font-extrabold leading-7">{subheading}</h1>
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

        <div className="mt-9">{content}</div>
      </>}

    </div>
  )
}

export default page

