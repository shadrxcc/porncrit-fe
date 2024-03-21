"use client"

import Link from "next/link";
import ButtonComponent from "../shared/button.component";
import List from "./general-list.component";
import { useEffect, useState } from "react";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetUserList, selectLists } from "@/services/list-services/async-actions";
import CircleBop from "../shared/circlebop.component";
import { ListData } from "@/services/models/list.model";

type listDataProp = {
    data: ListData[] 
}

const MyLists = (props: listDataProp) => {
    const { data } = props;


    return <>
        <div className="flex flex-col gap-y-5 items-center mt-9">
            <Link href={`/lists/new`}><ButtonComponent>Create new list</ButtonComponent></Link>
            <div className="flex flex-col w-full gap-y-9">
                {data?.length === 0 ? <p className="text-sm text-mauve text-center">You don't have any lists yet. Create a new list.</p> : <>
                    {data?.map((list) => (
                        <List url={`/my-account/lists/${list._id}`} key={list._id} {...list} />
                    ))}
                </>}
            </div>
        </div>
    </>
}

export default MyLists;