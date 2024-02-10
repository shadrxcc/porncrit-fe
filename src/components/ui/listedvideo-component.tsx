import Image from "next/image";
import ButtonComponent from "../shared/button.component";

const ListedVideo = () => {
    return <div className="flex flex-col gap-y-6">
       <div className="flex flex-col lg:flex-row lg:items-end gap-8"> <Image src={`/assets/images/4some.png`} width={177} height={100} className="rounded-sm object-cover w-full lg:w-min" alt="foursome"/>
        <div className="text-sm flex flex-col gap-y-4">
            <p>Title goes here cut short if need...</p>
            <div className="flex flex-col sm:flex-row border-b border-pink gap-8">
                <div className="flex flex-col gap-y-2">
                <p>Rating average  <span className="text-pink font-bold">4.6</span></p>
                <div className="flex items-center gap-x-1.5">
                    <img src="/assets/images/rating.png" width={50} alt="" />
                    <p>based on 18.4k ratings</p>
                </div>
                </div>

                <div>
                    <img src="/assets/images/chart.svg" width={164} alt="" />
                </div>
            </div>
        </div></div>

        <div className="flex items-center gap-5 sm:gap-x-12 flex-wrap">
            <ButtonComponent variant="outline-pink"><img src="/assets/icons/play.svg" alt="" /> Play</ButtonComponent>
            <ButtonComponent variant="outline-pink"><img src="/assets/icons/add.svg" alt="" /> Save</ButtonComponent>
            <ButtonComponent variant="outline-pink"><img src="/assets/icons/list.svg" alt="" /> List</ButtonComponent>
            <ButtonComponent variant="outline-pink"><img src="/assets/icons/white-like.svg" alt="" /> Like</ButtonComponent>

        </div>
    </div>
}

export default ListedVideo;