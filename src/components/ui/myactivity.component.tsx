import UserCommentedComponent from "./usercomment-activity.component"
import UserFollowedComponent from "./userfollowed.component"
import WatchedActivity from "./watched-activity.component"

const MyActivityComponent = () => {
  return (
    <div className="flex mt-9 flex-col gap-y-9">
        {[1, 2, 3].map((e) => (
      <WatchedActivity key={e} />
    ))}
    <UserFollowedComponent/>
    <UserCommentedComponent/></div>
  )
}

export default MyActivityComponent