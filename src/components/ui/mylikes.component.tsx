import LikeComponent from "./like.component";

const MyLikes = () => {
    return <div className="flex mt-9 flex-col gap-y-9">
    {[1, 2, 3, 4].map((e) => (
      <LikeComponent key={e} />
    ))}
  </div>
}

export default MyLikes;