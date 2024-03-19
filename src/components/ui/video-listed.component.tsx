import { ListData } from "@/services/models/list.model";
import List from "./general-list.component";

type listDataProp = {
  data?: ListData[]
}

const VideoListed = (props: listDataProp) => {
  const { data } = props;

  return <div className="space-y-7">
    {data?.length === 0 ? <p className="text-sm text-center text-mauve">No lists featuring this video yet. Be the first to save to your list.</p> : <>
      {data?.map((list) => (
        <List url={`/lists/${list._id}`} key={list._id} {...list} />
      ))}
    </>}

  </div>
}

export default VideoListed;