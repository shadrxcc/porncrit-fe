import { UsersModel } from "@/services/models/user.model";
import ButtonComponent from "../shared/button.component"
import { LinkVideoModel, ListData } from "@/services/models/list.model";
import { formatTimestamp } from "@/services/utils";


type listDataProp = {
    data: ListData 
}


const ListAbout = (props: listDataProp) => {
    const { data } = props;
    return <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">List Description</p>
            <p className="text-sm">
                {data?.description ? "No description for this list" : data.description}
            </p>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">List tags</p>
            {data?.tags?.length === 0 ? <p className="text-sm text-mauve ">No tags available</p> : <div className="flex flex-wrap items-center gap-4">
                {data?.tags?.map((tag) => (
                    <ButtonComponent key={tag} className="rounded-[20px]" variant="tags">
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
                <p>{data?.videos?.length} videos</p>
                <p>Last edited {formatTimestamp(data?.updatedAt)}</p>
                <span className="flex flex-col gap-y-3">
                    <p>Average video rating</p>
                    <img src="/assets/images/average.png" width={100} alt="" />
                </span>
            </div>
        </div>
    </div>
}

export default ListAbout