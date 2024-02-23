import List from "./general-list.component";

const VideoListed = () => {
  return <div className="space-y-7">
    {[1,2,3,4].map((e) => (
      <List key={e}/>
    ))}
  </div>
}

export default VideoListed;