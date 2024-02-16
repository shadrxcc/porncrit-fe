import ReviewComponent from "./review.component"

const ReviewsComponent = () => {
  return (
    <div className="flex mt-9 flex-col gap-y-9">
    {[1, 2, 3, 4].map((e) => (
      <ReviewComponent key={e} />
    ))}
  </div>
  )
}

export default ReviewsComponent