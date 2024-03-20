import { LinkVideoModel, VideoModel } from '@/services/models/list.model'
import React from 'react'
import ListedVideo from './listedvideo-component'

type ListVideosProp = {
    data?: LinkVideoModel[]
}

const ListVideos = (props: ListVideosProp) => {
    const { data } = props;
    return (
        <div className="flex flex-col gap-y-8">
            {data?.map((vid) => (
                <ListedVideo key={vid._id} {...vid} />
            ))}
        </div>
    )
}
export default ListVideos
