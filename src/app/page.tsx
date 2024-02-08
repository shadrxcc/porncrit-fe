import ButtonComponent from "@/components/shared/button.component";

import HeroComponent from "@/components/ui/hero.component";
import IndustryNewsComponent from "@/components/ui/industry-news.component";
import PopularFanComponent from "@/components/ui/popular-fan.component";
import PopularListComponent from "@/components/ui/popular-list.component";
import PopularReviewsComponent from "@/components/ui/popular-reviews.component";
import PorndleComponent from "@/components/ui/porndle.component";

import WatchedActivity from "@/components/ui/watched-activity.component";
import UserFollowedComponent from "@/components/ui/userfollowed.component";
import UserCommentedComponent from "@/components/ui/usercomment-activity.component";
import SuggestedFanComponent from "@/components/ui/suggestedfan.component";

export default function Home() {
  return (
    <main className="">
      <HeroComponent />
      <div className="flex px-4 lg:px-16 xl:px-32 mt-11 flex-col lg:flex-row m-auto gap-y-10 lg:gap-x-16 xl:gap-x-20">
        {/* show when a user has a following list */}
        <div className="flex flex-[2_1_0] flex-col gap-y-5">
          <p className="text-xl font-bold">Recent activity</p>
          <div className="flex flex-col gap-y-7">
            <div className="flex flex-col gap-y-7">
              <WatchedActivity />
              <UserFollowedComponent />
              <UserCommentedComponent />
            </div>
            <p className="text-mauve text-sm font-medium">See more</p>
          </div>
        </div>

        <div className="flex-[1.2_1_0] flex flex-col gap-y-5">
          <p className="text-xl font-bold">Suggested fans</p>
          <div className="flex flex-col gap-y-7">
            <SuggestedFanComponent />
          </div>
        </div>
      </div>
      <div className="flex px-4 lg:px-16 xl:px-32 mt-11 flex-col lg:flex-row m-auto gap-y-10 lg:gap-x-16 xl:gap-x-20">
        <div className="flex flex-[2_1_0] flex-col gap-y-5">
          <p className="text-xl font-bold">Popular reviews this week</p>
          <div className="flex flex-col gap-y-10">
            {[1, 2, 3, 4].map((e) => (
              <PopularReviewsComponent key={e} />
            ))}
          </div>
        </div>

        <div className="flex-[1.2_1_0] flex flex-col gap-y-5">
          <p className="text-xl font-bold">Popular lists</p>
          <div className="flex flex-col gap-y-7">
            {[1, 2, 3, 4, 5].map((e) => (
              <PopularListComponent key={e} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-10 lg:gap-x-16 xl:gap-x-20 lg:flex-row px-4 lg:px-12 xl:px-32 mt-11">
        <div className=" flex-[2_1_0] flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3.5">
            <p className="text-xl font-bold">Porndle</p>
            <p className="text-sm">The daily guess the pornstar game</p>
          </div>

          <PorndleComponent />
        </div>

        <div className="flex-[1.2_1_0] flex flex-col gap-y-6">
          <p className="text-xl font-bold">Most popular fan</p>
          <PopularFanComponent />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row px-4 gap-y-10 lg:gap-x-16 xl:gap-x-20 lg:px-12 xl:px-32 mt-11">
        <div className="flex flex-[2_1_0] flex-col gap-y-5">
          <p className="text-xl font-bold">Popular tags this week</p>
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
            <ButtonComponent className="rounded-[20px]" variant="tags">
              Solo
            </ButtonComponent>
            <ButtonComponent className="rounded-[20px]" variant="tags">
              Jilling
            </ButtonComponent>
          </div>
        </div>

        <div className="flex flex-[1.2_1_0] flex-col gap-y-3">
          <p className="text-xl font-bold">Popular tags this week</p>
          <div className="flex items-center gap-x-2">
            <img
              className="cursor-pointer"
              width={50}
              src="/assets/images/tori.png"
              alt="tori"
            />
            <ButtonComponent className="rounded-[20px]" variant="tags">
              Tori Black
            </ButtonComponent>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-12 xl:px-32 flex flex-col gap-y-9 mt-11">
        <p className="text-xl font-bold">Industry news</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-y-7 gap-x-10">
          {[1, 2, 3].map((e) => (
            <IndustryNewsComponent key={e} />
          ))}
        </div>
      </div>
    </main>
  );
}
