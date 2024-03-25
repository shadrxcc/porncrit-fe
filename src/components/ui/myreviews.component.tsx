import { LinkVideo, Reviews } from "@/services/models/list.model";
import LinkVideoInput from "../shared/linkvideo-input";
import ReviewsComponent from "./myreview.component";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useAuthModal } from "@/context/auth-modal-context";
import MyModal from "../shared/modal.component";
import VerifyEmailComponent from "./verify-email.component";
import SignInComponent from "./sign-in.component";
import SignupComponent from "./signup-form.component";
import ForgottenPasswordComponent from "./forgotten-password.component";
import ConfirmOtpComponent, { PasswordResetComponent } from "./reset-password.component";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/services/auth-services/selector";
import { useState } from "react";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";

type ReviewsType = {
  data: Reviews['reviews']
}

const MyReviews = (props: ReviewsType) => {
  const { data } = props;
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

  const isAuthenticated = useSelector(selectIsAuthenticated);

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
          } else if (err?.response?.status === 400) {
            router.push(`/videos/not-found`)
          } else {
            toast.error(`Ooops! we couldn't complete your request. Try again later.`)
          }
        }).finally(() => {
          setIsLinking(false)
        })

    }
  }



  return <>
    <MyModal isOpen={verifymail} closeModal={closeModal}><VerifyEmailComponent email={enteredEmail} userId={userId} signin={openLogin} /></MyModal>
    <MyModal isOpen={login} closeModal={closeModal}><SignInComponent verify={verifyMail} close={closeModal} signup={openSignUp} forgot={openForgotPassword} /></MyModal>
    <MyModal isOpen={signup} closeModal={closeModal}><SignupComponent verify={verifyMail} login={openLogin} /></MyModal>
    <MyModal isOpen={forgotPassword} closeModal={closeModal}><ForgottenPasswordComponent reset={openResetPassword} login={openLogin} signup={openSignUp} /></MyModal>
    <MyModal isOpen={confirmreset} closeModal={closeModal}><ConfirmOtpComponent email={enteredEmail} reset={openReset} /></MyModal>
    <MyModal isOpen={reset} closeModal={closeModal}><PasswordResetComponent toKen={resetToken} userid={userId} login={openLogin} /></MyModal>

    <div className="space-y-5">
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
          <LinkVideoInput loading={isLinking} disabled={isLinking} name="url" placeholder="Paste the link for a video you want to review. " />
        </Form>
      </Formik>
      <div className="flex mt-9 flex-col gap-y-9">
        {data?.length === 0 ? <p className="text-sm text-center text-mauve">You haven't made any reviews yet.</p> : <>
          {data?.map((review) => (
            <ReviewsComponent key={review?._id} {...review} />
          ))}
        </>}
      </div>
    </div>
  </>

}

export default MyReviews;