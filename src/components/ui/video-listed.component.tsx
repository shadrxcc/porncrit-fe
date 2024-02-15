import Image from "next/image";

const VideoListed = () => {
    return <div className="space-y-7"><div>
    <div className="flex items-center gap-x-2">
        <img src="/assets/images/user.png" width={45} alt="" />
        <p className="text-sm font-[350]"><span className="font-black text-pink">John</span> added this videos to their <span className="font-black text-pink">watch later list</span></p>
    </div>
    <div className="flex flex-col lg:items-center lg:flex-row gap-x-5 gap-y-2">
      <Image
        className="w-full lg:w-min"
        src={`/assets/images/playlist.png`}
        alt="hard-porn"
        width={226}
        height={60}
        priority
      />
      <div className="flex flex-row flex-wrap lg:flex-col gap-2.5 ">
        <p className="text-xs text-mauve">125 videos</p>
        <span className="flex items-center gap-x-1.5">
          <img src="/assets/icons/comment.svg" alt="" />{" "}
          <p className="text-xs text-mauve">35 comments</p>
        </span>
        <span className="flex items-center gap-x-1.5">
          <img src="/assets/icons/fav.svg" alt="" />{" "}
          <p className="text-xs text-mauve">27 likes</p>
        </span>
      </div>
    </div>
</div>
<div>
        <div className="flex items-center gap-x-2">
            <img src="/assets/images/user.png" width={45} alt="" />
            <p className="text-sm font-[350]"><span className="font-black text-pink">John</span> added this videos to their list <span className="font-black text-pink">sexy ass brunettes</span></p>
        </div>
        <div className="flex flex-col lg:items-center lg:flex-row gap-x-5 gap-y-2">
          <Image
            className="w-full lg:w-min"
            src={`/assets/images/playlist.png`}
            alt="hard-porn"
            width={226}
            height={60}
            priority
          />
          <div className="flex flex-row flex-wrap lg:flex-col gap-2.5 ">
            <p className="text-xs text-mauve">125 videos</p>
            <span className="flex items-center gap-x-1.5">
              <img src="/assets/icons/comment.svg" alt="" />{" "}
              <p className="text-xs text-mauve">35 comments</p>
            </span>
            <span className="flex items-center gap-x-1.5">
              <img src="/assets/icons/fav.svg" alt="" />{" "}
              <p className="text-xs text-mauve">27 likes</p>
            </span>
          </div>
        </div>
    </div></div>
}

export default VideoListed;