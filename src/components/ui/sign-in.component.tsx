import React from 'react'
import Modal from '../shared/modal.component'
import InputComponent from '../shared/input.component'
import ButtonComponent from '../shared/button.component'

const SignInComponent = () => {
    return (
        <Modal>
            <div className='flex flex-col items-center gap-y-4 '>
                <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Welcome back to PornCrit</p>
                </div>
                <div className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent type='email' label='Email address or Username' />
                        <InputComponent type='password' label='Password' />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent className='rounded-[35px]'>Sign in</ButtonComponent>
                        <p className='text-pink cursor-pointer text-sm'>Forgotten password?</p>
                    </div>
                </div>

            </div>

        </Modal>
    )
}

export default SignInComponent
