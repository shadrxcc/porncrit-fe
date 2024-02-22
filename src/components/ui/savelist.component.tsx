import React from 'react'
import ButtonComponent from '../shared/button.component'
import AddSvg from '../shared/add.component'

const SavelistComponent = () => {
  return (
    <div className=''>
        <div className="flex items-center justify-between"><p className='text-brown text-sm font-extrabold'>Save videos to...</p></div>

       <div className='flex flex-col gap-y-5'>
       <div className='flex mt-6 flex-col gap-y-[22px]'>
        <label htmlFor="watched" className="text-brown flex items-center gap-x-2.5 text-sm font-light">
          <input type="checkbox" name="watched" id="watched" />
          Watchlist
        </label>
        <label htmlFor="watched" className="text-brown flex items-center gap-x-2.5 text-sm font-light">
          <input type="checkbox" name="watched" id="watched" />
          List title
        </label>
        <label htmlFor="watched" className="text-brown flex items-center gap-x-2.5 text-sm font-light">
          <input type="checkbox" name="watched" id="watched" />
          List title
        </label>
        <label htmlFor="watched" className="text-brown flex items-center gap-x-2.5 text-sm font-light">
          <input type="checkbox" name="watched" id="watched" />
          List title
        </label>
        </div>

        <hr className='border-none bg-mauve h-[1px]' />

        <div className='flex items-center justify-between'>
        <ButtonComponent variant='secondary' className='!w-fit !text-pink !p-0'><AddSvg/> Create new list</ButtonComponent>
        <ButtonComponent className='!w-fit'>Done</ButtonComponent>
        </div>
       </div>
    </div>
  )
}

export default SavelistComponent