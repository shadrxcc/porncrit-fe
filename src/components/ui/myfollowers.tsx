import FollowerComponent from "./follower.component";

const MyFollowers = () => {
    return <div className="flex mt-9 flex-col gap-y-9">
    {[1, 2, 3, 4].map((e) => (
      <FollowerComponent key={e} />
    ))}
  </div>
}

export default MyFollowers;