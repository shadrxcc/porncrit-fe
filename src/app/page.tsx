"use client"

import ButtonComponent from "@/components/shared/button.component";
import MyModal from "@/components/shared/modal.component";
import FollowerComponent from "@/components/ui/follower.component";
import ForgottenPasswordComponent from "@/components/ui/forgotten-password.component";

import HeroComponent from "@/components/ui/hero.component";
import PopularListComponent from "@/components/ui/popular-list.component";
import PopularReviewsComponent from "@/components/ui/popular-reviews.component";
import PorndleComponent from "@/components/ui/porndle.component";
import ConfirmOtpComponent, { PasswordResetComponent } from "@/components/ui/reset-password.component";
import SignInComponent from "@/components/ui/sign-in.component";
import SignupComponent from "@/components/ui/signup-form.component";
import VerifyEmailComponent from "@/components/ui/verify-email.component";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [signup, setSignUp] = useState(false);
  const [login, setLogin] = useState(false);
  const [verifymail, setVerifyMail] = useState(false)
  const [reset, setReset] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [confirmreset, setConfirmReset] = useState(false)
  const [enteredEmail, setEnteredEmail] = useState("");
  const [userId, setUserId] = useState("")
  const [resetToken, setResetToken] = useState("")



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
    setReset(false)
    setLogin(true);

  };

  function openReset(userId: string, resettoken: string) {
    setUserId(userId)
    setResetToken(resettoken)
    setSignUp(false)
    setForgotPassword(false)
    setVerifyMail(false)
    setConfirmReset(false)
    setReset(true)
  };


  function openForgotPassword() {
    setSignUp(false)
    setLogin(false)
    setForgotPassword(true)
  }

  function openResetPassword(email: string) {
    setEnteredEmail(email)
    setLogin(false)
    setForgotPassword(false)
    setConfirmReset(true)
  }

  function verifyMail(email: string, userId: string) {
    setEnteredEmail(email)
    setUserId(userId)
    setSignUp(false)
    setLogin(false)
    setVerifyMail(true)
  }

  return (
    <main className="md:w-standard mx-auto">
      <MyModal isOpen={verifymail} closeModal={closeModal}><VerifyEmailComponent email={enteredEmail} userId={userId} signin={openLogin} /></MyModal>
      <MyModal isOpen={login} closeModal={closeModal}><SignInComponent verify={verifyMail} close={closeModal} signup={openSignUp} forgot={openForgotPassword} /></MyModal>
      <MyModal isOpen={signup} closeModal={closeModal}><SignupComponent verify={verifyMail} login={openLogin} /></MyModal>
      <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPasswordComponent reset={openResetPassword} login={openLogin} signup={openSignUp} /></MyModal>
      <MyModal isOpen={confirmreset} closeModal={closeModal}><ConfirmOtpComponent email={enteredEmail} reset={openReset} /></MyModal>
      <MyModal isOpen={reset} closeModal={closeModal}><PasswordResetComponent toKen={resetToken} userid={userId} login={openLogin} /></MyModal>
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
      <div className="flex mt-11 flex-col m-auto gap-y-10 sm:gap-x-6 xl:gap-x-20">
        <div className="flex flex-col gap-y-5">
          <div className="space-y-2.5"><p className="text-xl font-bold">Popular reviews this week</p>
            <p className='text-sm text-mauve'>Click the video title to discover popular videos reviewed by fans</p></div>

          <div className="flex flex-col gap-y-10">
            {[1, 2, 3, 4].map((e) => (
              <PopularReviewsComponent key={e} />
            ))}
          </div>
        </div>

        <div className="space-y-11">
          <div className="flex flex-col gap-y-5">
            <div className="space-y-2.5">
              <p className="text-xl font-bold">Popular lists</p>
              <p className='text-sm text-mauve'>
                Click the list title to explore the fans catalogue
              </p>
            </div>
            <p className="text-xl font-bold"></p>
            <div className="flex flex-col gap-y-7">
              {[1, 2, 3].map((e) => (
                <PopularListComponent key={e} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-y-6">
            <div className="space-y-2.5">
              <p className="text-xl font-bold">Most popular fan this week</p>
              <p className='text-sm text-mauve'>
                Join PornCrit to connect with the biggest porn fans
              </p>
            </div>

            <FollowerComponent />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-10 lg:gap-x-16 xl:gap-x-20 mt-11">
        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2.5">
            <p className="text-xl font-bold">Porndle</p>
            <p className="text-sm text-mauve">The daily guess the pornstar game</p>
          </div>

          <PorndleComponent />
        </div>

        <div className="space-y-6 mt-11">
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-2.5">
              <p className="text-xl font-bold">Popular tags this week</p>
              <p className="text-sm text-mauve">Click a tag to find videos fans have reviewed, listed and liked</p>
            </div>
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

          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-y-2.5">
              <p className="text-xl font-bold">Most popular pornstar this week</p>
              <p className="text-sm text-mauve">Click on a stars name to discover their most popular videos</p>
            </div>

            <Link href={`/performer`}>
              <div className="flex items-center gap-x-2">
                <img
                  className="cursor-pointer"
                  width={40}
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

      {/* <div className="flex flex-col gap-y-9 mt-11">
        <p className="text-xl font-bold">Industry news</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-7">
          {[1, 2, 3, 4].map((e) => (
            <IndustryNewsComponent key={e} />
          ))}
        </div>
      </div> */}
    </main>
  );
}

