"use client"

import ButtonComponent from "@/components/shared/button.component";
import LoaderComponent from "@/components/shared/loader.component";
import ListTabs from "@/components/ui/list-tabs.component";
import { AppDispatchType } from "@/services/config-store";
import { asyncGetList, asyncGetListVideos, selectList, selectListVideos } from "@/services/list-services/async-actions";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = ({ params }: { params: { list: string } }) => {
  const id = params.list

  const dispatch: AppDispatchType = useDispatch();
  const list = useSelector(selectList);
  const videos = useSelector(selectListVideos);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(asyncGetList({ id })).finally(() => setIsLoading(false))
    dispatch(asyncGetListVideos({ id })).finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <div className="flex flex-col gap-y-10 md:w-standard mx-auto">
      {isLoading ? <LoaderComponent /> : <>
        <div className="flex xs:flex-col xs:items-start gap-y-3 items-center justify-between">
          <div className="space-y-2.5">
            <p className="text-xl font-extrabold">{list?.title}</p>
            <div className="flex items-center gap-x-4">
              <img width={50} src={list?.user?.avatar} alt="user" className="object-cover w-12 h-12 rounded-full "/>
              <div className="flex flex-col gap-y-1">
                <p className="text-sm">List created by</p>
                <p className="text-sm text-pink">
                  {list?.user?.username}
                </p>
              </div>
            </div>
          </div>

          <ButtonComponent className="xs:w-full !w-fit" variant="outline-pink"><img src="/assets/icons/white-like.svg" width={10} alt="like icon" /> Like list</ButtonComponent>
        </div>

        <ListTabs data={list} videos={videos} />
      </>}
    </div>
  );
};

export default page;
