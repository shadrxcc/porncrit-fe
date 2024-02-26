import { Form, Formik } from 'formik'
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import OtpInput from "react-otp-input";
import ButtonComponent from '../shared/button.component'
import axios from 'axios';
import { API_URL } from '@/services/utils';
import { toast } from 'react-toastify';

type VerifyEmailProps = {
    userId: string;
    verificationCode: string
}

const VerifyEmailComponent = ({signin}:{signin:()=>void}) => {
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState(false)
    const [otp, setOtp] = useState("");
    const [userId, setUserId] = useState("");


    useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("currentuser");
            if (userData) {
                const decryptedData = JSON.parse(userData);
                setEmail(decryptedData?.email);
                setUserId(decryptedData?._id)
                
            } else console.log("/sign-up");
        }
    }, []);

    const handleVerify = (props: VerifyEmailProps) => {
        setLoading(true)
        axios.post(`${API_URL}/auth/verify-email`, { ...props })
            .then(() => {
                toast.success("Email verified!")
                signin()
            })
            .catch((err) => {
                console.log(err?.response?.data?.message || 'Error Completing request. Try again later.')
                setLoading(false);
            });
    }



    return (
        <div className='flex flex-col items-center gap-y-4 '>
            <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Email Verification</p>
                <p className='text-mauve text-sm'>Please enter the 4 digit code we emailed to {email}. </p>
            </div>
            <Formik
                initialValues={{}}
                validationSchema={Yup.object({
                })}
                onSubmit={() => {
                    const params = {
                        verificationCode: otp, userId
                    };
                    handleVerify(params)


                }}
            >
                <Form className='flex flex-col w-full gap-y-3.5'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        containerStyle="otp-input"
                        inputStyle="otp"
                        renderInput={(props) => <input name='otp' {...props} />}
                    />
                    <div className='flex flex-col items-center justify-center gap-y-2.5'>
                        <ButtonComponent loading={isLoading} disabled={isLoading} type="submit" className='rounded-[35px]'>Enter</ButtonComponent>
                        <span className='flex gap-x-1 items-center'>
                            <p className='text-mauve text-sm'>Didn’t receive a code?</p><ButtonComponent type='button' className='!bg-transparent !text-pink !p-0'>Resend</ButtonComponent>
                        </span>
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default VerifyEmailComponent
