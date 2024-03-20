"use client"

import { Form, Formik } from "formik"
import ButtonComponent from "../shared/button.component"
import SecondaryInputComponent from "../shared/secondary-input.component"
import ListCommentComponent from "./listcomment.component"
import * as Yup from "yup";
import { useState } from "react";
import { ListComment, ListData } from "@/services/models/list.model"
import axiosInstance from "@/services/httpClient"
import { API_URL } from "@/services/utils"
import { toast } from "react-toastify"

type CommentsProp = {
    data: ListData
}

const ListCommentsComponent = (props: CommentsProp) => {
    const { data } = props

    const [isCommenting, setComment] = useState(false)

    function listComment(props: ListComment) {
        setComment(true)
        axiosInstance.post(`${API_URL}/comments/list`, { ...props })
            .then((res) => {
                toast(res?.data?.message)
            })
            .catch((err) => {
                toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
            }).finally(() => {
                setComment(false)
            })
    }

    return <div className="flex flex-col gap-y-6">
        <Formik initialValues={{
            comment: "",
        }}
            validationSchema={Yup.object({
                comment: Yup.string()
                    .required("Required"),
            })}
            onSubmit={(value) => {
                const params = {
                    ...value, listId: data?._id
                }
                listComment(params);
            }}>
            <Form>
                <div className="flex flex-col gap-y-4 bg-box rounded-box px-2 sm:px-8 py-5">
                    <SecondaryInputComponent placeholder="Add your comment..." name="comment" />
                    <ButtonComponent loading={isCommenting} disabled={isCommenting} type="submit" className="!w-fit place-self-end">Comment</ButtonComponent>
                </div>
            </Form>
        </Formik>


        <div className="flex flex-col gap-y-8">
            {data.comments.length === 0 ? <p className="text-sm text-mauve text-center">No comments on this list. Be the first to comment.</p> : <>
                {data.comments.map((comment) => (
                    <ListCommentComponent key={comment} />
                ))}
            </>}
        </div>
    </div>
}

export default ListCommentsComponent