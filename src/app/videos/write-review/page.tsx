"use client"

import ButtonComponent from "@/components/shared/button.component"
import TextArea from "@/components/shared/text-area.component"
import Image from "next/image"
import { useRouter } from "next/navigation"


const page = () => {
    const navigate = useRouter()

    return (
        <div className="md:w-standard mx-auto flex flex-col gap-y-10">
            <div className="space-y-2.5">
                <p className="text-lg font-extrabold">Your review</p>
                <div className="bg-box rounded-box flex items-center gap-x-3 py-5 px-8">
                    <Image src={`/assets/images/hotvideo.png`} width={88} height={50} alt="" />
                    <div>
                        <p className="text-sm font-bold">Ebony raw sex</p>
                        <div className="flex items-center gap-x-3">
                            <img src="/assets/images/rating.png" width={80} alt="" />
                            <p className="text-[10px]">based on 18.4k ratings</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-2.5">
                <p className="text-lg font-extrabold">Rate</p>
                <p className="text-sm leading-5">Rate this video out of 5 stars</p>
                <img src="/assets/images/rating.png" width={100} alt="" />
            </div>

            <div className="space-y-2.5">
                <p className="text-lg font-extrabold">Review</p>
                {/* <TextArea rows={3} placeholder="Let your fellow videos fans know what you think..." /> */}
            </div>

            <div className="flex justify-end">
          <ButtonComponent onClick={() => navigate.back()}
            variant="secondary"
            className="!w-fit !text-white place-self-end"
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent className="!w-fit place-self-end">
            Publish review
          </ButtonComponent>
        </div>
        </div>
    )
}

export default page
