import Image from "next/image";
import Link from "next/link";

const PopularListComponent = () => {
  return (
    <div className="space-y-3 bg-box rounded-box py-3.5 px-4 lg:px-8">
      <Link href={`/user-account`}><div className="flex items-center gap-x-3">
        <img src="/assets/images/user.png" width={33} alt="pfp" />
        <p className="text-sm text-pink-2 font-medium">Username</p>
      </div></Link>

      <div className="flex flex-col gap-y-3">
        <p className="text-sm">List title (including if watchlist)</p>
        <div className="flex gap-x-4">
          <Image
            className=""
            src={`/assets/images/thumb2.png`}
            alt="hard-porn"
            width={167}
            height={60}
            priority
          />
          <div className="flex flex-col gap-y-2.5 ">
            <p className="text-xs text-mauve">125 videos</p>
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
    </div>
  );
};

export default PopularListComponent;
