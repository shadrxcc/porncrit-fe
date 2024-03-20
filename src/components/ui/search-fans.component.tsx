"use client"

import { SearchResults } from '@/services/models/list.model';
import FollowerComponent from './follower.component';

type ReviewComponentDef = {
    data?: SearchResults;
}

const SearchFans = (props: ReviewComponentDef) => {
    const { data } = props;
    return (
        <div className="flex flex-col gap-y-10">
            {data?.lists?.length === 0 ? <p className="text-sm text-mauve text-center">Oooops! no reviews found for this keyword.</p>
                :
                <>
                    {data?.users?.map((user) => (
                        <FollowerComponent key={user._id} />
                    ))}
                </>}
        </div>
    )
}

export default SearchFans;