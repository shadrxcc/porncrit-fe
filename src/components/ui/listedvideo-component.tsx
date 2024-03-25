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
import Rating from "react-animated-rating";

export interface IProps extends LinkVideoModel {
  onRefresh?: () => void;
  isAuthenticated: boolean;
  openLogin: () => void;
}

const ListedVideo: React.FC<IProps> = function (props
) {
  const { _id, image, title, embedLink, isAuthenticated, openLogin, rating } = props;
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
    if (!isAuthenticated) {
      openLogin()
    } else {
      setList(true)
    }
  }

  const handleLikeButtonClick = () => {
    if (!isAuthenticated) {
      openLogin()
    } else {
      if (liked) {
        unLikeVideo(_id);
      } else {
        likeVideo(_id);
      }
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
              width={100}
              height={50}
              className="rounded-sm max-w-none object-cover"
              alt="foursome"
            />
            </Link>

            <div className="text-sm flex flex-col gap-y-4">
              <Link href={`/videos/${_id}`}><p className="line-clamp-1">{title}</p></Link>
              <Rating wrapperClassName="icon-red" filled={rating} icon={<svg width="16" height="16" viewBox="0 0 35 35" strokeWidth="2px" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5185 30.8628C9.7619 31.3192 8.82853 30.642 9.02765 29.7811L10.7292 22.4251C10.8127 22.0642 10.6899 21.6868 10.41 21.4442L4.70197 16.4954C4.03444 15.9167 4.39039 14.82 5.27055 14.7436L12.8169 14.0886C13.186 14.0565 13.5072 13.8229 13.6515 13.4816L16.5792 6.55441C16.9234 5.74015 18.0773 5.74015 18.4214 6.55441L21.3492 13.4816C21.4934 13.8229 21.8146 14.0565 22.1838 14.0886L29.7301 14.7436C30.6103 14.82 30.9662 15.9167 30.2987 16.4954L24.5906 21.4442C24.3108 21.6868 24.1879 22.0642 24.2714 22.4251L25.973 29.7811C26.1721 30.642 25.2387 31.3192 24.4822 30.8628L18.0169 26.9626C17.6992 26.771 17.3015 26.771 16.9838 26.9626L10.5185 30.8628Z" />
              </svg>
              } />
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

export default ListedVideo;
