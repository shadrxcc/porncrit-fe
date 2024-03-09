"use client"

import SelectTagComponent from "@/components/ui/select-tag.component"
import { Form, Formik } from "formik"
import * as Yup from "yup";
import Image from "next/image"
import SecondaryInputComponent from "@/components/shared/secondary-input.component";
import SelectPerformer from "@/components/ui/select-performer.component";
import ButtonComponent from "@/components/shared/button.component";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetLinkedVideo, selectVideo } from "@/services/video-services/async-actions";
import { useEffect } from "react";

const NewVideo = ({ params }: { params: { id: string } }) => {
    const id = params.id

    const dispatch: AppDispatchType = useDispatch();
    const video = useSelector(selectVideo);

    useEffect(() => {
        dispatch(asyncGetLinkedVideo({ id }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    return (
        <div className="md:w-standard space-y-7 mx-auto">
            <div className="space-y-7">
                <div className="space-y-2.5">
                    <p className="text-lg font-extrabold">We found it</p>
                    <p className="text-sm text-mauve">You’re a porn pioneer! The first fan to save this video. Way to go!</p>
                </div>

                <div className="space-y-2.5">
                    <p className="text-base">{video?.title}</p>
                    <div>
                        <Image src={video?.image}
                            className="w-full md:w-min" width={282} height={158} alt={video?.title} />
                    </div>
                </div>

                <div className="space-y-2.5">
                    <p className="text-lg font-extrabold">Help fans discover</p>
                    <p className="text-sm text-mauve">Add tags and stars, then the video will be ready for you to review, rate, and list</p>
                </div>


                <div className="space-y-2.5">
                    <Formik initialValues={{}}
                        validationSchema={Yup.object({})}
                        onSubmit={() => { }}>
                        <Form className="space-y-7">
                            <div className="flex flex-col gap-y-4">
                                <SecondaryInputComponent name="tags"
                                    placeholder="Start typing and pick your 3 favourite tags"
                                    label="Tags"
                                />
                                <SelectTagComponent />
                            </div>

                            <div className="flex flex-col gap-y-4">
                                <SecondaryInputComponent name="performers"
                                    placeholder="Start typing and pick your 3 favourite performers"
                                    label="Favorite Performers"
                                />
                                <SelectPerformer />
                            </div>
                            <div className="flex justify-end">
                                <ButtonComponent
                                    variant="secondary"
                                    className="!w-fit !text-white place-self-end"
                                >
                                    Cancel
                                </ButtonComponent>
                                <ButtonComponent className="!w-fit place-self-end">
                                    Publish
                                </ButtonComponent>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default NewVideo
