"use client"

import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button.component"
import { selectAuthUser, selectIsAuthenticated } from "@/services/auth-services/selector";
import { AppDispatchType } from "@/services/config-store";
import { useEffect } from "react";
import { getUserProfile } from "@/services/auth-services/async-actions";
import LinkVideoInput from "../shared/linkvideo-input";

const HeroComponent = ({ signup }: { signup: () => void }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch: AppDispatchType = useDispatch()
    const user = useSelector(selectAuthUser);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getUserProfile());
        }
    }, [dispatch, isAuthenticated]);


    return (
        <div className="flex px-4 flex-col mt-8 gap-y-8 items-center text-center justify-center m-auto">
            <div className="flex flex-col gap-y-3 items-center">
                {isAuthenticated ? <p className="text-xl font-bold">Hello, <span className="text-pink">{user?.username}</span></p>
                    : <p className="text-xl font-bold"><span className="text-pink">Join</span> the social hub for porn fans.</p>}
                {/* <hr className="w-full border-none h-0.5 lg:w-[110%] bg-pink" /> */}
                {isAuthenticated ? <p className="text-sm">Start <span className="text-pink">following</span> critics to discover fan favourites</p>
                    : <div className="flex flex-col gap-y-3">
                        <p className="text-sm">Connect with fellow porn critics and discover the porn they love</p>
                    </div>}
            </div>
            <LinkVideoInput placeholder="Paste a video link to save, rate, review, and list"/>
            {!isAuthenticated ? <Button onClick={signup} className="rounded-[35px]">Create new account</Button> : null}
        </div>
    )
}

export default HeroComponent
