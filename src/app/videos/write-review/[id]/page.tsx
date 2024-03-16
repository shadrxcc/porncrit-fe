"use client"

import ButtonComponent from "@/components/shared/button.component"
import { AppDispatchType } from "@/services/config-store"
import { asyncGetLinkedVideo, selectVideo } from "@/services/video-services/async-actions"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const page = ({ params }: { params: { id: string } }) => {
    const navigate = useRouter()
    const id = params.id

    const [isLoading, setIsLoading] = useState(false);

    const dispatch: AppDispatchType = useDispatch();
    const video = useSelector(selectVideo);


    useEffect(() => {
        setIsLoading(true)
        dispatch(asyncGetLinkedVideo({ id }))
            .finally(() => {
                setIsLoading(false)
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div className="md:w-standard mx-auto flex flex-col gap-y-10">
            <div className="space-y-2.5">
                <p className="text-lg font-extrabold">Your review</p>
                <div className="bg-box rounded-box flex items-center gap-x-3 py-5 px-8">
                    <Image src={video?.image} width={88} height={50} alt="" />
                    <div>
                        <p className="text-sm font-bold">{video?.title}</p>
                        <div className="flex items-center gap-x-3">
                            <img src="/assets/images/rating.png" width={80} alt="" />
                            <p className="text-[10px]">based on 18.4k ratings</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5">
                <p className="text-lg font-extrabold">Rate</p>
                <p className="text-sm leading-5">Rate this video out of 5 stars</p>
                <img src="/assets/images/rating.png" width={100} alt="" />
            </div>

            <div className="space-y-2.5">
                <p className="text-lg font-extrabold">Review</p>
                {/* <TextArea rows={3} placeholder="Let your fellow videos fans know what you think..." /> */}
            </div>

            <div className="flex justify-end">
                <ButtonComponent onClick={() => navigate.back()}
                    variant="secondary"
                    className="!w-fit !text-white place-self-end"
                >
                    Cancel
                </ButtonComponent>
                <ButtonComponent className="!w-fit place-self-end">
                    Publish review
                </ButtonComponent>
            </div>
        </div>
    )
}

export default page
