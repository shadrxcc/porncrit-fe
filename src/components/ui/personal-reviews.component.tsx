import ReviewsComponent from "./reviews.component";

const MyReviews = () => {
    return <div className="flex mt-9 flex-col gap-y-9">
    {[1, 2, 3, 4].map((e) => (
      <ReviewsComponent key={e} />
    ))}
  </div>
}

export default MyReviews;