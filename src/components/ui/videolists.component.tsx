import React from 'react'
import { VideoModel } from '@/services/models/list.model'
import VideoReview from './videoreview.component'

type VideoReviewsProp = {
    data: VideoModel
}

const VideoListsComponent = (props: VideoReviewsProp) => {
    const { data } = props;
    return (
        <div className='flex flex-col gap-y-6'>
            {data?.reviews?.map((review) => (
                <VideoReview key={review._id} {...review} />
            ))}
        </div>
    )
}

export default VideoListsComponent
