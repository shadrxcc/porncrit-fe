import Image from "next/image"

const PopularListComponent = () => {
  return (
    <div>
        <div className="flex items-center gap-x-3"><img src="/assets/images/user.png" width={33} alt="pfp" />
        <p className="text-sm text-pink-2 font-medium">Username</p></div>

        <div>
            <p>List title (including if watchlist)</p>
            <div className="flex flex-col lg:flex-row gap-5">
                <Image className="w-full" src={`/assets/images/thumb2.png`} alt="hard-porn" width={167} height={60} /> 
                <div className="flex flex-row flex-wrap lg:flex-col gap-2.5 ">
                    <p className="text-xs text-mauve">125 videos</p>
                    <span><img src="/assets/images/comment.svg" alt="" /> <p className="text-xs text-mauve">35 comments</p></span>
                    <span><img src="/assets/images/fav.svg" alt="" /> <p className="text-xs text-mauve">27 likes</p></span>
                </div>
            </div>
           
        </div>

    </div>
  )
}

export default PopularListComponent