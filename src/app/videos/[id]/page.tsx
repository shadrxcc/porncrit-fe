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
import LoaderComponent from "@/components/shared/loader.component";
import { selectAuthUser, selectIsAuthenticated } from "@/services/auth-services/selector";
import { getUserProfile } from "@/services/auth-services/async-actions";
import { toast } from "react-toastify";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import VideoListsComponent from "@/components/ui/videolists.component";
import Rating from "react-animated-rating";
import { useAuthModal } from "@/context/auth-modal-context";
import VerifyEmailComponent from "@/components/ui/verify-email.component";
import SignInComponent from "@/components/ui/sign-in.component";
import SignupComponent from "@/components/ui/signup-form.component";
import ForgottenPasswordComponent from "@/components/ui/forgotten-password.component";
import ConfirmOtpComponent, { PasswordResetComponent } from "@/components/ui/reset-password.component";


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
  const [isLiking, setLiking] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const dispatch: AppDispatchType = useDispatch();
  const video = useSelector(selectVideo);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectAuthUser);

  const { signup, login,
    forgotPassword,
    verifymail, reset,
    confirmreset, enteredEmail,
    userId, resetToken,
    openForgotPassword, openResetPassword,
    verifyMail, closeModal,
    openLogin, openReset, openSignUp } = useAuthModal()

  useEffect(() => {
    setIsLoading(true)
    if (isAuthenticated) {
      dispatch(getUserProfile())
    }
    dispatch(asyncGetLinkedVideo({ id }))
      .finally(() => {
        setIsLoading(false)
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isAuthenticated, dispatch])


  const onTabClick = (index: number) => {
    setActiveTabIndex(index);
  };

  function writeReview() {
    if (!isAuthenticated) {
      toast('Ooops! you have to be logged in to review!')
      openLogin()
    } else {
      router.push(`/videos/write-review/${id}`)
    }
  }

  function likeVideo(videoId: string) {
    if (!isAuthenticated) {
      openLogin()
    } else {
      setLiking(true)
      axiosInstance.post(`${API_URL}/likes/like-video`, { videoId })
        .then((res) => {
          setLiked(true)
          toast(res?.data?.message)
        })
        .catch((err) => {
          toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
        }).finally(() => {
          setLiking(false)
        })
    }
  }

  function unLikeVideo(videoId: string) {
    setLiking(true)
    axiosInstance.post(`${API_URL}/likes/like-video`, { videoId })
      .then((res) => {
        setLiked(false)
        toast(res?.data?.message)
      })
      .catch((err) => {
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
      }).finally(() => {
        setLiking(false)
      })
  }

  const handleLikeButtonClick = () => {
    if (liked) {
      unLikeVideo(video?.video?._id);
    } else {
      likeVideo(video?.video?._id);
    }
  };



  const getTabContent = () => {
    switch (activeTabIndex) {
      case 0:
        return <VideoListsComponent data={video} isAuthenticated={isAuthenticated} openLogin={openLogin} />;
      case 1:
        return <VideoListed data={video?.lists} />;
      case 2:
        return <ListLikeComponent like={video?.likes} />;
      case 3:
        return <VideoViewed />
      case 4:
        return <VideoInfo video={video} />
      default:
        return null;
    }
  };
  return (
    <>
      <div className="mx-auto md:w-standard">
        {isLoading ? <LoaderComponent /> : <>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src={video?.video?.image}
              alt=""
              className="object-cover w-auto sm:w-[200px] rounded-[3px]"
              height={282}
              width={200}
            />

            <div className="flex flex-col gap-y-3.5">
              <p className="text-sm font-medium">{video?.video?.title}</p>
              <div className="flex gap-x-3 items-center">
                <Rating wrapperClassName="icon-red" filled={video?.video?.rating} icon={<svg width="16" height="16" viewBox="0 0 35 35" strokeWidth="2px" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.5185 30.8628C9.7619 31.3192 8.82853 30.642 9.02765 29.7811L10.7292 22.4251C10.8127 22.0642 10.6899 21.6868 10.41 21.4442L4.70197 16.4954C4.03444 15.9167 4.39039 14.82 5.27055 14.7436L12.8169 14.0886C13.186 14.0565 13.5072 13.8229 13.6515 13.4816L16.5792 6.55441C16.9234 5.74015 18.0773 5.74015 18.4214 6.55441L21.3492 13.4816C21.4934 13.8229 21.8146 14.0565 22.1838 14.0886L29.7301 14.7436C30.6103 14.82 30.9662 15.9167 30.2987 16.4954L24.5906 21.4442C24.3108 21.6868 24.1879 22.0642 24.2714 22.4251L25.973 29.7811C26.1721 30.642 25.2387 31.3192 24.4822 30.8628L18.0169 26.9626C17.6992 26.771 17.3015 26.771 16.9838 26.9626L10.5185 30.8628Z" />
                </svg>
                } />
                <p className="text-[10px] font-medium">based on 18.4k ratings</p>
              </div>
              <div className="flex items-center gap-4 overflow-auto no-scroll" style={{ whiteSpace: 'nowrap' }}>

                <a href={video?.video?.embedLink} target="_blank" rel="noopener noreferrer">
                  <ButtonComponent
                    className="!gap-x-1.5 !p-2 !text-xs flex-1 !w-24"
                    onClick={() => setWatch(!watch)}
                    variant={watch ? "pink" : "outline-pink"}
                  >
                    <img src="/assets/icons/play.svg" alt="" />{" "}
                    {watch ? "Rewatch" : "Watch now"}
                  </ButtonComponent>
                </a>
                <ButtonComponent onClick={() => setList(true)} variant="outline-pink" className="!gap-x-1.5 !text-xs !p-2 flex-1 !w-24">
                  <img src="/assets/icons/add.svg" alt="" /> Save
                </ButtonComponent>
                <ButtonComponent onClick={handleLikeButtonClick} variant={liked ? "pink" : "outline-pink"} className="!gap-x-1.5 !text-xs !p-2 flex-1 !w-24">
                  {liked ? "Liked" : <><img src="/assets/icons/white-like.svg" alt="" />Like</>}
                </ButtonComponent>
              </div>
            </div>
          </div>


          <div className="flex mt-10 items-center justify-between bg-box rounded-box px-3 py-6">
            <div className="flex items-center gap-x-3">
              <img className="object-cover w-10 h-10 rounded-full" src={user?.avatar || "/assets/images/user.png"} width={35} alt="" />
              <ButtonComponent onClick={writeReview} className="!py-1 !px-7">
                Write your review
              </ButtonComponent>
            </div>

            <Rating wrapperClassName="icon-red" icon={<svg width="16" height="16" viewBox="0 0 35 35" strokeWidth="2px" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5185 30.8628C9.7619 31.3192 8.82853 30.642 9.02765 29.7811L10.7292 22.4251C10.8127 22.0642 10.6899 21.6868 10.41 21.4442L4.70197 16.4954C4.03444 15.9167 4.39039 14.82 5.27055 14.7436L12.8169 14.0886C13.186 14.0565 13.5072 13.8229 13.6515 13.4816L16.5792 6.55441C16.9234 5.74015 18.0773 5.74015 18.4214 6.55441L21.3492 13.4816C21.4934 13.8229 21.8146 14.0565 22.1838 14.0886L29.7301 14.7436C30.6103 14.82 30.9662 15.9167 30.2987 16.4954L24.5906 21.4442C24.3108 21.6868 24.1879 22.0642 24.2714 22.4251L25.973 29.7811C26.1721 30.642 25.2387 31.3192 24.4822 30.8628L18.0169 26.9626C17.6992 26.771 17.3015 26.771 16.9838 26.9626L10.5185 30.8628Z" />
            </svg>
            } disabled />
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
        </>}
      </div>

      <MyModal isOpen={verifymail} closeModal={closeModal}><VerifyEmailComponent email={enteredEmail} userId={userId} signin={openLogin} /></MyModal>
      <MyModal isOpen={login} closeModal={closeModal}><SignInComponent verify={verifyMail} close={closeModal} signup={openSignUp} forgot={openForgotPassword} /></MyModal>
      <MyModal isOpen={signup} closeModal={closeModal}><SignupComponent verify={verifyMail} login={openLogin} /></MyModal>
      <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPasswordComponent reset={openResetPassword} login={openLogin} signup={openSignUp} /></MyModal>
      <MyModal isOpen={confirmreset} closeModal={closeModal}><ConfirmOtpComponent email={enteredEmail} reset={openReset} /></MyModal>
      <MyModal isOpen={reset} closeModal={closeModal}><PasswordResetComponent toKen={resetToken} userid={userId} login={openLogin} /></MyModal>
    </>

  );
};

export default Video;
