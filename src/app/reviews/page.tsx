"use client"

import PopularReviewsComponent from '@/components/ui/popular-reviews.component'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthenticated } from '@/services/auth-services/selector'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { DaySvg } from '@/components/shared/day.component'
import LinkVideoInput from '@/components/shared/linkvideo-input'
import WeekSvg from '@/components/shared/week'
import YearSvg from '@/components/shared/year'
import HistorySvg from '@/components/shared/history'
import PopularSvg from '@/components/shared/popular'
import HighestSvg from '@/components/shared/highest'
import LowestSvg from '@/components/shared/lowest'
import NewestSvg from '@/components/shared/newest'
import FilterComponent from '@/components/shared/filter.component'
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { AppDispatchType } from '@/services/config-store'
import { asyncGetAllReviews, selectAllReviews } from '@/services/reviews-services/async-actions'
import LoaderComponent from '@/components/shared/loader.component'
import { useAuthModal } from '@/context/auth-modal-context'
import MyModal from '@/components/shared/modal.component'
import VerifyEmail from '@/components/ui/verify-email.component'
import SignIn from '@/components/ui/sign-in.component'
import Signup from '@/components/ui/signup-form.component'
import ForgottenPassword from '@/components/ui/forgotten-password.component'
import ConfirmOtp, { PasswordResetComponent } from '@/components/ui/reset-password.component'
import { useRouter } from 'next/navigation'
import { LinkVideo } from '@/services/models/list.model'
import axiosInstance from '@/services/httpClient'
import { API_URL } from '@/services/utils'

const tabs = [
  { id: 1, label: "Popular" },
  { id: 2, label: "Recent" },
  { id: 3, label: "Following" },
];

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
  { name: 'Newest', icon: <NewestSvg /> },
  { name: 'Top rated', icon: <HighestSvg /> },
  { name: 'Lowest rated', icon: <LowestSvg /> },

];


const page = () => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch: AppDispatchType = useDispatch();
  const reviews = useSelector(selectAllReviews);
  const [isLoading, setIsLoading] = useState(false)

  const { signup, login,
    forgotPassword,
    verifymail, reset,
    confirmreset, enteredEmail,
    userId, resetToken,
    openForgotPassword, openResetPassword,
    verifyMail, closeModal,
    openLogin, openReset, openSignUp } = useAuthModal()
  const [isLinking, setIsLinking] = useState(false);

  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    dispatch(asyncGetAllReviews()).finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  function listUrl(url: LinkVideo) {
    if (!isAuthenticated) {
      openSignUp()
    } else {
      setIsLinking(true)
      axiosInstance.post(`${API_URL}/videos/link-video`, url)
        .then((res) => {
          const videoId = res?.data?.data._id
          router.push(`/videos/new/${videoId}`)
        })
        .catch((err) => {
          if (err?.response?.status === 409) {
            const videoId = err?.response?.data?.data._id
            router.push(`/videos/exists/${videoId}`)
          }

          if (err?.response?.status === 400) {
            router.push(`/videos/not-found`)
          }
          // toast.error(err?.response?.data?.message || 'Error Completing request. Try again later.')
        }).finally(() => {
          setIsLinking(false)
        })

    }
  }



  return (
    <div className='mx-auto flex flex-col gap-y-8 md:w-standard'>
      <MyModal isOpen={verifymail} closeModal={closeModal}><VerifyEmail email={enteredEmail} userId={userId} signin={openLogin} /></MyModal>
      <MyModal isOpen={login} closeModal={closeModal}><SignIn verify={verifyMail} close={closeModal} signup={openSignUp} forgot={openForgotPassword} /></MyModal>
      <MyModal isOpen={signup} closeModal={closeModal}><Signup verify={verifyMail} login={openLogin} /></MyModal>
      <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPassword reset={openResetPassword} login={openLogin} signup={openSignUp} /></MyModal>
      <MyModal isOpen={confirmreset} closeModal={closeModal}><ConfirmOtp email={enteredEmail} reset={openReset} /></MyModal>
      <MyModal isOpen={reset} closeModal={closeModal}><PasswordResetComponent toKen={resetToken} userid={userId} login={openLogin} /></MyModal>
      {isLoading && <LoaderComponent />}
      {!isLoading ? <>
        <div className='flex flex-col gap-y-4 border-b pb-7 border-mauve border-opacity-30'>
          <div className='w-fit space-y-1'>
            <p className='text-xl font-bold'>Reviews</p>
            {isAuthenticated ?
              <p className='text-sm text-mauve'>Review the porn you love</p>
              :
              <p className='text-sm text-pink'>Join <span className='text-mauve'>PornCrit to review the porn you love</span></p>
            }

          </div>
          <Formik
            initialValues={{
              url: "",
            }}
            validationSchema={Yup.object({
              url: Yup
                .string()
                .url('Please enter a valid URL')
                .required('URL is required'),
            })}
            onSubmit={(value) => {
              listUrl(value);
            }}
          >
            <Form className="w-full">
              <LinkVideoInput loading={isLinking} disable={isLinking} name="url" placeholder="Paste the link for a video you want to review. " />
            </Form>
          </Formik>
        </div>

        <div className='flex flex-col gap-y-7'>
          <div className="flex relative sm:flex-row-reverse sm:justify-end gap-x-4 items-center">
            <div className='flex items-center gap-x-1'>
              {activeTab.id === 1 && <FilterComponent data={popularOptions} />}
              {activeTab.id === 2 && <FilterComponent data={recentOptions} />}
              {activeTab.id === 3 && <FilterComponent data={fansOptions} />}
            </div>

            <div className="flex overflow-auto no-scroll gap-x-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`w-fit ${activeTab.id === tab.id
                    ? ""
                    : "font-normal !text-white"
                    } relative px-3 py-1.5 text-sm text-pink transition `}
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
            {reviews?.map((review) => (
              <PopularReviewsComponent key={review?._id} {...review} />
            ))}
          </div>
        </div>
      </> : null}
    </div>
  )
}

export default page