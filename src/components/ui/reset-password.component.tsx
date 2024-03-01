import { Form, Formik, FormikState } from 'formik'
import * as Yup from "yup";
import InputComponent from '../shared/input.component';
import ButtonComponent from '../shared/button.component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/services/utils';
import { toast } from 'react-toastify';
import OTPInput from 'react-otp-input';

type ResetProps = {
    code: string;
    email: string;
    passwordReset: boolean
}

type NewProps = {
    newPassword: string;
    userId: string;
    token: string;
}


const ConfirmOtpComponent = ({ reset, email }: { reset: (userId: string, token: string) => void, email: string }) => {
    const [isLoading, setLoading] = useState(false)
    const [otp, setOtp] = useState("");
    const [entermail, setEnteredMail] = useState('')

    useEffect(() => {
        if (email) {
            setEnteredMail(email);
        }
    }, [email]);

    const handleReset = (props: ResetProps) => {
        setLoading(true)
        axios.post(`${API_URL}/auth/verify-code`, props)
            .then((res) => {
                toast.success(res?.data?.message, {
                    position: "bottom-center"
                })
                const userId = res?.data?.data.userId
                const token = res?.data?.data.token

                reset(userId, token)
            })
            .catch((err) => {
                console.log(err?.response?.data?.message || 'Error Completing request. Try again later.')
            })
            .finally(() => setLoading(false));
    }
    return (
        <div className='flex flex-col items-center gap-y-4 '>
            <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>User Verification</p>
                <p className='text-mauve text-sm'>Please enter the 4 digit code we emailed to {email} </p>
            </div>
            <Formik
                initialValues={{
                }}
                validationSchema={Yup.object({
                })}
                onSubmit={() => {
                    const params = {
                        code: otp,
                        email: entermail,
                        passwordReset: true
                    }
                    console.log(params);

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


export const PasswordResetComponent = ({ login, userid, toKen }: { login: () => void, userid: string, toKen: string }) => {
    const [isLoading, setLoading] = useState(false)
    const [id, setId] = useState('')
    const [tk, setTk] = useState('')

    useEffect(() => {
        if (userid && toKen) {
            setId(userid);
            setTk(toKen)
        }
    }, [userid,toKen]);

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
                    newPassword: "",
                }}
                validationSchema={Yup.object({
                })}
                onSubmit={(value) => {

                    handleReset({
                        ...value,
                        userId: id,
                        token:tk
                    })
                }}
            >
                <Form className='flex flex-col w-full gap-y-3.5'>
                    <div className='flex flex-col gap-y-8'>
                        <InputComponent placeholder="Enter a new password" type="password" name="newPassword" label='Password' />
                        {/* <InputComponent placeholder="Confirm new password" type="password" name="confirmpassword" label='Confirm Password' /> */}
                    </div>
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent loading={isLoading} disabled={isLoading} type="submit" className='rounded-[35px]'>Reset password</ButtonComponent>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}