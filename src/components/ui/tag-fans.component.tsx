"use client"

import React, { useState } from 'react'
import ButtonComponent from '../shared/button.component'
import Image from 'next/image';

const TagFansComponent = () => {
    const [follow, setFollow] = useState(false);
    return (
      <div className="flex lg:w-[80%] items-center justify-between">
        <div className="flex gap-x-8 items-center">
          <Image
            src={`/assets/images/user.png`}
            width={100}
            height={100}
            alt="follower pfp"
          />
          <div className="flex flex-col gap-y-4 text-sm leading-6">
            <p className="text-pink">Username</p>
            <p>177 followers</p>
            <p>74.5k "tag title" videos watched</p>
            <p>4.4k likes</p>
          </div>
        </div>
  
        <ButtonComponent
          onClick={() => setFollow(!follow)}
          variant={follow ? "pink" : "outline"}
        >
          {follow ? "Following" : "Follow"}
        </ButtonComponent>
      </div>
  )
}

export default TagFansComponent