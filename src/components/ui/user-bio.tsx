import ButtonComponent from "../shared/button.component"

const UserAbout = () => {
    return <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Your bio</p>
            <p className="text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Favorite tags</p>
            <div className="flex flex-wrap items-center gap-4">
                <ButtonComponent className="rounded-[20px]" variant="tags">
                    Big boobs
                </ButtonComponent>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                    Brunette
                </ButtonComponent>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                    Masturbation
                </ButtonComponent>
            </div>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Favorite performers</p>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-x-2">
                    <img width={40} src="/assets/images/tori.png" alt="tori" />
                    <ButtonComponent className="rounded-[20px]" variant="tags">
                        Tori Black
                    </ButtonComponent>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Stats</p>
            <div className="text-sm flex flex-col gap-y-5">
                <p>654 videos films watched</p>
                <p>3 weeks longest streak (activity!)</p>
                <span className="flex flex-col gap-y-3">
                    <p>Average rating based on 1.4k reviews</p>
                    <img src="/assets/images/average.png" width={100} alt="" />
                </span>
            </div>
        </div>
    </div>
}

export default UserAbout