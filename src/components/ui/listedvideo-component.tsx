"use client"

import Image from "next/image";
import ButtonComponent from "../shared/button.component";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetListVideos, selectListVideos } from "@/services/list-services/async-actions";
import { useEffect } from "react";
import { LinkVideoModel } from "@/services/models/list.model";

const ListedVideo = ({ data }: { data: Partial<LinkVideoModel[]> }) => {
  console.log(data);

  return (
    <>
      <div className="flex flex-col gap-y-8">
        {data.map((video) => (
          <div key={video?._id} className="flex flex-col gap-y-6 px-2.5 sm:px-9 py-6 rounded-[10px] bg-box">
            <div className="flex gap-5">
              {" "}
              <Image
                src={video?.image||`/assets/images/4some.png`}
                width={88}
                height={50}
                className="rounded-sm"
                alt="foursome"
              />
              <div className="text-sm flex flex-col gap-y-4">
                <p>{video?.title}</p>
                <img src="/assets/images/rating.png" width={100} alt="" />
              </div>
            </div>

            <div className="flex items-center gap-5 sm:gap-x-8 flex-wrap">
              <ButtonComponent variant="outline-pink" className="!px-2.5 !py-1.5">
                <img src="/assets/icons/play.svg" alt="" /> Watch now
              </ButtonComponent>
              <ButtonComponent variant="outline-pink" className="!px-2.5 !py-1.5">
                <img src="/assets/icons/add.svg" alt="" /> Save
              </ButtonComponent>
              <ButtonComponent variant="outline-pink" className="!px-2.5 !py-1.5">
                <img src="/assets/icons/white-like.svg" alt="" /> Like
              </ButtonComponent>
            </div>
          </div>
        ))}

      </div>
    </>
  );
};

export default ListedVideo;
