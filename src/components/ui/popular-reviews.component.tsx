import { GetReviews } from "@/services/models/list.model"
import Image from "next/image"
import Link from "next/link"
import Rating from "react-animated-rating";
import ButtonComponent from "../shared/button.component";
import { memo } from "react";


const PopularReviewsComponent: React.FC<Partial<GetReviews>> = function (props
) {
    const { note, comments, likesCount, rating, video, user, videoId } = props;
    return (
        <div className="flex flex-col px-3 sm:px-9 py-8 rounded-[10px] bg-box gap-y-4">
            <div className="flex flex-col gap-y-2">
                <div className="flex flex-row items-center gap-3">
                    <Image className="object-contain rounded-[3px]" width={80} height={40} src={video?.image || `/assets/images/videothumb.png`} priority alt="hot-nasty-porn" />
                    <div className="flex flex-col gap-y-2 w-full">
                        <div className="flex flex-col gap-y-1.5">
                            <div className="flex items-center justify-between">
                                <Link href={`/videos/${videoId}`}><p className="text-sm line-clamp-1 font-extrabold">{video?.title}</p></Link>
                                <Link href={`/videos/${videoId}`}>
                                    <ButtonComponent className="!w-fit" variant="secondary"><svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.37079 5.9458L1.71079 0.295798C1.61783 0.20207 1.50723 0.127676 1.38537 0.0769072C1.26351 0.0261385 1.1328 0 1.00079 0C0.868781 0 0.738075 0.0261385 0.616216 0.0769072C0.494356 0.127676 0.383755 0.20207 0.290792 0.295798C0.104542 0.483161 0 0.736612 0 1.0008C0 1.26498 0.104542 1.51844 0.290792 1.7058L5.24079 6.7058L0.290792 11.6558C0.104542 11.8432 0 12.0966 0 12.3608C0 12.625 0.104542 12.8784 0.290792 13.0658C0.383407 13.1603 0.493852 13.2355 0.615727 13.287C0.737603 13.3384 0.868485 13.3652 1.00079 13.3658C1.1331 13.3652 1.26398 13.3384 1.38586 13.287C1.50773 13.2355 1.61818 13.1603 1.71079 13.0658L7.37079 7.4158C7.4723 7.32216 7.55331 7.2085 7.60871 7.08201C7.66412 6.95551 7.69273 6.8189 7.69273 6.6808C7.69273 6.5427 7.66412 6.40609 7.60871 6.27959C7.55331 6.15309 7.4723 6.03944 7.37079 5.9458Z" fill="white" />
                                    </svg></ButtonComponent>
                                </Link>
                            </div>
                            <Rating wrapperClassName="icon-red" filled={rating} icon={<svg width="16" height="16" viewBox="0 0 35 35" strokeWidth="2px" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.5185 30.8628C9.7619 31.3192 8.82853 30.642 9.02765 29.7811L10.7292 22.4251C10.8127 22.0642 10.6899 21.6868 10.41 21.4442L4.70197 16.4954C4.03444 15.9167 4.39039 14.82 5.27055 14.7436L12.8169 14.0886C13.186 14.0565 13.5072 13.8229 13.6515 13.4816L16.5792 6.55441C16.9234 5.74015 18.0773 5.74015 18.4214 6.55441L21.3492 13.4816C21.4934 13.8229 21.8146 14.0565 22.1838 14.0886L29.7301 14.7436C30.6103 14.82 30.9662 15.9167 30.2987 16.4954L24.5906 21.4442C24.3108 21.6868 24.1879 22.0642 24.2714 22.4251L25.973 29.7811C26.1721 30.642 25.2387 31.3192 24.4822 30.8628L18.0169 26.9626C17.6992 26.771 17.3015 26.771 16.9838 26.9626L10.5185 30.8628Z" />
                            </svg>
                            } />
                        </div>
                    </div>
                </div>
                <p className="text-sm">{note}</p>
            </div>

            <div className="flex items-center justify-between">
                <Link href={`/user`}><div className="flex items-center gap-x-3"><img width={20} className="rounded-full object-cover w-7 h-7" src={user?.avatar || "/assets/images/user.png"} alt="" /><p className="text-sm">Review by <span className="text-pink">{user?.username}</span></p></div></Link>
                <div className="flex items-center gap-x-5">
                    {comments?.length === 0 ? null : <div className="flex items-center gap-x-1.5">
                        <img src="/assets/icons/comment.svg" alt="comment-icon" />
                        <p className="text-xs text-mauve">{comments?.length}</p>
                    </div>}
                    {likesCount === 0 ? null : <div className="flex items-center gap-x-1.5">
                        <img src="/assets/icons/fav.svg" alt="fav-iocn" />
                        <p className="text-xs text-mauve">{likesCount}</p>
                    </div>}
                </div>
            </div>

        </div>
    )
}

export default memo(PopularReviewsComponent);