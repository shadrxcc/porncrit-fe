import Image from "next/image"
import ButtonComponent from "../shared/button.component"

const PorndleComponent = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-7">
        <Image className="w-full lg:w-min" src={`/assets/images/porndle.png`} alt="porndle" width={258} height={200}/>
        <div className="flex w-full flex-col gap-y-10">
        <button className="bg-whitealpha-10 px-3 text-start border w-full border-mauve py-2.5 rounded-[3px]">Lana Rhoades</button>
          <button className="bg-whitealpha-10 px-3 text-start border w-full border-mauve py-2.5 rounded-[3px]">Tori Black</button>
          <button className="bg-whitealpha-10 px-3 text-start border w-full border-mauve py-2.5 rounded-[3px]">Riley Reid</button>
        </div>
    </div>
  )
}

export default PorndleComponent