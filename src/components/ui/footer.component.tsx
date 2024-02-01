import React from 'react'

const FooterComponent = () => {
  return (
    <div className="bg-black flex flex-col lg:flex-row lg:items-center px-4 gap-y-7 sm:px-8 lg:px-20 py-5 mt-20 justify-between">
      <div className='flex flex-col lg:flex-row text-sm gap-y-5 gap-x-10'>
        <p>Porncrit Ltd.</p>
        <p>Terms</p>
        <p>Contact us</p>
      </div>
      <div>
        <p className='text-sm'>Made by fans on planet Earth</p>
      </div>
      <div className='flex items-center gap-x-12'>
        <img width={20} src="/assets/icons/reddit.png" alt="reddit" />
        <img width={20} src="/assets/icons/instagram.png" alt="instagram" />
        <img width={20} src="/assets/icons/x.png" alt="x" />
      </div>
    </div>
  )
}

export default FooterComponent