import UserReview from "./user-review.component";

const UserReviews = () => {
    return <div className="flex mt-9 flex-col gap-y-9">
    {[1, 2, 3, 4].map((e) => (
      <UserReview key={e} />
    ))}
  </div>
}

export default UserReviews;