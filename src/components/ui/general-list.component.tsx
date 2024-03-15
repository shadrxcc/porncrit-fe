import Image from "next/image"
import ButtonComponent from "../shared/button.component";
import { useRouter } from "next/navigation";
import { UsersModel } from "@/services/models/user.model";
import { memo } from "react";

type ListsComponentProps = {
  title?: string;
  description?: string;
  user?: Partial<UsersModel>;
}

type ListProps = ListsComponentProps & {
  url: string;
};

const List = (props: ListProps) => {
  const { title, description, url, user } = props;
  const router = useRouter()

  return <div className="w-full md:w-standard space-y-3 bg-box rounded-box px-3 sm:px-8 py-10">
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center gap-x-3 justify-between">
        <p className="text-sm font-black">{title}</p>
        <ButtonComponent onClick={() => router.push(url)} variant="secondary" className="!w-fit !p-0">
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.37079 5.9458L1.71079 0.295798C1.61783 0.20207 1.50723 0.127676 1.38537 0.0769072C1.26351 0.0261385 1.1328 0 1.00079 0C0.868781 0 0.738075 0.0261385 0.616216 0.0769072C0.494356 0.127676 0.383755 0.20207 0.290792 0.295798C0.104542 0.483161 0 0.736612 0 1.0008C0 1.26498 0.104542 1.51844 0.290792 1.7058L5.24079 6.7058L0.290792 11.6558C0.104542 11.8432 0 12.0966 0 12.3608C0 12.625 0.104542 12.8784 0.290792 13.0658C0.383407 13.1603 0.493852 13.2355 0.615727 13.287C0.737603 13.3384 0.868485 13.3652 1.00079 13.3658C1.1331 13.3652 1.26398 13.3384 1.38586 13.287C1.50773 13.2355 1.61818 13.1603 1.71079 13.0658L7.37079 7.4158C7.4723 7.32216 7.55331 7.2085 7.60871 7.08201C7.66412 6.95551 7.69273 6.8189 7.69273 6.6808C7.69273 6.5427 7.66412 6.40609 7.60871 6.27959C7.55331 6.15309 7.4723 6.03944 7.37079 5.9458Z" fill="white" />
          </svg>
        </ButtonComponent>
      </div>
      <Image
        className="w-min"
        src={`/assets/images/list.png`}
        alt="hard-porn"
        width={220}
        height={40}
        priority
      />

    </div>

    <p className="text-sm">{description} </p>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-1.5"><img width={16} src="/assets/images/user.png" alt="" /><p className="text-xs">List by <span className="text-pink">{user?.username}</span></p></div>
      <div className="flex items-center gap-2.5 ">
        <span className="flex items-center gap-x-1.5">
          <img src="/assets/icons/video.svg" alt="" />{" "}
          <p className="text-xs text-mauve">125</p>
        </span>
        <span className="flex items-center gap-x-1.5">
          <img src="/assets/icons/comment.svg" alt="" />{" "}
          <p className="text-xs text-mauve">35</p>
        </span>
        <span className="flex items-center gap-x-1.5">
          <img src="/assets/icons/fav.svg" alt="" />{" "}
          <p className="text-xs text-mauve">27</p>
        </span>
      </div>
    </div>
  </div>
}

export default memo(List);