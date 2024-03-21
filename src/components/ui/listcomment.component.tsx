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



const ListCommentComponent: React.FC<Partial<CommentsProp>> = function (props
) {

  const { _id, comment, commenter, likesCount } = props;
  const [replies, setReplies] = useState(false);
  const [isComment, setComment] = useState(false);
  const [isLiking, setLiking] = useState(false)
  const [liked, setLiked] = useState(false)

  function openReplies() {
    setReplies(!replies);
  }

  function openComment() {
    setComment(true);
  }

  function likeComment(commentId: string | undefined) {
    setLiking(true)
    axiosInstance.post(`${API_URL}/likes/like-comment`, { commentId })
      .then((res) => {
        toast(res?.data?.message)
        setLiked(true)
      })
      .catch((err) => {
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
      }).finally(() => {
        setLiking(false)
      })
  }
  function unLikeComment(commentId: string | undefined) {
    setLiking(true)
    axiosInstance.post(`${API_URL}/likes/unlike-comment`, { commentId })
      .then((res) => {
        toast(res?.data?.message)
        setLiked(false)
      })
      .catch((err) => {
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
      }).finally(() => {
        setLiking(false)
      })
  }

  const handleLikeButtonClick = () => {
    if (liked) {
      unLikeComment(_id);
    } else {
      likeComment(_id);
    }
  };


  return (
    <>
      <div>
        <div className="flex flex-col gap-y-5 bg-box rounded-box px-2 sm:px-8 py-5">
          <div className="flex items-center gap-x-2">
            <img className="w-8 h-8 rounded-full object-cover" src={commenter?.avatar} width={35} alt="" />
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

              <ButtonComponent onClick={handleLikeButtonClick} type="button" loading={isLiking} disabled={isLiking} variant="secondary" className="!w-fit !p-0">
                {!isLiking && <>
                  {liked ? <FavFilled /> : <FavoriteLight />}
                </>}
                <p className="text-xs">{likesCount}</p>
              </ButtonComponent>

              <div className="flex items-center gap-x-1.5">

              </div>
            </div>
          </div>



          {/* {comment ? <div className="flex flex-col gap-y-4">
              <Input placeholder="Add your comment..." />
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
            </div> : null} */}
        </div>

      </div>
    </>
  );
};

export default ListCommentComponent;
