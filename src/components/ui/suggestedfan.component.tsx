import Image from "next/image"
import ButtonComponent from "../shared/button.component"
import Link from "next/link"


const SuggestedFanComponent = () => {
  return (
    <div className="w-fit flex flex-col gap-y-2.5">
        <div className="flex items-center gap-x-7">
           <Image width={65} height={65} src={`/assets/images/user.png`} alt="" />
           <div className="text-sm">
            <Link href={`/user-account`}><p className="text-pink">Username</p></Link>
            <p>177 followers</p>
            </div> 
        </div>

        <ButtonComponent className="w-full rounded-[20px]">Follow</ButtonComponent>
        

    </div>
  )
}

export default SuggestedFanComponent