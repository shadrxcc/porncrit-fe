"use client"

import InputComponent from "@/components/shared/input.component"
import SelectTagComponent from "@/components/ui/select-tag.component"
import { Form, Formik } from "formik"
import * as Yup from "yup";
import Image from "next/image"
import SecondaryInputComponent from "@/components/shared/secondary-input.component";
import SelectPerformer from "@/components/ui/select-performer.component";
import ButtonComponent from "@/components/shared/button.component";

const page = () => {
    return (
        <div className="md:w-standard space-y-7 mx-auto">
            <div className="space-y-7">
                <div className="space-y-2.5">
                    <p className="text-lg font-extrabold">We found it</p>
                    <p className="text-sm text-mauve">You’re a porn pioneer! The first fan to save this video. Way to go!</p>
                </div>

                <div className="space-y-2.5">
                    <p className="text-base">Title of video goes here double lined if need down below </p>
                    <div>
                        <Image src={`/assets/images/4some.png`}
                        className="w-full md:w-min" width={282} height={158} alt="4some" />
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

            <div className="space-y-6">
                <div className="space-y-2.5">
                    <p className="text-lg font-extrabold">We found it</p>
                    <p className="text-sm text-mauve">Great taste! This video has been saved by a fan. Visit video’s page to review, rate or list.</p>
                </div>

                <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2.5">
                        <Image src={`/assets/images/4some.png`} width={282} className="w-full md:w-min" height={158} alt="4some" />
                        <div className="flex flex-col gap-y-6">
                            <p className="text-sm font-medium">Title of video goes here double lined if need down below </p>
                            <div className="flex gap-x-3 items-center">
                                <img width={150} src="/assets/images/rating.png" alt="" />
                                <p className="text-[10px] font-medium">based on 18.4k ratings</p>
                            </div>
                            <ButtonComponent variant="outline-pink">Go to video page</ButtonComponent>
                        </div>
                        
                    </div>
                </div>
            </div>




        </div>
    )
}

export default page
