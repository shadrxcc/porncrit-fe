import ButtonComponent from "../shared/button.component"
import InputComponent from "../shared/input.component"
import Modal from "../shared/modal.component"

const ForgottenPasswordComponent = () => {
  return (
    <Modal>
            <div className='flex flex-col items-center gap-y-4 '>
                <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Forgotten password</p>
                <p className='text-mauve text-sm'>Enter the email address connected to your account and we’ll send you a code to reset your password. </p>
                </div>
                <div className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent label='Enter email address' />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent className='rounded-[35px]'>Send code</ButtonComponent>
                        <p className='text-mauve text-sm'>Back to <span className="text-pink font-semibold">sign in</span> or <span className="text-pink font-semibold">sign up</span></p>
                    </div>
                </div>

            </div>

        </Modal>
  )
}

export default ForgottenPasswordComponent
