import ButtonComponent from '@/components/shared/button.component'
import PopularReviewsComponent from '@/components/ui/popular-reviews.component'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='mx-auto mt-8 flex flex-col gap-y-8 lg:w-9/12 xl:w-3/5'>
      <div className='w-fit space-y-1'>
        <p className='text-xl font-bold'>Lists</p>
        {/* show when signed in */}
        {/* <p className='text-sm text-pink'>Create <span className='text-mauve'>and share lists of the porn you love</span></p> */}
        <p className='text-sm text-pink'>Join <span className='text-mauve'>PornCrit to create and share lists of the porn you love</span></p>
      </div>

<div className='flex flex-col gap-y-7'>
 <div className='flex items-center gap-x-8'>
 <div className='flex items-center gap-x-10'>
        <ButtonComponent className='' variant='white'>Popular</ButtonComponent>
        <ButtonComponent variant='outline'>Recent</ButtonComponent>
        <ButtonComponent variant='outline'>Following</ButtonComponent>
      </div>

      <div className='flex items-center gap-x-1'>
        <Image src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' />
        <p className='text-xs'>Sort by</p>
      </div>
 </div>

      <div className="flex flex-col gap-y-10">
          {[1, 2, 3, 4].map((e) => (
            <PopularReviewsComponent key={e} />
          ))}
          </div>
</div>
      
    </div>
  )
}

export default page