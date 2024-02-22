import Image from "next/image";
import Link from "next/link";

const PopularListComponent = () => {
  return (
    <div className="space-y-3">
      <Link href={`/user-account`}><div className="flex items-center gap-x-3">
        <img src="/assets/images/user.png" width={33} alt="pfp" />
        <p className="text-sm text-pink-2 font-medium">Username</p>
      </div></Link>

      <div className="flex flex-col gap-y-3">
        <p className="text-sm">List title (including if watchlist)</p>
        <div className="flex flex-col xl:flex-row gap-x-5 gap-y-2">
          <Image
            className="w-full xl:w-min"
            src={`/assets/images/thumb2.png`}
            alt="hard-porn"
            width={167}
            height={60}
            priority
          />
          <div className="flex flex-row flex-wrap xl:flex-col gap-2.5 ">
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
    </div>
  );
};

export default PopularListComponent;
