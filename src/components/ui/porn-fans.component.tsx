import React from 'react'
import ButtonComponent from '../shared/button.component'

const PornFansComponent = () => {
  return (
    <div className='flex flex-col gap-y-7'>
        <div className="flex gap-x-2">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-7">
          <img width={65} src="/assets/images/user.png" alt="user" />
          <div className="flex flex-col gapp-y-3">
            <p className="text-pink text-sm">Username</p>
            <p className="text-sm">177 followers</p>
          </div>
        </div>
        <div className="flex items-center gap-x-14">
          <div>
            <p className="leading-[25px] text-sm text-pink">Reviews</p>
            <p className="text-sm leading-[25px]">18.5k</p>
          </div>

          <div>
            <p className="leading-[25px] text-sm text-pink">Lists</p>
            <p className="text-sm leading-[25px]">652</p>
          </div>

          <div>
            <p className="leading-[25px] text-sm text-pink">Likes</p>
            <p className="text-sm leading-[25px]">72.4k</p>
          </div>
        </div>

       
      </div>

      <ButtonComponent className="w-full">Follow</ButtonComponent>
    </div>

<div className="flex flex-col gap-y-5">
<p className="text-sn font-medium">Popular tags this week</p>
<div className="flex flex-wrap items-center gap-4">
  <ButtonComponent className="rounded-[20px]" variant="tags">
    Big boobs
  </ButtonComponent>
  <ButtonComponent className="rounded-[20px]" variant="tags">
    Brunette
  </ButtonComponent>
  <ButtonComponent className="rounded-[20px]" variant="tags">
    Masturbation
  </ButtonComponent>
</div>
</div>

<div className="flex flex-col gap-y-3">
          <p className="text-sm font-medium">Favorite performers</p>
          <div className="flex items-center gap-x-2">
            <img width={50} src="/assets/images/tori.png" alt="tori" />
            <ButtonComponent className="rounded-[20px]" variant="tags">
              Tori Black
            </ButtonComponent>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <p className="text-sm">Average rating based on 1.4k reviews</p>
          <img src="/assets/images/average.png" width={100} alt="" />
        </div>
    </div>
  )
}

export default PornFansComponent