"use client"

import React, { useState } from 'react'
import ButtonComponent from '../shared/button.component'
import Image from 'next/image';
import FollowerComponent from './follower.component';

const TagFansComponent = () => {
    return (
      <div className="flex flex-col gap-y-10">
     {[1,2,3,4].map((e) => (
      <FollowerComponent key={e}/>
     ))}
      </div>
  )
}

export default TagFansComponent