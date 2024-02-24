import Button from "../shared/button.component"

const HeroComponent = ({ signup }: { signup: () => void }) => {
    return (
        <div className="flex px-4 flex-col mt-8 gap-y-8 items-center text-center justify-center w-fit m-auto">
            <div className="flex flex-col gap-y-[25px] items-center">
                {/* show when authenticated */}
                <p className="text-xl hidden font-bold">Hello, <span className="text-pink">Username</span></p>
                <p className="text-xl font-bold">The social platform for lovers of porn.</p>
                <hr className="w-full border-none h-0.5 lg:w-[110%] bg-pink" />
                <div className="flex flex-col gap-y-3">
                    <p className="text-sm font-bold">Millions of videos to rate & review, discover & discuss, list, like & log.</p>
                    <p className="text-mauve text-sm">Connect with fans who love what you love. </p>
                </div>
                {/* show when authenticated */}
                <p className="text-sm hidden">Start <span className="text-pink">following</span> fans to unlock a tailored homepage just for you.</p>

            </div>

            <Button onClick={signup} className="rounded-[35px]">Create new account</Button>
        </div>
    )
}

export default HeroComponent
