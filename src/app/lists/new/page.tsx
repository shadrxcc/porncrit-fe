"use client"

import ButtonComponent from "@/components/shared/button.component";
import CodeSvg from "@/components/shared/code.component";
import Input from "@/components/shared/secondary-input.component";
import TextArea from "@/components/shared/text-area.component";
import SelectTagComponent from "@/components/ui/select-tag.component";
import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { CreateList, SearchVideo, TagsType, VideoType } from "@/services/models/list.model";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";
import LoaderSvg from "@/components/shared/loader.svg.component";
import { useRouter } from "next/navigation";


export type SuggestedTags = {
    createdAt?: string
    title?: string
    updatedAt?: string
    __v?: string
    _id?: string
}

const NewList = () => {
    const [tag, setTag] = useState('');
    const [tagError, setTagError] = useState('');
    const [tags, setTags] = useState<Array<TagsType>>([]);
    const [suggestions, setSuggestions] = useState<SuggestedTags[]>([]);
    const [video, setVideo] = useState('');
    const [videos, setVideos] = useState<Array<VideoType>>([]);
    const [videoSuggestions, setVideoSuggestions] = useState<Array<Partial<SearchVideo>>>([]);
    const [searchTag, setSearchTag] = useState(false)
    const [searchVideo, setSearchVideo] = useState(false)
    const [noTags, setNoTags] = useState("");
    const [noVideo, setNoVideo] = useState("");
    const [isCreating, setCreating] = useState(false)

    const dragVideo = useRef<number>(0)
    const dragOver = useRef<number>(0)

    function handleSort() {
        const newVideos = [...videos]
        const temp = newVideos[dragVideo.current]
        newVideos[dragVideo.current] = newVideos[dragOver.current]
        newVideos[dragOver.current] = temp
        setVideos(newVideos)
    }

    const router = useRouter()

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


    async function fetchVideos(searchTerm: string) {
        setSearchVideo(true)
        try {
            const res = await axiosInstance.get(`${API_URL}/videos/get-videos/${searchTerm}`);
            const videos = res?.data?.data
            if (videos.length === 0) {
                setNoVideo("Oooops! Looks like we couldn't find that video.");
            }

            return videos;
        } catch (err) {
            toast.error('Error fetching videos. Try again later.');
            throw err;
        } finally {
            setSearchVideo(false)
        }
    }


    const fetchVideosAndSetSuggestions = async (searchTerm: string) => {
        setSearchVideo(true)
        try {
            const fetchedVideos = await fetchVideos(searchTerm);
            if (fetchedVideos.length > 0) {
                setNoVideo("");
            }
            setVideoSuggestions(fetchedVideos);
        } catch {
            setVideoSuggestions([]);
        } finally {
            setSearchVideo(false)
        }
    };


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

    const handleVideoSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (e.target.name === 'videos') {
            setVideo(inputValue);
            setNoVideo("")
            if (inputValue.length > 0) {
                fetchVideosAndSetSuggestions(inputValue);
            } else {
                setSearchVideo(false)
                setVideoSuggestions([]);
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

    const handleVideoSuggestionClick = (video: Partial<SearchVideo>) => {
        if (video.title && video.image && video._id) {
            const newVideo = {
                title: video.title,
                image: video.image,
                id: video._id
            };

            setVideos((prevVideos) => [...prevVideos, newVideo]);
            setVideo('');
            setVideoSuggestions([]);
        }
    };

    const deleteVideo = (videoId: string) => {
        setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
    };

    const deleteTag = (tagtoDelete: string) => {
        setTags((prevTags) => prevTags.filter((tag) => tag.tag !== tagtoDelete));
    };

    function createList(props: CreateList) {
        setCreating(true)
        axiosInstance.post(`${API_URL}/list/create`, { ...props })
            .then((res) => {
                toast(res?.data?.message)
                const listId = res?.data?.data?._id
                router.push(`/lists/${listId}`)
            })
            .catch((err) => {
                toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
            }).finally(() => {
                setCreating(false)
            })
    }

    return (
        <div className="flex md:w-standard mx-auto gap-y-8 flex-col">
            <h1 className="text-xl font-extrabold">Create new list</h1>
            <Formik initialValues={{
                title: "",
                description: "",
            }}
                validationSchema={Yup.object({
                })}
                onSubmit={(values) => {
                    const params = {
                        ...values, tags: tags.map((tag) => tag.tag), videos: videos.map((video) => video.id)
                    };
                    createList(params);
                }}>
                <Form>
                    <div className="space-y-7">
                        <div className="flex flex-col gap-y-7 mt-4">
                            <Input name="title"
                                placeholder="Enter a title for your list..."
                                label="List title"
                            />
                            <TextArea
                                name="description"
                                rows={4}
                                placeholder="Let your fellow videos fans know a bit about your list.."
                                label="List description" />
                            <div className="flex flex-col gap-y-4">
                                <div className={`flex flex-col gap-y-3`}>
                                    <label className="text-lg font-bold text-white" htmlFor="tags">Tags</label>
                                    <div className="flex items-center relative">
                                        <input name="tags"
                                            className={`px-4 bg-white w-full text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                                            placeholder="Start typing and pick up to 5 tags that describe your list..."
                                            onChange={inputChange}
                                            // onKeyDown={(e) => {
                                            //     deleteInputCharacter(e);
                                            // }}
                                            value={tag}
                                        />

                                        {searchTag ? <div className="absolute right-3 bottom-2 top-2">
                                            <LoaderSvg />
                                        </div> : null}
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

                                    {tagError && <p className="text-red-500 text-sm">{tagError}</p>}
                                </div>


                                {tags?.length > 0 && (
                                    <div className="flex items-center flex-wrap gap-3">
                                        {tags.map((item: TagsType) => (
                                            <SelectTagComponent key={item.tag} tag={item.tag} remove={() => deleteTag(item.tag)} />
                                        ))}
                                    </div>
                                )}

                            </div>

                            <div className="flex flex-col gap-y-4">
                                <div className={`flex flex-col gap-y-3`}>
                                    <label className="text-lg font-bold text-white" htmlFor="tags">Add videos</label>
                                    <div className="flex items-center relative">
                                        <input name="videos"
                                            placeholder="Start typing and pick the videos you’d like to add..."
                                            className={`px-4 bg-white w-full text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}

                                            onChange={handleVideoSearchChange}
                                            // onKeyDown={(e) => {
                                            //     deleteInputCharacter(e);
                                            // }}
                                            value={video}
                                        />

                                        {searchVideo ? <div className="absolute right-3 bottom-2 top-2">
                                            <LoaderSvg />
                                        </div> : null}

                                    </div>

                                    {videoSuggestions?.length > 0 ?
                                        <div className="bg-box mt-1 max-h-60 w-full flex flex-col gap-y-2 z-9 overflow-auto rounded-md p-2.5 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm suggestion-scroll">
                                            {videoSuggestions.map((suggestion) => (
                                                <div key={suggestion._id} className="cursor-pointer flex items-center gap-2 p-2 hover:bg-body" onClick={() => handleVideoSuggestionClick(suggestion)}>
                                                    <Image src={suggestion?.image || ""} width={100} height={100} alt={suggestion?.title || "loading"} className="rounded-[3px]" />
                                                    <p className="text-sm text-mauve">{suggestion.title}</p>
                                                </div>
                                            ))}
                                        </div> : null
                                    }

                                    {video.trim() !== "" && noVideo ? (
                                        <div className="bg-box mt-1 w-full flex flex-col gap-y-2 z-9 overflow-auto rounded-md p-2.5 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                            <p className="text-sm">{noVideo}</p>
                                        </div>
                                    ) : null}

                                    {tagError && <p className="text-red-500 text-sm">{tagError}</p>}
                                </div>

                                {videos?.length > 0 && (

                                    <div className="space-y-3">
                                        <p className="text-sm font-medium">Videos</p>
                                        <div className="flex flex-col gap-y-3">
                                            {videos.map((video, index) => (
                                                <div onDragStart={() => dragVideo.current = index}
                                                    onDragEnter={() => dragOver.current = index}
                                                    onDragEnd={handleSort}
                                                    onDragOver={(e) => e.preventDefault()} key={video?.id} className="flex flex-col py-3 gap-y-5 rounded-box bg-box px-[18px]">
                                                    <div className="flex items-center gap-x-3">
                                                        <Image
                                                            src={video?.image}
                                                            width={88}
                                                            height={50}
                                                            alt="threesome"
                                                            className="rounded-[3px]"
                                                        />
                                                        <p className="text-sm">{video?.title}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <ButtonComponent type="button" onClick={() => deleteVideo(video.id)} className="xs:w-full !w-fit" variant="outline-pink">
                                                            Delete</ButtonComponent>
                                                        <ButtonComponent draggable

                                                            type="button" variant="secondary" className="!w-fit !p-0">
                                                            <CodeSvg />
                                                        </ButtonComponent>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                            <ButtonComponent type="submit" className="!w-fit place-self-end" loading={isCreating} disabled={isCreating}>
                                Save list
                            </ButtonComponent>
                        </div>
                    </div>
                </Form>
            </Formik>


        </div>
    );
};

export default NewList;
