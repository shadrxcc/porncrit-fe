import React from 'react'
import Modal from '../shared/modal.component'
import InputComponent from '../shared/input.component'
import ButtonComponent from '../shared/button.component'

const SignupComponent = () => {
  return (
    <Modal>
        <div className=' '>
            <div><p className='text-brown text-xl'>Join PornCrit</p>
            <p className='text-mauve text-sm'>To rate & review. Discuss & discover. Like, list & log the videos you love. And connect with fans!</p></div>
        <div className='flex flex-col gap-y-8'>
            <InputComponent label='Email address'/>
            <InputComponent label='Username'/>
            <InputComponent label='Password'/>
            <div className='flex gap-x-3.5'>
              
              <input type="checkbox" name="terms" id="terms" /><p className='text-brown'>I’m 18 or older and accept PornCrit’s <span className='text-pink underline'>Terms and Conditions</span> and <span className='text-pink underline'>Privacy Policy</span>.</p>
            </div>

            <div>
              <ButtonComponent className='rounded-[35px]'>Sign up</ButtonComponent>
             <p className='text-pink'>Sign in</p>
            </div>
        </div>
        </div>

    </Modal>
  )
}

export default SignupComponent