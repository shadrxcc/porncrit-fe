"use client"

import SelectTagComponent from "@/components/ui/select-tag.component"
import { Form, Formik } from "formik"
import * as Yup from "yup";
import Image from "next/image"
import SelectPerformer from "@/components/ui/select-performer.component";
import ButtonComponent from "@/components/shared/button.component";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetLinkedVideo, selectVideo } from "@/services/video-services/async-actions";
import { useEffect, useState } from "react";
import { PerformersType, TagsType, UpdateVideo } from "@/services/models/list.model";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import LoaderComponent from "@/components/shared/loader.component";
import Preloader from "@/components/shared/preloader";

const NewVideo = ({ params }: { params: { id: string } }) => {
    const id = params.id
    const [tag, setTag] = useState('');
    const [upload, setUploading] = useState(false)
    const [tags, setTags] = useState<Array<TagsType>>([]);
    const [performer, setPerformer] = useState('');
    const [performers, setPerformers] = useState<Array<PerformersType>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0); // State to track progress
    const dispatch: AppDispatchType = useDispatch();
    const video = useSelector(selectVideo);

    const router = useRouter()

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

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (tag) {
                const trimmedValue = tag.trim();
                if (trimmedValue !== '' && !tags.some((tags) => tags.tag === trimmedValue)) {
                    setTags((prevValues) => [
                        ...prevValues,
                        { tag: String(trimmedValue) },
                    ]);
                    setTag('');
                }
            }

            if (performer) {
                const trimmedValue = performer.trim();
                if (trimmedValue !== '' && !performers.some((p) => p.performer === trimmedValue)) {
                    setPerformers((prevPerformers) => [
                        ...prevPerformers,
                        { performer: String(trimmedValue) },
                    ]);
                    setPerformer('');
                }
            }
        }
    };

    const deleteInputCharacter = (e: { key: string }) => {
        if (e.key === 'Backspace') {
            if (tag) {
                setTag(tag.slice(0, -1));
            } else if (performer) {
                setPerformer(performer.slice(0, -1));
            }
        }
    };

    // handle input change
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (e.target.name === 'tags') {
            setTag(inputValue);
        } else if (e.target.name === 'performers') {
            setPerformer(inputValue);
        }
    };

    function updateVideo(props: UpdateVideo) {
        setUploading(true)
        axiosInstance.patch(`${API_URL}/videos/update-details`, { ...props })
            .then((res) => {
                toast(res?.data?.message)
                router.push(`/videos/${id}`)
                setTags([])
                setPerformers([])
                setUploading(false);
            })
            .catch((err) => {
                toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
                setUploading(false);
            })
    }

    return (
        <div className="md:w-standard space-y-7 mx-auto">
            {isLoading && <Preloader progress={progress} />}
            {!isLoading && <div className="space-y-7">
                <div className="space-y-2.5">
                    <p className="text-lg font-extrabold">We found it</p>
                    <p className="text-sm text-mauve">You’re a porn pioneer! The first fan to save this video. Way to go!</p>
                </div>

                <div className="space-y-2.5">
                    <p className="text-base">{video?.title}</p>
                    <div>
                        <Image src={video?.image}
                            className="w-full md:w-min rounded-[3px]" width={282} height={158} alt={video?.title} />
                    </div>
                </div>

                <div className="space-y-2.5">
                    <p className="text-lg font-extrabold">Help fans discover</p>
                    <p className="text-sm text-mauve">Add tags and stars, then the video will be ready for you to review, rate, and list</p>
                </div>


                <div className="space-y-2.5">
                    <Formik initialValues={{}}
                        validationSchema={Yup.object({})}
                        onSubmit={(values) => {
                            const params = {
                                ...values, videoId: video?._id, model: performers.map((performer) => performer.performer),
                                tags: tags.map((tag) => tag.tag)
                            }
                            updateVideo(params)
                        }}>
                        <Form className="space-y-7">
                            <div className="flex flex-col gap-y-4">
                                <div className={`flex flex-col gap-y-3`}>
                                    <label className="text-lg font-bold text-white" htmlFor="tags">Favorite Tags</label>
                                    <input name="tags"
                                        className={`px-4 bg-white text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                                        placeholder="Type and choose tags that fit the video. If not found, add your own!"
                                        onChange={inputChange}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            handleKeyPress(e);
                                            deleteInputCharacter(e);
                                        }}
                                        value={tag}
                                    />
                                </div>

                                {tags?.length > 0 && (

                                    <div className="flex items-center flex-wrap gap-3">
                                        {tags.map((item: TagsType) => (
                                            <SelectTagComponent key={item.tag} tag={item.tag} />
                                        ))}
                                    </div>
                                )}

                            </div>
                            <div className="flex flex-col gap-y-4">
                                <div className={`flex flex-col gap-y-3`}>
                                    <label className="text-lg font-bold text-white" htmlFor="performers">Favorite Performers</label>
                                    <input name="performers"
                                        className={`px-4 bg-white text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                                        placeholder="Type and pick the performers who feature in this video."
                                        onChange={inputChange}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                            handleKeyPress(e);
                                            deleteInputCharacter(e);
                                        }}
                                        value={performer}
                                    />
                                </div>
                                {performers?.length > 0 && (

                                    <div className="flex items-center flex-wrap gap-3">
                                        {performers.map((item: PerformersType) => (
                                            <SelectPerformer key={item.performer} performer={item.performer} />
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end">
                                <ButtonComponent type="button" onClick={() => router.back()}
                                    variant="secondary"
                                    className="!w-fit !text-white place-self-end"
                                >
                                    Cancel
                                </ButtonComponent>
                                <ButtonComponent type="submit" loading={upload} disabled={upload} className="!w-fit place-self-end">
                                    Publish
                                </ButtonComponent>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>}
        </div>
    )
}

export default NewVideo
