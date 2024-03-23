"use client"

import { useState } from "react";
import ArrowDropDown from "../shared/arrow-dropdown.component";
import ButtonComponent from "../shared/button.component";
import CommentLineSvg from "../shared/commentline.component";
import FavoriteLight from "../shared/favlight.component";
import Replies from "./replies";
import { ReviewsModel } from "@/services/models/list.model";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";
import FavFilled from "../shared/favfilled";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Input from "../shared/secondary-input.component";

export interface IProps extends ReviewsModel {
  onRefresh?: () => void;
  isAuthenticated: boolean;
  openLogin: () => void;
}



const VideoReviewComponent: React.FC<IProps> = function (props
) {

  const { _id, note, reviewer, likesCount, openLogin, isAuthenticated,onRefresh } = props;
  const [replies, setReplies] = useState(false);
  const [comment, setComment] = useState(false);
  const [liked, setLiked] = useState(false)
  const [localLikesCount, setLocalLikesCount] = useState(likesCount || 0);

  function openReplies() {
    setReplies(!replies);
  }

  function openComment() {
    setComment(true);
  }

  function likeReview(reviewId: string | undefined) {
    setLiked(true)
    const newLikesCount = localLikesCount + 1;
    setLocalLikesCount(newLikesCount);
    
    axiosInstance.post(`${API_URL}/likes/like-review`, { reviewId })
      .then(() => {
        setLiked(true)
        onRefresh && onRefresh()
      })
      .catch((err) => {
        setLiked(false)
        if (newLikesCount > likesCount) {
          setLocalLikesCount(likesCount);
        }
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
      })
  }

  function unLikeReview(reviewId: string | undefined) {
    if (localLikesCount > 0) {
      setLiked(false)
      const newLikesCount = localLikesCount - 1;
      setLocalLikesCount(newLikesCount);
      axiosInstance.post(`${API_URL}/likes/unlike-review`, { reviewId })
        .then(() => {
          setLiked(false)
          onRefresh && onRefresh()
        })
        .catch((err) => {
          toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
          if (newLikesCount < likesCount) {
            setLocalLikesCount(likesCount);
          }
          setLiked(true)
        })
    }

  }

  const handleLikeButtonClick = () => {
    if (!isAuthenticated) {
      openLogin()
    } else {
      if (liked) {
        unLikeReview(_id);
      } else {
        likeReview(_id);
      }
    }

  };

  return (
    <>
      <div>
        <div className="flex flex-col gap-y-5 bg-box rounded-box px-2 sm:px-8 py-5">
          <div className="flex items-center gap-x-2">
            <img className="w-8 h-8 rounded-full object-cover" src="/assets/images/user.png" width={35} alt="" />
            <p className="text-base">
              Comment by <span className="text-pink font-extrabold">{reviewer}</span>
            </p>
          </div>

          <div>
            <p className="text-sm">
              {note}
            </p>
          </div>

          {replies ? (
            <div className="flex pb-10 justify-end">
              <div className="w-[85%] space-y-5">
                <Replies />
              </div>
            </div>
          ) : null}

          <div className="flex items-center justify-between">
            <div onClick={openReplies} className="flex cursor-pointer items-center">
              <p className="text-sm text-pink">View 18 replies</p>
              <ArrowDropDown />
            </div>

            <div className="flex items-center gap-x-7">
              <ButtonComponent onClick={openComment} variant="secondary" className="!w-fit !p-0">
                <CommentLineSvg />
              </ButtonComponent>

              <ButtonComponent onClick={handleLikeButtonClick} type="button" variant="secondary" className="!w-fit !p-0">
                {liked ? <FavFilled /> : <FavoriteLight />}
                <p className="text-xs">{localLikesCount}</p>
              </ButtonComponent>

              <div className="flex items-center gap-x-1.5">

              </div>
            </div>
          </div>



          {comment ? <>
            <Formik initialValues={{
              reply: "",
            }}
              validationSchema={Yup.object({
                reply: Yup.string()
                  .required("Required"),
              })}
              onSubmit={() => {

              }}>
              <Form>
                <div className="flex flex-col gap-y-4">
                  <Input placeholder="Add your comment..." name="reply" />
                  <div className="flex justify-end">
                    <ButtonComponent type="button" onClick={() => setComment(false)}
                      variant="secondary"
                      className="!w-fit !text-mauve place-self-end"
                    >
                      Cancel
                    </ButtonComponent>
                    <ButtonComponent type="submit" className="!w-fit place-self-end">
                      Comment
                    </ButtonComponent>
                  </div>
                </div>
              </Form>
            </Formik>

          </>
            : null}
        </div>

      </div>
    </>
  );
};

export default VideoReviewComponent;
