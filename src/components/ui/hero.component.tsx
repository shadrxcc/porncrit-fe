"use client"

import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser, selectIsAuthenticated } from "@/services/auth-services/selector";
import { AppDispatchType } from "@/services/config-store";
import { useEffect } from "react";
import { getUserProfile } from "@/services/auth-services/async-actions";
import LinkVideoInput from "../shared/linkvideo-input";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";
import { LinkVideo } from "@/services/models/list.model";
import { useRouter } from "next/navigation";

const HeroComponent = ({ signin }: { signin: () => void }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch: AppDispatchType = useDispatch()
    const user = useSelector(selectAuthUser);

    const router = useRouter()

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserProfile());
        }
    }, [dispatch, isAuthenticated]);

    function listUrl(url: LinkVideo) {
        if (!isAuthenticated) {
            signin()
        } else {
            axiosInstance.post(`${API_URL}/videos/link-video`, url)
                .then((res) => {
                    toast.success(res?.data?.message)
                    const videoId = res?.data?.data.id
                    const encodedId = encodeURIComponent(videoId)
                    
                    router.push(`/videos/new/${encodedId}`)
                })
                .catch((err) => {
                    toast.error(err?.response?.data?.message || 'Error Completing request. Try again later.')

                })

        }
    }


    return (
        <div className="flex px-4 flex-col mt-8 gap-y-8 items-center text-center justify-center m-auto">
            <div className="flex flex-col gap-y-3 items-center">
                {isAuthenticated ? <p className="text-xl font-bold">Hello, <span className="text-pink">{user?.username}</span></p>
                    : <p className="text-xl font-bold"><span className="text-pink">Join</span> the social hub for porn fans.</p>}
                {isAuthenticated ? <p className="text-sm">Start <span className="text-pink">following</span> critics to discover fan favourites</p>
                    : <div className="flex flex-col gap-y-3">
                        <p className="text-sm">Connect with fellow porn critics and discover the porn they love</p>
                    </div>}
            </div>
            <Formik
                initialValues={{
                    url: "",
                }}
                validationSchema={Yup.object({
                    url: Yup
                        .string()
                        .url('Please enter a valid URL')
                        .required('URL is required'),
                })}
                onSubmit={(value) => {
                    listUrl(value);
                }}
            >
                <Form className="w-full">
                    <LinkVideoInput name="url" placeholder="Paste a video link to save, rate, review, and list" />
                </Form>
            </Formik>
        </div>
    )
}

export default HeroComponent
