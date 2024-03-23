import { LinkVideoModel, VideoModel } from '@/services/models/list.model'
import React from 'react'
import ListedVideo from './listedvideo-component'

type ListVideosProp = {
    data?: LinkVideoModel[];
    isAuthenticated: boolean;
    openLogin: () => void;
}

const ListVideos = (props: ListVideosProp) => {
    const { data, openLogin, isAuthenticated } = props;
    return (
        <div className="flex flex-col gap-y-8">
            {data?.map((vid) => (
                <ListedVideo key={vid._id} {...vid} openLogin={openLogin} isAuthenticated={isAuthenticated} />
            ))}
        </div>
    )
}
export default ListVideos
