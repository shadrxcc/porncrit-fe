import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const UserFollowedComponent = () => {
  return (
    <div className='flex items-center gap-x-9'>
        <div className="flex relative">
            <Image src={`/assets/images/user.png`} width={45} height={45} alt="user pfp"/>
            <Image src={`/assets/images/user.png`} className='absolute left-6' width={45} height={45} alt="user pfp"/>
        </div>

        <div>
            <p className="text-sm"><Link href={`/user-account`}><span className="text-pink">Username</span></Link> started following <Link href={`/user-account`}><span className="text-pink">Username</span></Link></p>
            <p className="text-mauve text-sm font-medium">6 days ago</p>
        </div>
    </div>
  )
}

export default UserFollowedComponent