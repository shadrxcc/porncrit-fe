import React from 'react'

import InputComponent from '../shared/input.component'
import ButtonComponent from '../shared/button.component'

const SignupComponent = ({ login }: { login: () => void }) => {
  return (

    <div className='flex flex-col items-center gap-y-4'>
      <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Join PornCrit</p>
        <p className='text-mauve text-sm'>To rate & review. Discuss & discover. Like, list & log the videos you love. And connect with fans!</p></div>
      <div className='flex flex-col gap-y-3.5'>
        <div className='flex flex-col gap-y-6'>
          <InputComponent type="email" label='Email address' />
          <InputComponent type="text" label='Username' />
          <InputComponent type="password" label='Password' />
          <div className='flex gap-x-3.5'>

            <input type="checkbox" name="terms" id="terms" /><p className='text-brown text-sm'>I’m 18 or older and accept PornCrit’s <span className='text-pink underline'>Terms and Conditions</span> and <span className='text-pink underline'>Privacy Policy</span>.</p>
          </div>


        </div><div className='flex flex-col items-center justify-center gap-y-2.5'>
          <ButtonComponent className='rounded-[35px]'>Sign up</ButtonComponent>
          <span className='flex gap-x-1 items-center'>
            <p className='text-mauve text-sm'>Already have an account? </p><ButtonComponent onClick={login} className='!bg-transparent !text-pink !p-0'>Sign in</ButtonComponent>
          </span>


        </div>
      </div>

    </div>
  )
}

export default SignupComponent