import React from 'react'
import { VideoModel } from '@/services/models/list.model'
import VideoReview from './videoreview.component'

type VideoReviewsProp = {
    data: VideoModel
}

const VideoListsComponent = (props: VideoReviewsProp) => {
    const { data } = props;
    return (
        <>
            <div>
                {data?.reviews?.length === 0 ? <p className='text-sm text-mauve text-center'>No reviews for this video yet. Be the first to review.</p> :
                    <div className='flex flex-col gap-y-6'>
                        {data?.reviews?.map((review) => (
                            <VideoReview key={review._id} {...review} />
                        ))}
                    </div>}
            </div>
        </>
    )
}

export default VideoListsComponent
