import Image from 'next/image'
import React from 'react'

const UserCommentedComponent = () => {
  return (
    <div className='flex items-center gap-x-9'>
        <div className="flex relative">
            <Image src={`/assets/images/user.png`} width={45} height={45} alt="user pfp"/>
            <Image src={`/assets/icons/comment.svg`} className='absolute left-8' width={20} height={18} alt="user pfp"/>
        </div>

        <div>
            <p className="text-sm"><span className="text-pink">Username</span> started following <span className="text-pink">username</span></p>
            <p className="text-mauve text-sm font-medium">6 days ago</p>
        </div>
    </div>
  )
}

export default UserCommentedComponent;