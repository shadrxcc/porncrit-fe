"use client"

import ButtonComponent from "@/components/shared/button.component";
import MyModal from "@/components/shared/modal.component";
import ForgottenPasswordComponent from "@/components/ui/forgotten-password.component";

import HeroComponent from "@/components/ui/hero.component";
import IndustryNewsComponent from "@/components/ui/industry-news.component";
import PopularFanComponent from "@/components/ui/popular-fan.component";
import PopularListComponent from "@/components/ui/popular-list.component";
import PopularReviewsComponent from "@/components/ui/popular-reviews.component";
import PorndleComponent from "@/components/ui/porndle.component";
import SignInComponent from "@/components/ui/sign-in.component";
import SignupComponent from "@/components/ui/signup-form.component";
import VerifyEmailComponent from "@/components/ui/verify-email.component";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [verifymail, setVerifyMail] = useState(false)

  const [forgotPassword, setForgotPassword] = useState(false)


  function closeModal() {
    setSignUp(false)
    setLogin(false)
    setForgotPassword(false)
    setVerifyMail(false)
  }

  function openSignUp() {
    setLogin(false)
    setVerifyMail(false)
    setForgotPassword(false)
    setSignUp(true)
  }

  function openLogin() {
    setSignUp(false)
    setForgotPassword(false)
    setVerifyMail(false)
    setLogin(true);

  };

  function openForgotPassword() {
    setSignUp(false)
    setLogin(false)
    setForgotPassword(true)
  }

  function verifyMail() {
    setSignUp(false)
    setVerifyMail(true)
  }

  return (
    <main className="lg:w-4/5 mx-auto">
      <MyModal isOpen={verifymail} closeModal={closeModal}><VerifyEmailComponent /></MyModal>
      <MyModal isOpen={login} closeModal={closeModal}><SignInComponent verify={verifyMail} close={closeModal} signup={openSignUp} forgot={openForgotPassword} /></MyModal>
      <MyModal isOpen={signup} closeModal={closeModal}><SignupComponent verify={verifyMail} login={openLogin} /></MyModal>
      <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPasswordComponent login={openLogin} signup={openSignUp} /></MyModal>
      <HeroComponent signup={openSignUp} />
      {/* <div>
      <div className="flex flex-[2_1_0] flex-col gap-y-5"></div>
      <div className="flex-[1.2_1_0] flex flex-col gap-y-5"></div>
      </div> */}
      {/* <div className="flex mt-11 flex-col sm:flex-row m-auto gap-y-10 lg:gap-x-16 xl:gap-x-20">
      
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
      </div> */}
      <div className="flex mt-11 flex-col sm:flex-row m-auto gap-y-10 sm:gap-x-6 xl:gap-x-20">
        <div className="flex flex-[2_1_0] flex-col gap-y-5">
          <p className="text-xl font-bold">Popular reviews this week</p>
          <div className="flex flex-col gap-y-10">
            {[1, 2, 3, 4].map((e) => (
              <PopularReviewsComponent key={e} />
            ))}
          </div>
        </div>

        <div className="flex-[1.2_1_0] space-y-5">
          <div className="flex flex-col gap-y-5">
            <p className="text-xl font-bold">Popular lists</p>
            <div className="flex flex-col gap-y-7">
              {[1, 2, 3].map((e) => (
                <PopularListComponent key={e} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-6">
            <p className="text-xl font-bold">Most popular fan</p>
            <PopularFanComponent />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-10 lg:gap-x-16 xl:gap-x-20 xl:flex-row mt-11">
        <div className=" flex-[2_1_0] flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3.5">
            <p className="text-xl font-bold">Porndle</p>
            <p className="text-sm">The daily guess the pornstar game</p>
          </div>

          <PorndleComponent />
        </div>

        <div className="flex-[1.2_1_0] space-y-6">
          <div className="flex flex-col gap-y-5">
            <p className="text-xl font-bold">Popular tags this week</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href={`/tags`}>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                  Big boobs
                </ButtonComponent>
              </Link>

              <Link href={`/tags`}>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                  Brunette
                </ButtonComponent>
              </Link>

              <Link href={`/tags`}>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                  Masturbation
                </ButtonComponent>
              </Link>

              <Link href={`/tags`}>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                  Solo
                </ButtonComponent>
              </Link>

              <Link href={`/tags`}>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                  Jilling
                </ButtonComponent>
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="text-xl font-bold">Popular star</p>
            <Link href={`/performer`}> <div className="flex items-center gap-x-2">
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
            </Link>

          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-y-10 lg:gap-x-16 xl:gap-x-20 mt-11">

      </div>

      <div className="flex flex-col gap-y-9 mt-11">
        <p className="text-xl font-bold">Industry news</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
          {[1, 2, 3, 4].map((e) => (
            <IndustryNewsComponent key={e} />
          ))}
        </div>
      </div>
    </main>
  );
}

