import Image from "next/image"




const List = () => {
    return <div className="space-y-3 bg-box rounded-box px-2 sm:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center gap-x-3">
            <Image
                className="w-min"
                src={`/assets/images/list.png`}
                alt="hard-porn"
                width={220}
                height={40}
                priority
            />
            <div className="flex flex-col gap-y-2.5">
            <p className="text-sm font-black">My well curated watchlist</p>
            <div className="flex items-center gap-x-1.5"><img width={16} src="/assets/images/user.png" alt="" /><p className="text-pink text-xs">DanTheMan</p></div>
            </div>
        </div>

        <p className="text-sm">List description goes underneath like so cut short if needed. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Sed do eiusmod tempor incididunt ut labore. </p>

        <div className="flex items-center gap-2.5 ">
          <p className="text-xs text-mauve">125 videos</p>
          <span className="flex items-center gap-x-1.5">
            <img src="/assets/icons/comment.svg" alt="" />{" "}
            <p className="text-xs text-mauve">35</p>
          </span>
          <span className="flex items-center gap-x-1.5">
            <img src="/assets/icons/fav.svg" alt="" />{" "}
            <p className="text-xs text-mauve">27</p>
          </span>
        </div>
    </div>
}

export default List;