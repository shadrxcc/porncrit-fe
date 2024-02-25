import React from 'react'
import InputComponent from '../shared/input.component'
import ButtonComponent from '../shared/button.component'
import { Form, Formik } from "formik";
import * as Yup from "yup";

const SignInComponent = ({ forgot, signup }: { forgot: () => void, signup: () => void }) => {
    return (
        <div className='flex flex-col items-center gap-y-4 '>
            <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Welcome back to PornCrit</p>
            </div>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={Yup.object({
                    password: Yup.string()
                        .required("Required")
                        .min(6, "Password must be 6 characters and above"),
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
                <Form className='w-full'>
                    <div className='flex flex-col w-full gap-y-3.5'>
                        <div className='flex flex-col gap-y-8'>
                            <InputComponent name='email' type='email' label='Email address or Username' />
                            <InputComponent name="password" type='password' label='Password' />
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-2.5'>
                            <ButtonComponent type="submit" className='rounded-[35px]'>Sign in</ButtonComponent>
                            <span className='flex gap-x-1 items-center'>
                                <p className='text-mauve text-sm'>Don’t have an account? </p><ButtonComponent type='button' onClick={signup} className='!bg-transparent !text-pink !p-0'>Sign up</ButtonComponent>
                            </span>
                            <ButtonComponent onClick={forgot} type='button' className='!text-pink !bg-transparent'>Forgotten password?</ButtonComponent>
                        </div>
                    </div>
                </Form>
            </Formik>


        </div>
    )
}

export default SignInComponent
