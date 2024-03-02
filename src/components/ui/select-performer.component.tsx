import Image from "next/image"
import ButtonComponent from "../shared/button.component"

const SelectPerformer = ({ performer }: { performer?: string }) => {
    return <div className="flex items-center gap-x-2">
        <Image src={`/assets/images/tori.png`} width={50} height={50} alt="Tori Black" />
        <div className="bg-mauve divide-default justify-center divide-x-2 w-fit space-x-2.5 flex items-center py-2 px-3.5 rounded-3xl text-white text-sm">
            <div><p>{performer}</p></div>
            <div className="pl-2.5"><ButtonComponent className="!bg-transparent !p-0"><img src="/assets/icons/close-ring.svg" width={20} alt="cancel icon" /></ButtonComponent></div>
        </div>
    </div>
}

export default SelectPerformer