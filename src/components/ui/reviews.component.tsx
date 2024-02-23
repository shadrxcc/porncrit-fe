import PopularReviewsComponent from "./popular-reviews.component"

const ReviewsComponent = () => {
  return (
    <div className="flex mt-9 flex-col gap-y-9">
    {[1, 2, 3, 4].map((e) => (
      <PopularReviewsComponent key={e} />
    ))}
  </div>
  )
}

export default ReviewsComponent