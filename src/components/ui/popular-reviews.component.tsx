import Image from "next/image"

const PopularReviewsComponent = () => {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
                <div className="flex items-center gap-x-3"><img width={33} src="/assets/images/user.png" alt="" /><p className="text-pink-2 text-sm">Username</p></div>
                <div className="flex flex-col lg:flex-row gap-3">
                    <Image className="w-full lg:w-min" width={177} height={100} src={`/assets/images/videothumb.png`} priority alt="hot-nasty-porn" />
                    <div className="flex flex-col gap-y-2.5">
                        <div className="flex flex-col gap-y-3.5">
                            <p className="text-sm font-medium">Title Goes here cut short if need...</p>
                            <img width={70} src="/assets/images/rating.png" alt="rating" />
                        </div>
                        <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...</p>

                    </div>
                </div>
            </div>
            <div className="flex items-center gap-x-9">
                <div className="flex items-center gap-x-1.5">
                    <img src="/assets/icons/comment.svg" alt="comment-icon" />
                    <p className="text-xs text-mauve">35 comments</p>
                </div>
                <div className="flex items-center gap-x-1.5">
                    <img src="/assets/icons/fav.svg" alt="fav-iocn" />
                    <p className="text-xs text-mauve">27 likes</p>
                </div>

            </div>
        </div>
    )
}

export default PopularReviewsComponent