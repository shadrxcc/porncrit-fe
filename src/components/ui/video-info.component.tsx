import Image from "next/image";
import ButtonComponent from "../shared/button.component"

const VideoInfo = () => {
    return <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Tags</p>
            <div className="flex flex-wrap items-center gap-4">
                <ButtonComponent className="rounded-[20px]" variant="tags">
                    Big boobs
                </ButtonComponent>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                    Brunette
                </ButtonComponent>
                <ButtonComponent className="rounded-[20px]" variant="tags">
                    Masturbation
                </ButtonComponent>
            </div>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Performers</p>
            <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-x-2">
                    <img width={40} src="/assets/images/tori.png" alt="tori" />
                    <ButtonComponent className="rounded-[20px]" variant="tags">
                        Tori Black
                    </ButtonComponent>
                </div>
            </div>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Similar</p>
            <div className="flex flex-wrap items-center gap-4">
                <Image
                    src={`/assets/images/videothumb.png`}
                    className="rounded-[1.5px]"
                    width={106}
                    height={60}
                    alt=""
                />
                <Image
                    src={`/assets/images/sexyvideo.png`}
                    className="rounded-[1.5px]"
                    width={106}
                    height={60}
                    alt=""
                />
                <Image
                    src={`/assets/images/hotvideo.png`}
                    className="rounded-[1.5px]"
                    width={106}
                    height={60}
                    alt=""
                />
            </div>
        </div>
    </div>
}

export default VideoInfo;
