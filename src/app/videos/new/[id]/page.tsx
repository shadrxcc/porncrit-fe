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
import { PerformersType, SearchVideo, TagsType, UpdateVideo } from "@/services/models/list.model";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Preloader from "@/components/shared/preloader";
import { SuggestedTags } from "@/app/lists/new/page";
import LoaderSvg from "@/components/shared/loader.svg.component";

const NewVideo = ({ params }: { params: { id: string } }) => {
    const id = params.id

    const [upload, setUploading] = useState(false)
    const [tag, setTag] = useState('');
    const [tagError, setTagError] = useState('');
    const [tags, setTags] = useState<Array<TagsType>>([]);
    const [suggestions, setSuggestions] = useState<SuggestedTags[]>([]);
    const [performer, setPerformer] = useState('');
    const [performers, setPerformers] = useState<Array<PerformersType>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0); // State to track progress;
    const [searchTag, setSearchTag] = useState(false)
    const [performerError, setPerformerError] = useState('');
    const [noTags, setNoTags] = useState("");

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

    async function fetchTags(searchTerm: string) {
        setSearchTag(true)
        try {
            const res = await axiosInstance.get(`${API_URL}/tags/get-tags/${searchTerm}`);

            const tags = res?.data?.data
            if (tags.length === 0) {
                setNoTags("Oooops! Looks like we couldn't find that tag.");
            } else {
                setNoTags("");
            }

            return tags;
        } catch (err) {
            toast.error('Error Completing request. Try again later.');
            throw err;
        } finally {
            setSearchTag(false)
        }
    }

    const fetchTagsAndSetSuggestions = async (searchTerm: string) => {
        setSearchTag(true)
        try {
            const fetchedTags = await fetchTags(searchTerm);
            if (fetchedTags.length > 0) {
                setNoTags("");
            }
            setSuggestions(fetchedTags);
        } catch {
            setSuggestions([]);
        } finally {
            setSearchTag(false)
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
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


    // handle input change
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (e.target.name === 'tags') {
            setTag(inputValue);
            setTagError('');
            setNoTags("")
            if (inputValue.length > 0) {
                fetchTagsAndSetSuggestions(inputValue);
            } else {
                setSearchTag(false)
                setSuggestions([]);
            }
        }
    };

    const handleSuggestionClick = (tag: string | undefined) => {
        if (tag) {
            setTags((prevTags) => [...prevTags, { tag }]);
            setTag('');
            setSuggestions([]);
        }
    };

    const deleteTag = (tagtoDelete: string) => {
        setTags((prevTags) => prevTags.filter((tag) => tag.tag !== tagtoDelete));
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
                    <p className="text-base">{video?.video?.title}</p>
                    <div>
                        <Image src={video?.video?.image}
                            className="w-full md:w-min rounded-[3px]" width={282} height={158} alt={video?.video?.title} priority/>
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
                            setTagError('');
                            setPerformerError('');

                            if (tags.length === 0) {
                                setTagError('Please add at least one tag.');
                                return;
                            }

                            if (performers.length === 0) {
                                setPerformerError('Please add at least one performer.');
                                return;
                            }

                            const params = {
                                ...values, videoId: video?.video?._id, model: performers.map((performer) => performer.performer),
                                tags: tags.map((tag) => tag.tag)
                            }
                            updateVideo(params)
                        }}>
                        <Form className="space-y-7">
                            <div className="flex flex-col gap-y-4">
                                <div className={`flex flex-col gap-y-3`}>
                                    <label className="text-lg font-bold text-white" htmlFor="tags">Favorite Tags</label>
                                    <div className="flex items-center relative">
                                        <input name="tags"
                                            className={`px-4 bg-white w-full text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                                            placeholder="Type and choose tags that fit the video. If not found, add your own!"
                                            onChange={inputChange}
                                            value={tag}
                                        />
                                        {searchTag ? <div className="absolute right-3 bottom-2 top-2">
                                            <LoaderSvg />
                                        </div> : null}
                                    </div>
                                </div>

                                {suggestions?.length > 0 ? <div className="bg-box mt-1 max-h-60 w-full flex flex-col gap-y-2 z-9 overflow-auto rounded-md py-2.5 shadow-lg ring-1 ring-black/5 focus:outline-none text-sm">
                                    {suggestions.map((suggestion, index) => (
                                        <div key={index} className="cursor-pointer p-2 hover:bg-body" onClick={() => handleSuggestionClick(suggestion.title)}>
                                            {suggestion?.title}
                                        </div>
                                    ))}
                                </div> : null}

                                {tag.trim() !== "" && noTags ? (
                                    <div className="bg-box mt-1 w-full flex flex-col gap-y-2 z-9 overflow-auto rounded-md p-2.5 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                        <p className="text-sm">{noTags}</p>
                                    </div>
                                ) : null}

                                {tags?.length > 0 && (

                                    <div className="flex items-center flex-wrap gap-3">
                                        {tags.map((item: TagsType) => (
                                            <SelectTagComponent key={item.tag} tag={item.tag} remove={() => deleteTag(item.tag)} />
                                        ))}
                                    </div>
                                )}

                                {tagError && <p className="text-red-500 text-sm">{tagError}</p>}

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
                                        }}
                                        value={performer}
                                    />
                                    {performerError && <p className="text-red-500 text-sm">{performerError}</p>}
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
                                <ButtonComponent type="button" onClick={() => router.push(`/videos/${video?.video?._id}`)}
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
