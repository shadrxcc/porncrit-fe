import Image from "next/image";
import ButtonComponent from "../shared/button.component";
import { useRouter } from "next/navigation";

const MyReviewsComponent = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col px-2.5 sm:px-9 py-6 rounded-[10px] bg-box gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row gap-3">
          <Image className="w-min object-contain rounded-[2px]" width={60} height={20} src={`/assets/images/videothumb.png`} priority alt="hot-nasty-porn" />
          <div className="flex flex-col gap-y-2.5">
            <div className="flex flex-col gap-y-1.5">
              <div className="flex items-center gap-x-3">
              <p className="text-sm font-medium">Title Goes here cut short if need...</p>
              <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.37079 5.9458L1.71079 0.295798C1.61783 0.20207 1.50723 0.127676 1.38537 0.0769072C1.26351 0.0261385 1.1328 0 1.00079 0C0.868781 0 0.738075 0.0261385 0.616216 0.0769072C0.494356 0.127676 0.383755 0.20207 0.290792 0.295798C0.104542 0.483161 0 0.736612 0 1.0008C0 1.26498 0.104542 1.51844 0.290792 1.7058L5.24079 6.7058L0.290792 11.6558C0.104542 11.8432 0 12.0966 0 12.3608C0 12.625 0.104542 12.8784 0.290792 13.0658C0.383407 13.1603 0.493852 13.2355 0.615727 13.287C0.737603 13.3384 0.868485 13.3652 1.00079 13.3658C1.1331 13.3652 1.26398 13.3384 1.38586 13.287C1.50773 13.2355 1.61818 13.1603 1.71079 13.0658L7.37079 7.4158C7.4723 7.32216 7.55331 7.2085 7.60871 7.08201C7.66412 6.95551 7.69273 6.8189 7.69273 6.6808C7.69273 6.5427 7.66412 6.40609 7.60871 6.27959C7.55331 6.15309 7.4723 6.03944 7.37079 5.9458Z" fill="white" />
              </svg>
              </div>
              <img width={70} src="/assets/images/rating.png" alt="rating" />
            </div>
          </div>
        </div>
        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...</p>
      </div>
      <div className="flex xs:flex-col xs:items-start gap-y-3.5 items-center justify-between">
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-1.5">
            <img src="/assets/icons/comment.svg" alt="comment-icon" />
            <p className="text-xs text-mauve">35</p>
          </div>
          <div className="flex items-center gap-x-1.5">
            <img src="/assets/icons/fav.svg" alt="fav-iocn" />
            <p className="text-xs text-mauve">27</p>
          </div>
        </div>

        <div className="flex gap-5">
          <ButtonComponent onClick={() => router.push('/my-account/lists/edit')} variant="outline">Edit</ButtonComponent>
          <ButtonComponent variant="outline">Delete</ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default MyReviewsComponent;
