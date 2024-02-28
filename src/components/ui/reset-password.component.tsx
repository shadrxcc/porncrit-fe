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
    code: string;
}

type NewProps = {
    password: string;
    confirmpassword: string;
}


const ConfirmOtpComponent = ({ login, reset }: { login: () => void, reset: () => void }) => {
    const [isLoading, setLoading] = useState(false)
    const [otp, setOtp] = useState("");

    const handleReset = (props: ResetProps) => {
        setLoading(true)
        axios.patch(`${API_URL}/auth/reset-password`, props)
            .then((res) => {
                toast.success(res?.data?.message, {
                    position: "bottom-center"
                })
                reset()
                login()
            })
            .catch((err) => {
                console.log(err?.response?.data?.message || 'Error Completing request. Try again later.')
            })
            .finally(() => setLoading(false));
    }
    return (
        <div className='flex flex-col items-center gap-y-4 '>
            <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>User Verification</p>
                <p className='text-mauve text-sm'>Please enter the 4 digit code we emailed to email@example.com </p>
            </div>
            <Formik
                initialValues={{
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
                onSubmit={() => {
                    const params = {
                        code: otp
                    }
                    handleReset(params)
                }}
            >
                <Form className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={4}
                            containerStyle="otp-input"
                            inputStyle="otp"
                            renderInput={(props) => <input name='otp' {...props} />}
                        />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent loading={isLoading} disabled={isLoading} type="submit" className='rounded-[35px]'>Confirm</ButtonComponent>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default ConfirmOtpComponent


export const PasswordResetComponent = ({ login }: { login: () => void }) => {
    const [isLoading, setLoading] = useState(false)

    const handleReset = (props: NewProps) => {
        setLoading(true)
        axios.patch(`${API_URL}/auth/reset-password`, props)
            .then((res) => {
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
            <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Reset Password</p>
                {/* <p className='text-mauve text-sm'>Please enter the 4 digit code we emailed to email@example.com </p> */}
            </div>
            <Formik
                initialValues={{
                    password: "",
                    confirmpassword: ""
                }}
                validationSchema={Yup.object({
                })}
                onSubmit={(value) => {

                    handleReset({ ...value })
                }}
            >
                <Form className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent placeholder="Enter a new password" type="password" name="password" label='Password' />
                        <InputComponent placeholder="Confirm new password" type="password" name="confirmpassword" label='Confirm Password' />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent loading={isLoading} disabled={isLoading} type="submit" className='rounded-[35px]'>Reset password</ButtonComponent>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}