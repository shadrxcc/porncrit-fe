import { ListData } from "@/services/models/list.model"
import List from "./general-list.component";

type ReviewComponentDef = {
    data?: ListData[];
}

const SearchLists = (props: ReviewComponentDef) => {
    const { data } = props;
    return (
        <div className="flex mt-9 flex-col gap-y-9">
            {data?.length === 0 ? <p className="text-sm text-mauve text-center">Oooops! no lists found for this keyword.</p>
                :
                <>
                    {data?.map((list) => (
                        <List key={list._id} {...list} url={`/lists/${list._id}`} />
                    ))}
                </>}
        </div>
    )
}

export default SearchLists

