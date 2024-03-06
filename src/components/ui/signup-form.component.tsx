"use client"

import React, { useState } from 'react'

import InputComponent from '../shared/input.component'
import ButtonComponent from '../shared/button.component'
import { Form, Formik, FormikState } from "formik";
import * as Yup from "yup";
import CheckBox from '../shared/checkbox.component';
import { RegisterUser } from '@/services/models/user.model';
import axios from 'axios';
import { API_URL } from '@/services/utils';
import { toast } from 'react-toastify';

type SignUpProps = {
  login: () => void;
  verify: (enteredMail: string, userId: string) => void;
}



const SignupComponent = (props: SignUpProps) => {
  const { login, verify } = props
  const [isLoading, setLoading] = useState(false)

  const handleRegister = (props: RegisterUser, resetForm: { (nextState?: Partial<FormikState<{ username: string; email: string; password: string; acceptedTerms: boolean; }>> | undefined): void; (): void; }) => {
    setLoading(true)
    axios.post(`${API_URL}/auth/register`, { ...props })
      .then((res) => {
        resetForm();
        const userId = res?.data?.data._id
        const email = props.email
        toast(res?.data?.message)
        setLoading(false);
        verify(email, userId);
      })
      .catch((err) => {
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
        setLoading(false);
      });
  }

  return (

    <div className='flex flex-col items-center gap-y-4'>
      <div className='flex flex-col items-center gap-y-2'><p className='text-center text-brown font-bold text-xl'>Join PornCrit</p>
        <p className='text-mauve text-sm'>To rate & review. Discuss & discover. Like, list & log the videos you love. And connect with fans!</p></div>

      <Formik
        initialValues={{
          email: "",
          password: "",
          username: "",
          acceptedTerms: false,
        }}
        validationSchema={Yup.object({
          password: Yup.string()
            .required("Required")
            .min(6, "Password must be 6 characters and above buddy"),
          username: Yup.string()
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Email Required")
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              "Invalid email address pattern"
            ),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf(
              [true],
              "You must accept the terms and conditions."
            ),
        })}
        onSubmit={(value, { resetForm }) => {
          handleRegister({ ...value }, resetForm)
        }}
      >
        <Form className='flex w-full flex-col gap-y-3.5'>
          <div className='flex flex-col gap-y-6'>
            <InputComponent type="email" name="email" label='Email address' />
            <InputComponent type="text" name="username" label='Username' />
            <InputComponent type="password" name="password" label='Password' />
            <CheckBox name="acceptedTerms">
              <p className='text-brown text-sm'>I’m 18 or older and accept PornCrit’s <span className='text-pink underline'>Terms and Conditions</span> and <span className='text-pink underline'>Privacy Policy</span>.</p>
            </CheckBox>



          </div>
          <div className='flex flex-col items-center justify-center gap-y-2.5'>
            <ButtonComponent loading={isLoading} disabled={isLoading} type="submit" className='rounded-[35px]'>Sign up</ButtonComponent>
            <span className='flex gap-x-1 items-center'>
              <p className='text-mauve text-sm'>Already have an account? </p><ButtonComponent type='button' onClick={login} className='!bg-transparent !text-pink !p-0'>Sign in</ButtonComponent>
            </span>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default SignupComponent