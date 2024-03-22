"use client";

import ButtonComponent from "@/components/shared/button.component"
import Preloader from "@/components/shared/preloader";
import { AppDispatchType } from "@/services/config-store";
import { asyncGetLinkedVideo, selectVideo } from "@/services/video-services/async-actions";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Rating from "react-animated-rating";
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
                                <Rating filled={video?.video?.rating} wrapperClassName="icon-red" icon={<svg width="20" height="20" viewBox="0 0 35 35" strokeWidth="2px" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5185 30.8628C9.7619 31.3192 8.82853 30.642 9.02765 29.7811L10.7292 22.4251C10.8127 22.0642 10.6899 21.6868 10.41 21.4442L4.70197 16.4954C4.03444 15.9167 4.39039 14.82 5.27055 14.7436L12.8169 14.0886C13.186 14.0565 13.5072 13.8229 13.6515 13.4816L16.5792 6.55441C16.9234 5.74015 18.0773 5.74015 18.4214 6.55441L21.3492 13.4816C21.4934 13.8229 21.8146 14.0565 22.1838 14.0886L29.7301 14.7436C30.6103 14.82 30.9662 15.9167 30.2987 16.4954L24.5906 21.4442C24.3108 21.6868 24.1879 22.0642 24.2714 22.4251L25.973 29.7811C26.1721 30.642 25.2387 31.3192 24.4822 30.8628L18.0169 26.9626C17.6992 26.771 17.3015 26.771 16.9838 26.9626L10.5185 30.8628Z" />
                            </svg>
                            } />
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
