import Image from "next/image";
import React from "react";

const TagLikeComponent = () => {
  return (
    <div className="lg:w-[90%] flex flex-col gap-y-12">
      {[1,2,3,4,5].map((e) => (
        <div key={e} className="flex flex-col lg:flex-row lg:items-center gap-3">
        <Image
          className="w-full lg:w-min"
          width={177}
          height={100}
          src={`/assets/images/cuties.png`}
          priority
          alt="hot-nasty-porn"
        />
        <div className="flex text-sm flex-col gap-y-3.5">
          <p>Hot lesbian sex</p>
          <div className="flex items-center gap-x-3">
            <img src="/assets/images/user.png" width={20} alt="" />
            <p className="text-pink">username</p>
          </div>

          <div className="flex items-center gap-x-2">
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.45067 9.90821L9.40329 16.4395C9.64278 16.6644 9.76253 16.7769 9.90372 16.8046C9.9673 16.8171 10.0327 16.8171 10.0963 16.8046C10.2375 16.7769 10.3572 16.6644 10.5967 16.4395L17.5493 9.90821C19.5055 8.07059 19.743 5.0466 18.0978 2.92607L17.7885 2.52734C15.8203 -0.00942016 11.8696 0.416014 10.4867 3.31365C10.2913 3.72296 9.70868 3.72296 9.51333 3.31365C8.13037 0.416014 4.17972 -0.00941634 2.21154 2.52735L1.90219 2.92607C0.256947 5.0466 0.494498 8.07059 2.45067 9.90821Z"
                fill="#F71D7F"
                stroke="#F71D7F"
              />
            </svg>{" "}
            <p className="text-mauve">1 hr ago</p>
          </div>
        </div>
      </div>
      ))}
    </div>
  );
};

export default TagLikeComponent;
