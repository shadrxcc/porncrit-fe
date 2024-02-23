import Image from "next/image"
import Link from "next/link"

const PopularReviewsComponent = () => {
    return (
        <div className="flex flex-col px-2.5 sm:px-9 pt-3.5 pb-5 rounded-[10px] bg-box gap-y-4">
            <div className="flex flex-col gap-y-2">
                <Link href={`/user-account`}><div className="flex items-center gap-x-3"><img width={33} src="/assets/images/user.png" alt="" /><p className="text-sm">Review by <span className="text-pink-2"></span>Username</p></div></Link>
                <div className="flex flex-row gap-3">
                    <Image className="w-min object-contain rounded-[2px]" width={60} height={20} src={`/assets/images/videothumb.png`} priority alt="hot-nasty-porn" />
                    <div className="flex flex-col gap-y-2.5">
                        <div className="flex flex-col gap-y-1.5">
                            <p className="text-sm font-medium">Title Goes here cut short if need...</p>
                            <img width={70} src="/assets/images/rating.png" alt="rating" />
                        </div>
                    </div>
                </div>
                <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...</p>
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