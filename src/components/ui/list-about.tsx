import { UsersModel } from "@/services/models/user.model";
import ButtonComponent from "../shared/button.component"

type ListsComponentProps = {
    title?: string;
    description?: string;
    tags: string[]
    user?: Partial<UsersModel>;
}

const ListAbout = (props: ListsComponentProps) => {
    const { description, tags } = props;
    return <div className="flex flex-col gap-y-8">
        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">List Description</p>
            <p className="text-sm">
                {description}
            </p>
        </div>

        <div className="flex flex-col gap-y-2">
            <p className="text-xl font-extrabold">List tags</p>
            <div className="flex flex-wrap items-center gap-4">
                {tags?.map((tag) => (
                    <ButtonComponent key={tag} className="rounded-[20px]" variant="tags">
                        {tag}
                    </ButtonComponent>
                ))}
            </div>
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
                <p>36 videos</p>
                <p>Last edited 2hrs ago</p>
                <span className="flex flex-col gap-y-3">
                    <p>Average video rating</p>
                    <img src="/assets/images/average.png" width={100} alt="" />
                </span>
            </div>
        </div>
    </div>
}

export default ListAbout