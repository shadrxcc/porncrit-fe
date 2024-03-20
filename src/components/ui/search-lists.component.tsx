import { SearchResults } from "@/services/models/list.model"
import PopularReviewsComponent from "./popular-reviews.component"
import List from "./general-list.component";

type ReviewComponentDef = {
    data?: SearchResults;
}

const SearchLists = (props: ReviewComponentDef) => {
    const { data } = props;
    return (
        <div className="flex mt-9 flex-col gap-y-9">
            {data?.lists?.length === 0 ? <p className="text-sm text-mauve text-center">Oooops! no reviews found for this keyword.</p>
                :
                <>
                    {data?.lists?.map((list) => (
                        <List key={list._id} {...list} url={`/lists/${list._id}`} />
                    ))}
                </>}
        </div>
    )
}

export default SearchLists

