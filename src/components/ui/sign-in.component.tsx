import React from 'react'
import InputComponent from '../shared/input.component'
import ButtonComponent from '../shared/button.component'
import { Form, Formik } from "formik";
import { selectAuthStatus } from "@/services/auth-services/selector";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { asyncLoginUser } from '@/services/auth-services/async-actions';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const SignInComponent = ({ forgot, signup, close, verify }: { forgot: () => void, signup: () => void, close: () => void, verify: (email: string, userId: string) => void }) => {
    const authStatus = useSelector(selectAuthStatus);
    const loading = authStatus === "pending";
    const dispatch: AppDispatchType = useDispatch();

    async function handleSubmit(values: { email: string; password: string }) {
        try {
            const resultAction = await dispatch(
                asyncLoginUser({
                    email: values.email,
                    password: values.password,
                    close
                })
            );

            const result = unwrapResult(resultAction);

            if (result && result.error === '403') {
                verify(result.email, result.userId);
            }
        } catch (error: any) {
            toast.error(error);
        }
    }

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
                onSubmit={async (values: {
                    email: string;
                    password: string;
                }) => {
                    handleSubmit(values);
                }}
            >
                <Form className='w-full'>
                    <div className='flex flex-col w-full gap-y-3.5'>
                        <div className='flex flex-col gap-y-8'>
                            <InputComponent name='email' type='email' label='Email address' />
                            <InputComponent name="password" type='password' label='Password' />
                        </div>
                        <div className='flex flex-col items-center justify-center gap-y-2.5'>
                            <ButtonComponent
                                loading={loading}
                                disabled={loading} type="submit" className='rounded-[35px]'>Sign in</ButtonComponent>
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
