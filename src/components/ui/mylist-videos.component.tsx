import { LinkVideoModel } from '@/services/models/list.model'
import MyListedVideo from './my-listed-video';

type ListVideosProp = {
    data?: LinkVideoModel[];
}

const MyListVideos = (props: ListVideosProp) => {
    const { data } = props;
    return (
        <div className="flex flex-col gap-y-8">
            {data?.map((vid) => (
                <MyListedVideo key={vid._id} {...vid} />
            ))}
        </div>
    )
}
export default MyListVideos
