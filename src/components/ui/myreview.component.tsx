import Image from "next/image";
import ButtonComponent from "../shared/button.component";

const MyReviewsComponent = () => {
  return (
    <div className="flex flex-col px-2.5 sm:px-9 py-6 rounded-[10px] bg-box gap-y-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-row gap-3">
          <Image className="w-min object-contain rounded-[2px]" width={60} height={20} src={`/assets/images/videothumb.png`} priority alt="hot-nasty-porn" />
          <div className="flex flex-col gap-y-2.5">
            <div className="flex flex-col gap-y-1.5">
              <p className="text-sm font-medium">Title Goes here cut short if need...</p>
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
          <ButtonComponent variant="outline">Edit</ButtonComponent>
          <ButtonComponent variant="outline">Delete</ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default MyReviewsComponent;
