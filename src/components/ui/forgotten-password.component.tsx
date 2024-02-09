import ButtonComponent from "../shared/button.component"
import InputComponent from "../shared/input.component"

type ForgottenPasswordProps = {
    login: () => void;
    signup: () => void;
}

const ForgottenPasswordComponent = (props:ForgottenPasswordProps) => {
const {login, signup} = props;

  return (
            <div className='flex flex-col items-center gap-y-4 '>
                <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Forgotten password</p>
                <p className='text-mauve text-sm'>Enter the email address connected to your account and we’ll send you a code to reset your password. </p>
                </div>
                <div className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent type="email" label='Enter email address' />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent className='rounded-[35px]'>Send code</ButtonComponent>
                        <p className='text-mauve text-sm'>Back to <span onClick={login} className="text-pink cursor-pointer font-semibold">sign in</span> or <span onClick={signup} className="text-pink cursor-pointer font-semibold">sign up</span></p>
                    </div>
                </div>

            </div>
  )
}

export default ForgottenPasswordComponent
