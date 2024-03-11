"use client"

import Button from "@/components/shared/button.component"
import { useRouter } from "next/navigation"

const page = () => {
    const navigate = useRouter()

    return (
        <div className="md:w-standard h-screen space-y-6 mx-auto">
            <h1 className='text-xl font-bold'>Oooops!</h1>

            <p className='text-mauve text-sm leading-[40px]'>
                Looks like we couldn't find the details for this video.<br />

                Please try linking another video or discover content linked, rated and listed by fans.<br />

                If you think there’s an issue send us an email - help@porncrit.com
            </p>
            <Button onClick={() => navigate.back()} className="!w-fit place-self-end">Go back</Button>
        </div>
    )
}

export default page


/* Looks like we couldn't find the details for this video. Please try linking another video or discover content linked, rated and listed by fans. If you think there’s an issue send us an email - help@porncrit.com */

// position: absolute;
// width: 609px;
// height: 100px;
// left: calc(50% - 609px/2 - 0.5px);
// top: calc(50% - 100px/2 - 516px);

// font-family: 'Avenir';
// font-style: normal;
// font-weight: 400;
// font-size: 15px;
// line-height: 20px;

// color: #AC6686;

