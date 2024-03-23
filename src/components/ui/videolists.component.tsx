import React from 'react'
import { VideoModel } from '@/services/models/list.model'
import VideoReview from './videoreview.component'

type VideoReviewsProp = {
    data: VideoModel;
    isAuthenticated: boolean;
    openLogin: () => void;
}

const VideoListsComponent = (props: VideoReviewsProp) => {
    const { data, openLogin, isAuthenticated } = props;
    return (
        <>
            <div>
                {data?.reviews?.length === 0 ? <p className='text-sm text-mauve text-center'>No reviews for this video yet. Be the first to review.</p> :
                    <div className='flex flex-col gap-y-6'>
                        {data?.reviews?.map((review) => (
                            <VideoReview key={review._id} {...review} openLogin={openLogin} isAuthenticated={isAuthenticated} />
                        ))}
                    </div>}
            </div>
        </>
    )
}

export default VideoListsComponent
