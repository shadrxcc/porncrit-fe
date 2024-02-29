import LinkVideoInput from "../shared/linkvideo-input";
import ReviewsComponent from "./myreview.component";

const MyReviews = () => {
  return <div className="space-y-5">
    <LinkVideoInput placeholder="Paste the link for a video you want to review. " />
    <div className="flex mt-9 flex-col gap-y-9">
      {[1, 2, 3, 4].map((e) => (
        <ReviewsComponent key={e} />
      ))}
    </div>
  </div>
}

export default MyReviews;