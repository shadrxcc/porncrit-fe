import ButtonComponent from '@/components/shared/button.component'
import FollowerComponent from '@/components/ui/follower.component'
import PornFansComponent from '@/components/ui/porn-fans.component'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <div className='mx-auto mt-8 flex flex-col gap-y-8 md:w-standard'>
      <div className='w-fit space-y-1'>
        <p className='text-xl font-bold'>Fans</p>
        {/* show when signed in */}
        {/* <p className='text-sm text-mauve'>Connect with fans who love the porn you love</p> */}
        <p className='text-sm text-pink'>Join <span className='text-mauve'>PornCrit to find and follow porn fans</span></p>
      </div>

      <div className='flex flex-col gap-y-7'>
        <div className='flex items-center flex-wrap gap-y-4 gap-x-8'>
          <div className='flex items-center gap-x-10'>
            <ButtonComponent className='' variant='white'>Popular</ButtonComponent>
            <ButtonComponent variant='outline'>Recent</ButtonComponent>
            <ButtonComponent variant='outline'>Following</ButtonComponent>
          </div>

          <div className='flex items-center gap-x-1'>
            <Image src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' />
          </div>
        </div>

        <div className='flex flex-col gap-11'>
          {[1, 2, 3, 4, 5, 6].map((e) => (
            <FollowerComponent key={e} />
          ))}
        </div>
      </div>

    </div>
  )
}

export default page