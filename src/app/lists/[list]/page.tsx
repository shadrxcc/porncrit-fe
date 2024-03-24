"use client"

import ButtonComponent from "@/components/shared/button.component";
import LoaderComponent from "@/components/shared/loader.component";
import MyModal from "@/components/shared/modal.component";
import ForgottenPasswordComponent from "@/components/ui/forgotten-password.component";
import ListTabs from "@/components/ui/list-tabs.component";
import ConfirmOtpComponent, { PasswordResetComponent } from "@/components/ui/reset-password.component";
import SignInComponent from "@/components/ui/sign-in.component";
import SignupComponent from "@/components/ui/signup-form.component";
import VerifyEmailComponent from "@/components/ui/verify-email.component";
import { useAuthModal } from "@/context/auth-modal-context";
import { selectIsAuthenticated } from "@/services/auth-services/selector";
import { AppDispatchType } from "@/services/config-store";
import axiosInstance from "@/services/httpClient";
import { asyncGetList, asyncGetListVideos, selectList, selectListVideos } from "@/services/list-services/async-actions";
import { API_URL } from "@/services/utils";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = ({ params }: { params: { list: string } }) => {
  const id = params.list

  const dispatch: AppDispatchType = useDispatch();
  const list = useSelector(selectList);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const videos = useSelector(selectListVideos);
  const [isLoading, setIsLoading] = useState(false)

  const { signup, login,
    forgotPassword,
    verifymail, reset,
    confirmreset, enteredEmail,
    userId, resetToken,
    openForgotPassword, openResetPassword,
    verifyMail, closeModal,
    openLogin, openReset, openSignUp } = useAuthModal()

  const [liked, setLiked] = useState(false)

  function likeList(listId: string) {
    if (!isAuthenticated) {
      openLogin()
    } else {
      axiosInstance.post(`${API_URL}/likes/like-list`, { listId })
        .then((res) => {
          setLiked(true)
          onRefresh && onRefresh()
        })
        .catch((err) => {
          toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
        })
    }
  }

  function unLikeList(listId: string) {
    axiosInstance.post(`${API_URL}/likes/unlike-list`, { listId })
      .then(() => {
        setLiked(false)
      })
      .catch((err) => {
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
      })
  }

  useEffect(() => {
    setIsLoading(true)
    dispatch(asyncGetList({ id })).finally(() => setIsLoading(false))
    dispatch(asyncGetListVideos({ id })).finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const onRefresh = () => {
    dispatch(asyncGetList({ id }))
    dispatch(asyncGetListVideos({ id }))
  }

  const handleLikeButtonClick = () => {
    if (liked) {
      unLikeList(list?._id);
    } else {
      likeList(list?._id);
    }
  };

  return (
    <div className="flex flex-col gap-y-10 md:w-standard mx-auto">
      {isLoading ? <LoaderComponent /> : <>
        <div className="flex xs:flex-col xs:items-start gap-y-3 items-center justify-between">
          <div className="space-y-2.5">
            <p className="text-xl font-extrabold">{list?.title}</p>
            <div className="flex items-center gap-x-4">
              <img width={50} src={list?.user?.avatar || `/assets/images/user.png`} alt="user" className="object-cover w-12 h-12 rounded-full " />
              <div className="flex flex-col gap-y-1">
                <p className="text-sm">List created by</p>
                <p className="text-sm line-clamp-1 text-pink">
                  {list?.user?.username}
                </p>
              </div>
            </div>
          </div>

          <ButtonComponent onClick={handleLikeButtonClick} className="xs:w-full !w-28" variant={liked ? "pink" : "outline-pink"}>
            {
              liked ? 'Liked' : <>
                <img src="/assets/icons/white-like.svg" width={10} alt="like icon" /> Like list
              </>
            }
          </ButtonComponent>
        </div>
        <ListTabs openLogin={openLogin} data={list} videos={videos} onRefresh={onRefresh} isAuthenticated={isAuthenticated} />
      </>}

      <MyModal isOpen={verifymail} closeModal={closeModal}><VerifyEmailComponent email={enteredEmail} userId={userId} signin={openLogin} /></MyModal>
      <MyModal isOpen={login} closeModal={closeModal}><SignInComponent verify={verifyMail} close={closeModal} signup={openSignUp} forgot={openForgotPassword} /></MyModal>
      <MyModal isOpen={signup} closeModal={closeModal}><SignupComponent verify={verifyMail} login={openLogin} /></MyModal>
      <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPasswordComponent reset={openResetPassword} login={openLogin} signup={openSignUp} /></MyModal>
      <MyModal isOpen={confirmreset} closeModal={closeModal}><ConfirmOtpComponent email={enteredEmail} reset={openReset} /></MyModal>
      <MyModal isOpen={reset} closeModal={closeModal}><PasswordResetComponent toKen={resetToken} userid={userId} login={openLogin} /></MyModal>
    </div>
  );
};

export default page;
