import Image from "next/image";
import Link from "next/link";

const WatchedActivity = () => {
    return <div className="flex items-center gap-x-6">
        <Image className="rounded-sm" src={`/assets/images/videothumb.png`} width={80} height={45} alt="hot porn"/>
        <div>
            <p className="text-sm"><Link href={`/user-account`}><span className="text-pink">Username</span></Link> watched <span className="text-pink">title of videos name</span></p>
            <p className="text-mauve text-sm font-medium">20 mins ago</p>
        </div>
    </div>
}

export default WatchedActivity;