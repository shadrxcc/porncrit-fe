import React from 'react'
import Modal from '../shared/modal.component'
import InputComponent from '../shared/input.component'

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
        </div>
        </div>

    </Modal>
  )
}

export default SignupComponent