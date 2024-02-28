"use client"

import { useDispatch, useSelector } from "react-redux";
import Button from "../shared/button.component"
import { selectAuthUser, selectIsAuthenticated } from "@/services/auth-services/selector";
import { AppDispatchType } from "@/services/config-store";
import { useEffect } from "react";
import { getUserProfile } from "@/services/auth-services/async-actions";

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
        <div className="flex px-4 flex-col mt-8 gap-y-8 items-center text-center justify-center w-fit m-auto">
            <div className="flex flex-col gap-y-[25px] items-center">
                {isAuthenticated ? <p className="text-xl font-bold">Hello, <span className="text-pink">{user?.username}</span></p>
                    : <p className="text-xl font-bold">The social platform for lovers of porn.</p>}
                <hr className="w-full border-none h-0.5 lg:w-[110%] bg-pink" />
                {isAuthenticated ? <p className="text-sm">Start <span className="text-pink">following</span> fans to unlock a tailored homepage just for you.</p>
                    : <div className="flex flex-col gap-y-3">
                        <p className="text-sm font-bold">Millions of videos to rate & review, discover & discuss, list, like & log.</p>
                        <p className="text-mauve text-sm">Connect with fans who love what you love. </p>
                    </div>}
            </div>

            {!isAuthenticated ? <Button onClick={signup} className="rounded-[35px]">Create new account</Button> : null}
        </div>
    )
}

export default HeroComponent
