import { SearchResults } from "@/services/models/list.model"
import PopularReviewsComponent from "./popular-reviews.component"

type ReviewComponentDef = {
  data?: SearchResults;
}


const ReviewsComponent = (props: ReviewComponentDef) => {
  const { data } = props;
  return (
    <div className="flex mt-9 flex-col gap-y-9">
      {data?.reviews?.length === 0 ? <p className="text-sm text-mauve text-center">Oooops! no reviews found for this keyword.</p>
        :
        <>
          {data?.reviews?.map((review) => (
            <PopularReviewsComponent key={review._id} {...review} />
          ))}
        </>}
    </div>
  )
}

export default ReviewsComponent