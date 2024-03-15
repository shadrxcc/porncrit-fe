import { AppDispatchType } from "@/services/config-store";
import ButtonComponent from "../shared/button.component"
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "@/services/auth-services/selector";
import { memo, useEffect } from "react";
import { getUserProfile } from "@/services/auth-services/async-actions";
import { useRouter } from "next/navigation";

const UserAbout = () => {
    const dispatch: AppDispatchType = useDispatch()
    const user = useSelector(selectAuthUser);
    const router = useRouter()

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    return <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Your bio</p>
            <p className="text-sm">
                {user?.bio}
            </p>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Favorite tags</p>
            <div className="flex flex-wrap items-center gap-4">
                {user?.tags.map((tag) => (
                    <ButtonComponent onClick={()=>router.push(`/tags/${tag}`)} key={tag} className="rounded-[20px]" variant="tags">
                        {tag}
                    </ButtonComponent>
                ))}
            </div>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Favorite performers</p>
            <div className="flex flex-wrap items-center gap-4">
                {user?.performers.map((performer) => (
                    <div key={performer} className="flex items-center gap-x-2">
                        <img width={40} src="/assets/images/tori.png" alt="tori" />
                        <ButtonComponent className="rounded-[20px]" variant="tags">
                            {performer}
                        </ButtonComponent>
                    </div>
                ))}

            </div>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Stats</p>
            <div className="text-sm flex flex-col gap-y-5">
                <p>Reviews 18.5k</p>
                <p>Lists 652</p>
                <p>Likes 72.4k</p>
                <p>654 videos films watched</p>
                <p>3 weeks longest streak</p>
                <span className="flex flex-col gap-y-3">
                    <p>Average rating based on 1.4k reviews</p>
                    <img src="/assets/images/average.png" width={100} alt="" />
                </span>
            </div>
        </div>
    </div>
}

export default memo(UserAbout)