"use client";

import Image from "next/image";
import ButtonComponent from "../shared/button.component";
import { useState } from "react";

const FollowerComponent = () => {
  const [follow, setFollow] = useState(false);
  return (
    <div className="flex xs:flex-col flex-row bg-box rounded-box px-2 sm:px-8 py-10 items-center gap-y-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <Image
          src={`/assets/images/user.png`}
          className="sm:w-[120px]"
          width={50}
          height={50}
          alt="follower pfp"
        />
        <div className="flex flex-col gap-y-1.5 text-sm leading-6">
        <div className="space-y-1"><p className="text-pink">Username</p>
            <p>177 Followers</p>
          </div>
          <div className="flex items-center gap-x-2.5 sm:gap-x-12">
            <div className="space-y-1">
              <p className="text-pink">Reviews</p>
              <p>18.5k</p>
            </div>

            <div className="space-y-1">
              <p className="text-pink">Lists</p>
              <p>177</p>
            </div>

            <div className="space-y-1">
              <p className="text-pink">Likes</p>
              <p>72.4k</p>
            </div>
          </div>

        </div>
      </div>

      <ButtonComponent
        onClick={() => setFollow(!follow)}
      >
        {follow ? "Following" : "Follow"}
      </ButtonComponent>
    </div>
  );
};

export default FollowerComponent;
