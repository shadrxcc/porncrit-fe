import Image from "next/image";
import ButtonComponent from "../shared/button.component"
import { LinkedVideoType } from "@/services/models/list.model";
import Link from "next/link";

const VideoInfo = ({ video }: { video: LinkedVideoType['video'] }) => {
    const { tags, models } = video;

    return <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Tags</p>
            {tags.length === 0 ? <p className="text-sm">No tags available for this video at the moment.</p> :
                <div className="flex flex-wrap items-center gap-4">
                    {tags.map((tag) => (
                        <ButtonComponent key={tag} className="rounded-[20px]" variant="tags">
                            {tag}
                        </ButtonComponent>
                    ))}
                </div>}
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">Performers</p>
            {models.length === 0 ? <p className="text-sm">No performers available at the moment.</p> : <div className="flex flex-wrap items-center gap-4">
                {models.map((model) => (
                    <Link key={model} href={`/performers/${model}`}>
                        <div className="flex items-center gap-x-2">
                            <img width={40} src="/assets/images/tori.png" alt={model} />
                            <ButtonComponent className="rounded-[20px]" variant="tags">
                                {model}
                            </ButtonComponent>
                        </div>
                    </Link>
                ))}
            </div>}
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
