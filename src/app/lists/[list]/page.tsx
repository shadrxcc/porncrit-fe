"use client"

import ButtonComponent from "@/components/shared/button.component";
import LoaderComponent from "@/components/shared/loader.component";
import ListTabs from "@/components/ui/list-tabs.component";
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
  const videos = useSelector(selectListVideos);
  const [isLoading, setIsLoading] = useState(false)

  const [liked, setLiked] = useState(false)
  const [isLiking, setLiking] = useState(false)

  function likeList(listId: string) {
    setLiking(true)
    axiosInstance.post(`${API_URL}/likes/like-list`, { listId })
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

  function unLikeList(listId: string) {
    setLiking(true)
    axiosInstance.post(`${API_URL}/likes/unlike-list`, { listId })
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

  useEffect(() => {
    setIsLoading(true)
    dispatch(asyncGetList({ id })).finally(() => setIsLoading(false))
    dispatch(asyncGetListVideos({ id })).finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

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
              <img width={50} src={list?.user?.avatar} alt="user" className="object-cover w-12 h-12 rounded-full " />
              <div className="flex flex-col gap-y-1">
                <p className="text-sm">List created by</p>
                <p className="text-sm text-pink">
                  {list?.user?.username}
                </p>
              </div>
            </div>
          </div>

          <ButtonComponent loading={isLiking} disabled={isLiking} onClick={handleLikeButtonClick} className="xs:w-full !w-28" variant={liked ? "pink" : "outline-pink"}>
            {!isLiking && <>
              {
                liked ? 'Liked' : <>
                  <img src="/assets/icons/white-like.svg" width={10} alt="like icon" /> Like list
                </>
              }
            </>}
          </ButtonComponent>
        </div>

        <ListTabs data={list} videos={videos} />
      </>}
    </div>
  );
};

export default page;
