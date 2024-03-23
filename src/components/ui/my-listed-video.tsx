"use client"

import Image from "next/image";
import ButtonComponent from "../shared/button.component";
import { LinkVideoModel } from "@/services/models/list.model";
import Link from "next/link";
import { useState } from "react";
import MyModal from "../shared/modal.component";
import AddtolistComponent from "./addtolist.component";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";

export interface IProps extends LinkVideoModel {
  onRefresh?: () => void;
}

const MyListedVideo: React.FC<IProps> = function (props
) {
  const { _id, image, title, embedLink } = props;
  const [liked, setLiked] = useState(false)
  const [list, setList] = useState(false)
  const [isLiking, setLiking] = useState(false)

  function likeVideo(videoId: string | undefined) {
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

  function unLikeVideo(videoId: string | undefined) {
    setLiking(true)
    axiosInstance.post(`${API_URL}/likes/unlike-video`, { videoId })
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

  function addToList() { 
      setList(true)
    }

  const handleLikeButtonClick = () => {
      if (liked) {
        unLikeVideo(_id);
      } else {
        likeVideo(_id);
      }
  };

  return (
    <>
      <MyModal closeModal={() => setList(false)} isOpen={list}>
        <AddtolistComponent />
      </MyModal>
      <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-6 px-2.5 sm:px-9 py-6 rounded-[10px] bg-box">
          <div className="flex gap-5">
            {" "}
            <Link href={`/videos/${_id}`}><Image
              src={image || `/assets/images/4some.png`}
              width={88}
              height={50}
              className="rounded-sm"
              alt="foursome"
            />
            </Link>

            <div className="text-sm flex flex-col gap-y-4">
              <Link href={`/videos/${_id}`}><p>{title}</p></Link>
              <img src="/assets/images/rating.png" width={100} alt="" />
            </div>
          </div>

          <div className="flex items-center gap-5 sm:gap-x-8">
            <a href={embedLink} target="_blank" rel="noopener noreferrer">
              <ButtonComponent variant="outline-pink" className="!gap-x-1.5 !p-2 !text-xs flex-1 !w-24">
                <img src="/assets/icons/play.svg" alt="" /> Watch now
              </ButtonComponent>
            </a>
            <ButtonComponent onClick={addToList} variant="outline-pink" className="!gap-x-1.5 !p-2 !text-xs flex-1 !w-24">
              <img src="/assets/icons/add.svg" alt="" /> Save
            </ButtonComponent>
            <ButtonComponent onClick={handleLikeButtonClick} variant={liked ? "pink" : "outline-pink"} className="!gap-x-1.5 !p-2 !text-xs flex-1 !w-24">
              {liked ? "Liked" : <>
                <img src="/assets/icons/white-like.svg" alt="" /> Like
              </>}
            </ButtonComponent>
          </div>
        </div>
      </div >
    </>
  );
};

export default MyListedVideo;
