import Image from "next/image";
import ButtonComponent from "../shared/button.component";

const ListedVideo = () => {
  return (
    <div className="flex flex-col gap-y-6 px-2.5 sm:px-9 py-6 rounded-[10px] bg-box">
      <div className="flex gap-5">
        {" "}
        <Image
          src={`/assets/images/4some.png`}
          width={88}
          height={50}
          className="rounded-sm"
          alt="foursome"
        />
        <div className="text-sm flex flex-col gap-y-4">
          <p>Title goes here cut short if need...</p>
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
  );
};

export default ListedVideo;
