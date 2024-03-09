import ButtonComponent from "@/components/shared/button.component"
import Image from "next/image"

const page = () => {
    return (
        <div>
            <div className="md:w-standard space-y-6 mx-auto">
                <div className="space-y-2.5">
                    <p className="text-lg font-extrabold">We found it</p>
                    <p className="text-sm text-mauve">Great taste! This video has been saved by a fan. Visit video’s page to review, rate or list.</p>
                </div>

                <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-2.5">
                        <Image src={`/assets/images/4some.png`} width={282} className="w-full md:w-min" height={158} alt="4some" />
                        <div className="flex flex-col gap-y-6">
                            <p className="text-sm font-medium">Title of video goes here double lined if need down below </p>
                            <div className="flex gap-x-3 items-center">
                                <img width={150} src="/assets/images/rating.png" alt="" />
                                <p className="text-[10px] font-medium">based on 18.4k ratings</p>
                            </div>
                            <ButtonComponent variant="outline-pink">Go to video page</ButtonComponent>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
