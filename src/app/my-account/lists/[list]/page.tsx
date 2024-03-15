"use client";

import ButtonComponent from "@/components/shared/button.component";
import ListTabs from "@/components/ui/list-tabs.component";
import { AppDispatchType } from "@/services/config-store";
import { asyncGetList, asyncGetListVideos, selectList, selectListVideos } from "@/services/list-services/async-actions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = ({ params }: { params: { list: string } }) => {
  const id = params.list

  const dispatch: AppDispatchType = useDispatch();
  const list = useSelector(selectList);
  const videos = useSelector(selectListVideos);

  const router = useRouter()

  useEffect(() => {
    dispatch(asyncGetList({ id }))
    dispatch(asyncGetListVideos({ id }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])





  return (
    <div className="flex flex-col gap-y-10 md:w-standard mx-auto">
      <div className="flex xs:flex-col xs:items-start gap-y-3 items-center justify-between">
        <div className="space-y-2.5">
          <p className="text-xl font-extrabold">{list?.title}</p>
          <div className="flex items-center gap-x-4">
            <img width={50} src={list?.user?.avatar} alt="user" />
            <div className="flex flex-col gap-y-1">
              <p className="text-sm">List created by</p>
              <p className="text-sm text-pink">
                {list?.user?.username}
              </p>
            </div>
          </div>
        </div>

        <ButtonComponent onClick={() => router.push(`/my-account/lists/edit/${list._id}`)} className="xs:w-full !w-fit" variant="outline-pink"><svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M7.74596 3.14062L8.34356 2.54301C8.92531 1.96126 8.92531 1.01806 8.34356 0.436312C7.76182 -0.145437 6.81861 -0.145437 6.23686 0.436312L5.62614 1.04703C6.11446 1.93075 6.84953 2.65991 7.74596 3.14062ZM4.17084 2.50233L1.29982 5.37336C0.874758 5.79842 0.662228 6.01095 0.522493 6.27204C0.382759 6.53314 0.323813 6.82787 0.205923 7.41732L0.0638519 8.12768C-0.00267025 8.46029 -0.0359313 8.62659 0.0586767 8.7212C0.153285 8.81581 0.31959 8.78255 0.6522 8.71602L1.36256 8.57395L1.36257 8.57395C1.95201 8.45606 2.24674 8.39712 2.50783 8.25738C2.76893 8.11765 2.98146 7.90512 3.40652 7.48006L6.28681 4.59977C5.4423 4.05309 4.72226 3.33775 4.17084 2.50233Z" fill="white" />
        </svg>
          Edit list</ButtonComponent>
      </div>

      <ListTabs data={list} videos={videos} />
    </div>
  );
};

export default page;
