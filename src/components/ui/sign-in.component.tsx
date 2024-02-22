import React from 'react'
import InputComponent from '../shared/input.component'
import ButtonComponent from '../shared/button.component'

const SignInComponent = ({ forgot,signup }: { forgot: () => void, signup: () => void }) => {
    return (
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
                    <span className='flex gap-x-1 items-center'>
                        <p className='text-mauve text-sm'>Don’t have an account? </p><ButtonComponent onClick={signup} className='!bg-transparent !text-pink !p-0'>Sign up</ButtonComponent>
                    </span>
                    <ButtonComponent onClick={forgot} className='!text-pink !bg-transparent'>Forgotten password?</ButtonComponent>
                </div>
            </div>

        </div>
    )
}

export default SignInComponent
