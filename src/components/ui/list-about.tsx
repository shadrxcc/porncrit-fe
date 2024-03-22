import { UsersModel } from "@/services/models/user.model";
import ButtonComponent from "../shared/button.component"
import { LinkVideoModel, ListData } from "@/services/models/list.model";
import { formatTimestamp } from "@/services/utils";
import Rating from "react-animated-rating";
import { useRouter } from "next/navigation";


type listDataProp = {
    data: ListData
}


const ListAbout = (props: listDataProp) => {
    const { data } = props;

    const router = useRouter()

    const calculateAverageRating = (videos: LinkVideoModel[]): number => {
        let totalRatings = 0;
        videos.forEach(video => {
            totalRatings += video.rating;
        });
        return totalRatings / videos.length;
    };


    return <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">List Description</p>
            <p className="text-sm">
                {data?.description ? "No description for this list" : data.description}
            </p>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">List tags</p>
            {data?.tags?.length === 0 ? <p className="text-sm">No tags available</p> : <div className="flex flex-wrap items-center gap-4">
                {data?.tags?.map((tag) => (
                    <ButtonComponent onClick={()=>router.push(`/tags/${tag}`)} key={tag} className="rounded-[20px]" variant="tags">
                        {tag}
                    </ButtonComponent>
                ))}
            </div>}
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">List performers</p>
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
            <p className="text-xl font-extrabold">List Stats</p>
            <div className="text-sm flex flex-col gap-y-5">
                <p>{data?.videos?.length} {data?.videos.length > 1 ? 'videos' : 'video'}</p>
                <p>Last edited {formatTimestamp(data?.updatedAt)}</p>
                <span className="flex flex-col gap-y-3">
                    <p>Average video rating</p>
                    <Rating wrapperClassName="icon-red" filled={calculateAverageRating(data?.videos as LinkVideoModel[])} icon={<svg width="16" height="16" viewBox="0 0 35 35" strokeWidth="2px" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5185 30.8628C9.7619 31.3192 8.82853 30.642 9.02765 29.7811L10.7292 22.4251C10.8127 22.0642 10.6899 21.6868 10.41 21.4442L4.70197 16.4954C4.03444 15.9167 4.39039 14.82 5.27055 14.7436L12.8169 14.0886C13.186 14.0565 13.5072 13.8229 13.6515 13.4816L16.5792 6.55441C16.9234 5.74015 18.0773 5.74015 18.4214 6.55441L21.3492 13.4816C21.4934 13.8229 21.8146 14.0565 22.1838 14.0886L29.7301 14.7436C30.6103 14.82 30.9662 15.9167 30.2987 16.4954L24.5906 21.4442C24.3108 21.6868 24.1879 22.0642 24.2714 22.4251L25.973 29.7811C26.1721 30.642 25.2387 31.3192 24.4822 30.8628L18.0169 26.9626C17.6992 26.771 17.3015 26.771 16.9838 26.9626L10.5185 30.8628Z" />
                    </svg>
                    } />
                </span>
            </div>
        </div>
    </div>
}

export default ListAbout