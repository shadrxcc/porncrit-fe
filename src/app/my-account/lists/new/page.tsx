"use client"

import ButtonComponent from "@/components/shared/button.component";
import CodeSvg from "@/components/shared/code.component";
import Input from "@/components/shared/secondary-input.component";
import TextArea from "@/components/shared/text-area.component";
import SelectTagComponent from "@/components/ui/select-tag.component";
import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { TagsType } from "@/services/models/list.model";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";


type SuggestedTags = {
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
        }
    };

    const deleteInputCharacter = (e: { key: string }) => {
        if (e.key === 'Backspace') {
            if (tag) {
                setTag(tag.slice(0, -1));
            }
        }
    };

    async function fetchTags(searchTerm: string) {
        try {
            const res = await axiosInstance.get(`${API_URL}/tags/get-tags/${searchTerm}`);

            const tags = res?.data.data
            return tags;
        } catch (err) {
            toast.error('Error Completing request. Try again later.');
            throw err;
        }
    }


    const fetchTagsAndSetSuggestions = async (searchTerm: string) => {
        try {
            const fetchedTags = await fetchTags(searchTerm);
            console.log(fetchedTags);

            setSuggestions(fetchedTags);
        } catch (error) {
            console.error('Error fetching tags:', error);
            setSuggestions([]);
        }
    };

    console.log(suggestions);
    console.log(tags);



    // handle input change
    const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (e.target.name === 'tags') {
            setTag(inputValue);
            setTagError('');
            if (inputValue.length > 2) { // Adjust this condition as needed
                fetchTagsAndSetSuggestions(inputValue);
            } else {
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

    return (
        <div className="flex md:w-standard mx-auto gap-y-8 flex-col">
            <h1 className="text-xl font-extrabold">Create new list</h1>
            <Formik initialValues={{
                // title: "",
                // description: "",
            }}
                validationSchema={Yup.object({
                })}
                onSubmit={(values) => {
                    console.log(values);
                }}>
                <Form>
                    <div className="space-y-7">
                        <div className="flex flex-col gap-y-7 mt-4">
                            <Input name="title"
                                placeholder="Enter a title for your list..."
                                label="List title"
                            />
                            <TextArea
                                rows={4}
                                placeholder="Let your fellow videos fans know a bit about your list.."
                                label="List description" />
                            <div className="flex flex-col gap-y-4">
                                <div className={`flex flex-col gap-y-3`}>
                                    <label className="text-lg font-bold text-white" htmlFor="tags">Favorite Tags</label>
                                    <input name="tags"
                                        className={`px-4 bg-white text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                                        placeholder="Type and choose tags that fit the video. If not found, add your own!"
                                        onChange={inputChange}
                                        onKeyDown={(e) => {
                                            handleKeyPress(e);
                                            deleteInputCharacter(e);
                                        }}
                                        value={tag}
                                    />

                                    {suggestions.map((suggestion, index) => (
                                        <div key={index} className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleSuggestionClick(suggestion.title)}>
                                            {suggestion?.title}
                                        </div>
                                    ))}
                                    {tagError && <p className="text-red-500 text-sm">{tagError}</p>}
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
                                <Input name="videos"
                                    placeholder="Start typing and pick the videos you’d like to add..."
                                    label="Add videos"
                                />
                                <ButtonComponent className="!w-fit place-self-end">
                                    Add videos
                                </ButtonComponent>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm font-medium">Videos</p>
                                <div className="flex flex-col gap-y-3">
                                    {[1, 2, 3].map((e) => (
                                        <div key={e} className="flex flex-col py-3 gap-y-5 rounded-box bg-box px-[18px]">
                                            <div className="flex items-center gap-x-3">
                                                <Image
                                                    src={`/assets/images/3some.png`}
                                                    width={88}
                                                    height={50}
                                                    alt="threesome"
                                                />
                                                <p>Threesome</p>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <ButtonComponent className="xs:w-full !w-fit" variant="outline-pink">
                                                    Delete</ButtonComponent>
                                                <ButtonComponent variant="secondary" className="!w-fit !p-0">
                                                    <CodeSvg />
                                                </ButtonComponent>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <ButtonComponent className="!w-fit place-self-end">
                            Save list
                        </ButtonComponent>
                    </div>
                </Form>
            </Formik>


        </div>
    );
};

export default NewList;
