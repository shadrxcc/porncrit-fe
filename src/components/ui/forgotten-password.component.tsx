import ButtonComponent from "../shared/button.component"
import InputComponent from "../shared/input.component"
import { Form, Formik } from "formik";
import * as Yup from "yup";

type ForgottenPasswordProps = {
    login: () => void;
    signup: () => void;
}

const ForgottenPasswordComponent = (props: ForgottenPasswordProps) => {
    const { login, signup } = props;

    return (
        <div className='flex flex-col items-center gap-y-4 '>
            <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Forgotten password</p>
                <p className='text-mauve text-sm'>Enter the email address connected to your account and we’ll send you a code to reset your password. </p>
            </div>
            <Formik
                initialValues={{
                    email: "",
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Email Required")
                        .matches(
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            "Invalid email address pattern"
                        ),
                })}
                onSubmit={(value) => {
                    console.log(value);
                }}
            >
                <Form className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent name='email' type="email" label='Enter email address' />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent type="submit" className='rounded-[35px]'>Send code</ButtonComponent>
                        <p className='text-mauve text-sm'>Back to <span onClick={login} className="text-pink cursor-pointer font-semibold">sign in</span> or <span onClick={signup} className="text-pink cursor-pointer font-semibold">sign up</span></p>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ForgottenPasswordComponent
