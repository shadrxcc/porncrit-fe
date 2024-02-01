import React from 'react'
import Modal from '../shared/modal.component'
import InputComponent from '../shared/input.component'
import ButtonComponent from '../shared/button.component'

const ChangePasswordComponent = () => {
    return (
        <Modal>
            <div className='flex flex-col items-center gap-y-4 '>
                <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Change password</p>
                </div>
                <div className='flex flex-col gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent label='Enter new password' />
                        <InputComponent label='Confirm new password' />
                    </div><div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent className='rounded-[35px]'>Reset</ButtonComponent>
                    </div>
                </div>

            </div>

        </Modal>
    )
}

export default ChangePasswordComponent;