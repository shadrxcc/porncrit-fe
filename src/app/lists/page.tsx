"use client"

import List from '@/components/ui/general-list.component'
import { motion } from 'framer-motion'

import { DaySvg } from '@/components/shared/day.component'
import React, { useEffect, useState } from 'react'
import ButtonComponent from '@/components/shared/button.component'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/services/auth-services/selector'
import HistorySvg from '@/components/shared/history'
import WeekSvg from '@/components/shared/week'
import YearSvg from '@/components/shared/year'
import PopularSvg from '@/components/shared/popular'
import Link from 'next/link'
import NewestSvg from '@/components/shared/newest'
import Oldest from '@/components/shared/oldest'

import HighestSvg from '@/components/shared/highest'
import LowestSvg from '@/components/shared/lowest'
import FilterComponent from '@/components/shared/filter.component'
import { useRouter } from 'next/navigation'
import { useAuthModal } from '@/context/auth-modal-context'
import MyModal from '@/components/shared/modal.component'
import VerifyEmailComponent from '@/components/ui/verify-email.component'
import SignInComponent from '@/components/ui/sign-in.component'
import SignupComponent from '@/components/ui/signup-form.component'
import ForgottenPasswordComponent from '@/components/ui/forgotten-password.component'
import ConfirmOtpComponent, { PasswordResetComponent } from '@/components/ui/reset-password.component'
import { AppDispatchType } from '@/services/config-store'
import { asyncGetAllLists, selectAllList } from '@/services/list-services/async-actions'
import LoaderComponent from '@/components/shared/loader.component'

const tabs = [
  { id: 1, label: "Popular" },
  { id: 2, label: "Recent" },
  { id: 3, label: "Following" },
];


const page = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const { signup,
    login, forgotPassword,
    verifymail, reset,
    confirmreset,
    enteredEmail, userId,
    resetToken, openForgotPassword,
    openResetPassword, verifyMail,
    openLogin, openSignUp, closeModal, openReset } = useAuthModal();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch: AppDispatchType = useDispatch();
  const lists = useSelector(selectAllList);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(asyncGetAllLists()).finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const router = useRouter()

  const popularOptions = [
    { name: 'This week', icon: <DaySvg /> },
    { name: 'This month', icon: <WeekSvg /> },
    { name: 'This year', icon: <YearSvg /> },
    { name: 'All time', icon: <HistorySvg /> },
  ];

  const recentOptions = [
    { name: 'Most popular', icon: <PopularSvg /> },
    { name: 'Top rated', icon: <HighestSvg /> },
    { name: 'Lowest rated', icon: <LowestSvg /> },
  ];

  const fansOptions = [
    { name: 'Most popular', icon: <PopularSvg /> },
    { name: 'Top rated', icon: <HighestSvg /> },
    { name: 'Lowest rated', icon: <LowestSvg /> },
    { name: 'Newest', icon: <NewestSvg /> },
    { name: 'Oldest', icon: <Oldest /> },
  ];

  function createList() {
    if (!isAuthenticated) {
      openLogin()
    } else {
      router.push(`/lists/new`)
    }
  }


  return (
    <>
      <MyModal isOpen={verifymail} closeModal={closeModal}><VerifyEmailComponent email={enteredEmail} userId={userId} signin={openLogin} /></MyModal>
      <MyModal isOpen={login} closeModal={closeModal}><SignInComponent verify={verifyMail} close={closeModal} signup={openSignUp} forgot={openForgotPassword} /></MyModal>
      <MyModal isOpen={signup} closeModal={closeModal}><SignupComponent verify={verifyMail} login={openLogin} /></MyModal>
      <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPasswordComponent reset={openResetPassword} login={openLogin} signup={openSignUp} /></MyModal>
      <MyModal isOpen={confirmreset} closeModal={closeModal}><ConfirmOtpComponent email={enteredEmail} reset={openReset} /></MyModal>
      <MyModal isOpen={reset} closeModal={closeModal}><PasswordResetComponent toKen={resetToken} userid={userId} login={openLogin} /></MyModal>
      <div className='mx-auto flex flex-col gap-y-8 md:w-standard'>
        <div className='flex flex-col gap-y-4 border-b pb-7 border-mauve border-opacity-30'>
          <div className='w-fit space-y-1'>
            <p className='text-xl font-bold'>Lists</p>
            {isAuthenticated ?
              <p className='text-sm text-pink'>
                Create <span className='text-mauve'>and share lists of the porn you love</span>
              </p>
              :
              <p className='text-sm text-pink'>
                Join <span className='text-mauve'>PornCrit to create and share lists of the porn you love</span>
              </p>
            }
          </div>
          <ButtonComponent onClick={createList} className='!w-fit place-self-center'>Create your own list</ButtonComponent>
        </div>


        <div className='flex flex-col gap-y-7'>


          {isLoading ? <LoaderComponent /> :
            <>
              <div className="flex relative sm:flex-row-reverse sm:justify-end gap-x-8 items-center">
                <div className='flex items-center gap-x-1'>
                  {activeTab.id === 1 && <FilterComponent data={popularOptions} />}
                  {activeTab.id === 2 && <FilterComponent data={recentOptions} />}
                  {activeTab.id === 3 && <FilterComponent data={fansOptions} />}
                </div>
                <div className="flex overflow-auto no-scroll justify-around gap-x-10">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab)}
                      className={`w-fit ${activeTab.id === tab.id
                        ? ""
                        : "hover:text-black/60 font-normal !text-white"
                        } relative px-3 py-1.5 text-sm text-pink font-medium transition focus-visible:outline-2`}
                      style={{
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      {activeTab.id === tab.id && (
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
                      {tab.label}
                    </button>
                  ))}</div>
              </div>

              <div className="flex flex-col gap-y-10">
                {lists.map((list) => (
                  <List url={`/lists/${list?._id}`} key={list?._id} {...list} />
                ))}
              </div>
            </>
          }
        </div>

      </div>
    </>
  )
}

export default page