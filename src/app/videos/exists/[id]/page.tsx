"use client";

import ButtonComponent from "@/components/shared/button.component"
import Preloader from "@/components/shared/preloader";
import { AppDispatchType } from "@/services/config-store";
import { asyncGetLinkedVideo, selectVideo } from "@/services/video-services/async-actions";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AlreadyExists = ({ params }: { params: { id: string } }) => {
    const id = params.id
    const dispatch: AppDispatchType = useDispatch();
    const video = useSelector(selectVideo);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        const startTime = Date.now(); // Record the start time of the request
        dispatch(asyncGetLinkedVideo({ id }))
            .finally(() => {
                setIsLoading(false);
            });
        // Simulate request progress
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const progress = Math.min(elapsedTime / 1000, 1); // Calculate progress as a fraction of the elapsed time
            setProgress(progress); // Update progress state
            if (progress >= 1) {
                clearInterval(interval); // Clear interval when progress reaches 100%
            }
        }, 100); // Update progress every 100ms
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);


    return (
        <div>
            <div className="md:w-standard space-y-6 mx-auto">
                {isLoading && <Preloader progress={progress} />}
                {!isLoading && <>
                    <div className="space-y-2.5">
                        <p className="text-lg font-extrabold">We found it</p>
                        <p className="text-sm text-mauve">Great taste! This video has been saved by a fan. Visit video’s page to review, rate or list.</p>
                    </div>

                    <div>
                        <div className="flex flex-col md:flex-row md:items-center gap-2.5">
                            <Image src={video?.video?.image} width={282} className="w-full md:w-min rounded-[3px]" height={158} alt="4some" />
                            <div className="flex flex-col gap-y-6">
                                <p className="text-sm font-medium">{video?.video?.title} </p>
                                <div className="flex gap-x-3 items-center">
                                    <img width={150} src="/assets/images/rating.png" alt="" />
                                    <p className="text-[10px] font-medium">based on 18.4k ratings</p>
                                </div>
                                <ButtonComponent onClick={() => router.push(`/videos/${video?.video._id}`)} variant="outline-pink">Go to video page</ButtonComponent>
                            </div>

                        </div>
                    </div>
                </>
                }
            </div>
        </div>
    )
}

export default AlreadyExists;
