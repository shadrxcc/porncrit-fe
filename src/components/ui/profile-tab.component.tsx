import React from 'react'
import ButtonComponent from '../shared/button.component'
import Image from 'next/image'
import ReviewsComponent from './reviews.component'

const ProfileTabComponent = () => {
  return (
    <div>
       <div className='flex flex-wrap gap-5 items-center'>
       <div className='flex flex-wrap gap-y-5 items-center gap-x-5 sm:gap-x-10'>
        <ButtonComponent className='' variant='white'>Watched</ButtonComponent>
        <ButtonComponent variant='outline'>Reviews</ButtonComponent>
        <ButtonComponent variant='outline'>Activity</ButtonComponent>
        <ButtonComponent className='' variant='outline'>Lists</ButtonComponent>
        <ButtonComponent variant='outline'>Likes</ButtonComponent>
        <ButtonComponent variant='outline'>Followers</ButtonComponent>
      </div>
      <div className='flex items-center gap-x-1'>
        <Image src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' />
        <p className='text-xs'>Sort by</p>
      </div>
       </div>

       <div className='flex mt-9 flex-col gap-y-9'>
       {[1, 2, 3, 4].map((e) => (
             <ReviewsComponent key={e}/>
          ))}
       </div>
    </div>
  )
}

export default ProfileTabComponent