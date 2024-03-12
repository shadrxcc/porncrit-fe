"use client"

import Link from "next/link";
import ButtonComponent from "../shared/button.component";
import List from "./general-list.component";
import { useEffect } from "react";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetUserList, selectLists } from "@/services/list-services/async-actions";

const MyLists = () => {
    const dispatch: AppDispatchType = useDispatch();
    const lists = useSelector(selectLists);

    useEffect(() => {
        dispatch(asyncGetUserList())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <>
        <div className="flex flex-col gap-y-5 items-center mt-9">
            <Link href={`/my-account/lists/new`}><ButtonComponent>Create new list</ButtonComponent></Link>
            <div className="flex flex-col w-full gap-y-9">
                {lists.map((list) => (
                    <List key={list._id} {...list} />
                ))}

            </div>
        </div>
    </>
}

export default MyLists;