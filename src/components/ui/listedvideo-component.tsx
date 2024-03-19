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

const ListedVideo = ({ data }: { data: Partial<LinkVideoModel[]> }) => {
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

  return (
    <>
      <MyModal closeModal={() => setList(false)} isOpen={list}>
        <AddtolistComponent />
      </MyModal>
      <div className="flex flex-col gap-y-8">
        {data.map((video) => (
          <div key={video?._id} className="flex flex-col gap-y-6 px-2.5 sm:px-9 py-6 rounded-[10px] bg-box">
            <div className="flex gap-5">
              {" "}
              <Link href={`/videos/${video?._id}`}><Image
                src={video?.image || `/assets/images/4some.png`}
                width={88}
                height={50}
                className="rounded-sm"
                alt="foursome"
              />
              </Link>

              <div className="text-sm flex flex-col gap-y-4">
                <Link href={`/videos/${video?._id}`}><p>{video?.title}</p></Link>
                <img src="/assets/images/rating.png" width={100} alt="" />
              </div>
            </div>

            <div className="flex items-center gap-5 sm:gap-x-8 flex-wrap">
              <a href={video?.embedLink} target="_blank" rel="noopener noreferrer">
                <ButtonComponent variant="outline-pink" className="!px-2.5 !py-1.5 !w-28">
                  <img src="/assets/icons/play.svg" alt="" /> Watch now
                </ButtonComponent>
              </a>
              <ButtonComponent onClick={() => setList(true)} variant="outline-pink" className="!px-2.5 !py-1.5 !w-28">
                <img src="/assets/icons/add.svg" alt="" /> Save
              </ButtonComponent>
              <ButtonComponent loading={isLiking} disabled={isLiking} onClick={() => likeVideo(video?._id)} variant={liked ? "pink" : "outline-pink"} className="!px-2.5 !py-1.5 !w-28">
                <img src="/assets/icons/white-like.svg" alt="" /> Like
              </ButtonComponent>
            </div>
          </div>
        ))}

      </div >
    </>
  );
};

export default ListedVideo;
