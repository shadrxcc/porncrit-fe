import { Form, Formik } from 'formik'
import * as Yup from "yup";
import React, { useEffect, useState } from 'react'
import OtpInput from "react-otp-input";
import ButtonComponent from '../shared/button.component'

const VerifyEmailComponent = () => {
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState(false)
    const [otp, setOtp] = useState("");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const userData = localStorage.getItem("currentuser");
            if (userData) {
                const decryptedData = JSON.parse(userData);
                setEmail(decryptedData?.email);
            } else console.log("/sign-up");
        }
    }, []);

    return (
        <div className='flex flex-col items-center gap-y-4 '>
            <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Email Verification</p>
                <p className='text-mauve text-sm'>Please enter the 4 digit code we emailed to {email}. </p>
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
                onSubmit={() => {

                }}
            >
                <Form className='flex flex-col w-full gap-y-3.5'>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={4}
                        containerStyle="otp-input"
                        inputStyle="otp"
                        renderInput={(props) => <input {...props} />}
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
