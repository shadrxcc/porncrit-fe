import { useState } from "react";
import ButtonComponent from "../shared/button.component"
import InputComponent from "../shared/input.component"
import { Form, Formik, FormikState } from "formik";
import * as Yup from "yup";
import { API_URL } from "@/services/utils";
import axios from "axios";
import { ForgotPassword } from "@/services/models/user.model";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

type ForgottenPasswordProps = {
    login: () => void;
    signup: () => void;
    reset: (email:string) => void;
}

const ForgottenPasswordComponent = (props: ForgottenPasswordProps) => {
    const { login, signup,reset } = props;
    const [isLoading, setLoading] = useState(false)

    const handleRequest = (email: ForgotPassword, resetForm: { (nextState?: Partial<FormikState<{ email: string; }>> | undefined): void; (): void; }) => {
        setLoading(true)
        axios.post(`${API_URL}/auth/request-password-reset`, email)
            .then((res) => {
                resetForm();
                toast.success(res?.data?.message, {
                    position: "bottom-center"
                })
                reset(email.email)
            })
            .catch((err) => {
                console.log(err?.response?.data?.message || 'Error Completing request. Try again later.')
            })
            .finally(() => setLoading(false));
    }

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
                onSubmit={(value, { resetForm }) => {
                    handleRequest({ ...value }, resetForm)
                }}
            >
                <Form className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent name='email' type="email" label='Enter email address' />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent loading={isLoading} disabled={isLoading} type="submit" className='rounded-[35px]'>Send code</ButtonComponent>
                        <p className='text-mauve text-sm'>Back to <span onClick={login} className="text-pink cursor-pointer font-semibold">sign in</span> or <span onClick={signup} className="text-pink cursor-pointer font-semibold">sign up</span></p>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ForgottenPasswordComponent
