"use client"

import ButtonComponent from "@/components/shared/button.component"
import { AppDispatchType } from "@/services/config-store"
import { asyncGetLinkedVideo, selectVideo } from "@/services/video-services/async-actions"
import { Form, Formik } from "formik"
import * as Yup from "yup";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TextArea from "@/components/shared/text-area.component"
import Rating from 'react-animated-rating';
import { ReviewVideo } from "@/services/models/list.model"
import axiosInstance from "@/services/httpClient"
import { API_URL } from "@/services/utils"
import { toast } from "react-toastify"
import LoaderComponent from "@/components/shared/loader.component"

const page = ({ params }: { params: { id: string } }) => {
    const navigate = useRouter()
    const id = params.id

    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(0) // initial rating value
    const [isReviewing, setReviewing] = useState(false)
    const dispatch: AppDispatchType = useDispatch();
    const video = useSelector(selectVideo);

    const handleRatingChange = (value: number) => {
        setRating(value)
        // console.log(rating);
    };

    useEffect(() => {
        setIsLoading(true)
        dispatch(asyncGetLinkedVideo({ id }))
            .finally(() => {
                setIsLoading(false)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    function reviewVideo(props: ReviewVideo) {
        setReviewing(true)
        axiosInstance.post(`${API_URL}/reviews/create`, { ...props })
            .then((res) => {
                toast(res?.data?.message)
                navigate.back()
            })
            .catch((err) => {
                toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
            })
    }

    return (
        <div className="md:w-standard mx-auto flex flex-col gap-y-10">
            {isLoading && <LoaderComponent />}
            {!isLoading ? <>
                <div className="space-y-2.5">
                    <p className="text-lg font-extrabold">Your review</p>
                    <div className="bg-box rounded-box flex items-center gap-x-3 py-5 px-8">
                        <Image src={video?.video?.image} width={88} height={50} alt="" />
                        <div>
                            <p className="text-sm font-bold">{video?.video?.title}</p>
                            <div className="flex items-center gap-x-3">
                                <Rating wrapperClassName="icon-red" filled={video?.video?.rating} icon={<svg width="16" height="16" viewBox="0 0 35 35" strokeWidth="2px" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5185 30.8628C9.7619 31.3192 8.82853 30.642 9.02765 29.7811L10.7292 22.4251C10.8127 22.0642 10.6899 21.6868 10.41 21.4442L4.70197 16.4954C4.03444 15.9167 4.39039 14.82 5.27055 14.7436L12.8169 14.0886C13.186 14.0565 13.5072 13.8229 13.6515 13.4816L16.5792 6.55441C16.9234 5.74015 18.0773 5.74015 18.4214 6.55441L21.3492 13.4816C21.4934 13.8229 21.8146 14.0565 22.1838 14.0886L29.7301 14.7436C30.6103 14.82 30.9662 15.9167 30.2987 16.4954L24.5906 21.4442C24.3108 21.6868 24.1879 22.0642 24.2714 22.4251L25.973 29.7811C26.1721 30.642 25.2387 31.3192 24.4822 30.8628L18.0169 26.9626C17.6992 26.771 17.3015 26.771 16.9838 26.9626L10.5185 30.8628Z" />
                                </svg>
                                } />
                                <p className="text-[10px]">based on 18.4k ratings</p>
                            </div>
                        </div>
                    </div>
                </div>

                <Formik initialValues={{
                    note: ""
                }}
                    validationSchema={Yup.object({
                        note: Yup.string()
                            .required("Required"),
                    })}
                    onSubmit={(values) => {
                        const params = {
                            ...values,
                            videoId: id,
                            rating
                        }
                        reviewVideo(params);

                    }}>
                    <Form className="space-y-7">
                        <div className="space-y-2.5">
                            <p className="text-lg font-extrabold">Rate</p>
                            <p className="text-sm leading-5">Rate this video out of 5 stars</p>
                            <Rating wrapperClassName="icon-red" onChange={handleRatingChange} icon={<svg width="20" height="20" viewBox="0 0 35 35" strokeWidth="2px" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5185 30.8628C9.7619 31.3192 8.82853 30.642 9.02765 29.7811L10.7292 22.4251C10.8127 22.0642 10.6899 21.6868 10.41 21.4442L4.70197 16.4954C4.03444 15.9167 4.39039 14.82 5.27055 14.7436L12.8169 14.0886C13.186 14.0565 13.5072 13.8229 13.6515 13.4816L16.5792 6.55441C16.9234 5.74015 18.0773 5.74015 18.4214 6.55441L21.3492 13.4816C21.4934 13.8229 21.8146 14.0565 22.1838 14.0886L29.7301 14.7436C30.6103 14.82 30.9662 15.9167 30.2987 16.4954L24.5906 21.4442C24.3108 21.6868 24.1879 22.0642 24.2714 22.4251L25.973 29.7811C26.1721 30.642 25.2387 31.3192 24.4822 30.8628L18.0169 26.9626C17.6992 26.771 17.3015 26.771 16.9838 26.9626L10.5185 30.8628Z" />
                            </svg>
                            } />

                        </div>

                        <div className="space-y-2.5">
                            <p className="text-lg font-extrabold">Review</p>
                            <TextArea name="note" rows={3} placeholder="Let your fellow videos fans know what you think..." />
                        </div>

                        <div className="flex justify-end">
                            <ButtonComponent type="button" onClick={() => navigate.back()}
                                variant="secondary"
                                className="!w-fit !text-white place-self-end"
                            >
                                Cancel
                            </ButtonComponent>
                            <ButtonComponent loading={isReviewing} disabled={isReviewing} type="submit" className="!w-fit place-self-end">
                                Publish review
                            </ButtonComponent>
                        </div>
                    </Form>
                </Formik>
            </> : null}
        </div>
    )
}

export default page
