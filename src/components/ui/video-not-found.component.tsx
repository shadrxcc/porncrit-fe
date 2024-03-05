import React from 'react'
import Button from '../shared/button.component'

const VideoNotFoundComponent = () => {
    return (
       <div className='flex flex-col gap-y-11'>
         <div className='flex flex-col space-y-3.5'>
            <h1 className='text-xl font-extrabold leading-[29px]'>Oooops!</h1>
            <p className='text-sm text-mauve leading-[30px]'>Looks like we couldn't find the details for this video.<br />

                Please try linking another video or discover content linked, rated and listed by fans.<br />

                If you think there’s an issue send us an email - help@porncrit.com</p>
        </div>

        <Button className='!w-fit place-self-end'>Go back</Button>

       </div>
    )
}

export default VideoNotFoundComponent
/* Oooops! */

// position: absolute;
// width: 181px;
// height: 29px;
// left: 415px;
// top: 110px;

// font-family: 'Avenir';
// font-style: normal;
// font-weight: 800;
// font-size: 21px;
// line-height: 29px;
// /* identical to box height */

// color: #FFFFFF;

