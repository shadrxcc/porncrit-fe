"use client"

import { useState } from "react";
import ArrowDropDown from "../shared/arrow-dropdown.component";
import ButtonComponent from "../shared/button.component";
import CommentLineSvg from "../shared/commentline.component";
import FavoriteLight from "../shared/favlight.component";
import Replies from "./replies";
import { CommentsProp } from "@/services/models/list.model";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";
import FavFilled from "../shared/favfilled";
import Input from "../shared/secondary-input.component";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export interface IProps extends CommentsProp {
  onRefresh?: () => void;
  isAuthenticated: boolean;
  openLogin: () => void;
}

const ListCommentComponent: React.FC<IProps> = function (props
) {

  const { _id, comment, commenter, likesCount, isAuthenticated, openLogin } = props;
  const [replies, setReplies] = useState(false);
  const [isComment, setComment] = useState(false);
  const [liked, setLiked] = useState(false)
  const [localLikesCount, setLocalLikesCount] = useState(likesCount || 0);

  function openReplies() {
    setReplies(!replies);
  }

  function openComment() {
    setComment(true);
  }

  function likeComment(commentId: string | undefined) {
    setLiked(true)
    const newLikesCount = localLikesCount + 1;
    setLocalLikesCount(newLikesCount);
    axiosInstance.post(`${API_URL}/likes/like-comment`, { commentId })
      .then(() => {
        setLiked(true)
      })
      .catch((err) => {
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
        setLiked(false)
        if (newLikesCount > likesCount) {
          setLocalLikesCount(likesCount);
        }
      })

  }
  function unLikeComment(commentId: string | undefined) {
    if (localLikesCount > 0) {
      setLiked(false)
      const newLikesCount = localLikesCount - 1;
      setLocalLikesCount(newLikesCount);
      axiosInstance.post(`${API_URL}/likes/unlike-comment`, { commentId })
        .then(() => {
          setLiked(false)
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
        unLikeComment(_id);
      } else {
        likeComment(_id);
      }
    }
  };


  return (
    <>
      <div>
        <div className="flex flex-col gap-y-5 bg-box rounded-box px-2 sm:px-8 py-5">
          <div className="flex items-center gap-x-2">
            <img className="w-8 h-8 rounded-full object-cover" src={commenter?.avatar || `/assets/images/user.png`} width={35} alt="" />
            <p className="text-base">
              Comment by <span className="text-pink font-extrabold">{commenter?.username}</span>
            </p>
          </div>

          <div>
            <p className="text-sm">
              {comment}
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
                {/* <p className="text-xs">Comment</p> */}
              </ButtonComponent>

              <ButtonComponent onClick={handleLikeButtonClick} type="button" variant="secondary" className="!w-fit !p-0">

                {liked ? <FavFilled /> : <FavoriteLight />}

                <p className="text-xs">{localLikesCount}</p>
              </ButtonComponent>

              <div className="flex items-center gap-x-1.5">

              </div>
            </div>
          </div>



          {isComment ?
            <>
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
                      <ButtonComponent onClick={() => setComment(false)}
                        variant="secondary"
                        className="!w-fit !text-mauve place-self-end"
                      >
                        Cancel
                      </ButtonComponent>
                      <ButtonComponent className="!w-fit place-self-end">
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

export default ListCommentComponent;
