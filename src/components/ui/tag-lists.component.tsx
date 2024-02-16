import Image from "next/image"

const TagListComponent = () => {
    return  <div className="space-y-3 lg:w-[80%]">
    <div className="flex flex-col gap-y-3">
      <p className="text-sm text-pink">Hot videos</p>
      <div className="space-y-3">
        <div className="flex items-center gap-x-3"><img src="/assets/images/user.png" width={20} alt="" /> <p className="text-sm">Username</p></div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-x-5 gap-y-2">
        <Image
          className="w-full lg:w-min"
          src={`/assets/images/lists.png`}
          alt="hard-porn"
          width={226}
          height={60}
          priority
        />
        <div className="flex flex-row flex-wrap lg:flex-col gap-2.5 ">
          <p className="text-xs text-mauve">125 videos</p>
          <span className="flex items-center gap-x-1.5">
            <img src="/assets/icons/comment.svg" alt="" />{" "}
            <p className="text-xs text-mauve">35 comments</p>
          </span>
          <span className="flex items-center gap-x-1.5">
            <img src="/assets/icons/fav.svg" alt="" />{" "}
            <p className="text-xs text-mauve">27 likes</p>
          </span>
        </div>
      </div>
      </div>
    </div>
  </div>
}

export default TagListComponent;