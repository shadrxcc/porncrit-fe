import { Form, Formik, FormikState } from 'formik'
import * as Yup from "yup";
import InputComponent from '../shared/input.component';
import ButtonComponent from '../shared/button.component';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/services/utils';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';

type ResetProps = {
    email: string;
    code: string;
    newPassword: string;
}

const ResetPasswordComponent = ({ login }: { login: () => void }) => {
    const [isLoading, setLoading] = useState(false)
    const [otp, setOtp] = useState("");

    const handleReset = (props: ResetProps, resetForm: {
        (nextState?: Partial<FormikState<{
            email: string; code: string;
            newPassword: string;
        }>> | undefined): void; (): void;
    }) => {
        setLoading(true)
        axios.patch(`${API_URL}/auth/reset-password`, props)
            .then((res) => {
                resetForm();
                toast.success(res?.data?.message, {
                    position: "bottom-center"
                })
                login()
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
                    newPassword: "",
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
                    const params = {
                        ...value,
                        code: otp
                    }
                    handleReset(params, resetForm)
                }}
            >
                <Form className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent name='email' type="email" label='Enter email address' />
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            containerStyle="otp-input"
                            inputStyle="otp"
                            renderInput={(props) => <input name='otp' {...props} />}
                        />
                        <InputComponent name="newPassword" type='password' label='Password' />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent loading={isLoading} disabled={isLoading} type="submit" className='rounded-[35px]'>Reset password</ButtonComponent>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ResetPasswordComponent
