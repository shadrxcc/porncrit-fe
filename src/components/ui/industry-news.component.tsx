import Image from "next/image"

const IndustryNewsComponent = () => {
  return (
    <div className="flex flex-col gap-y-3">
      <Image className="w-full lg:w-min" src={`/assets/images/avn.png`} width={254} height={205} alt="avn news" />
      <p className="text-sm ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...</p>
    </div>
  )
}

export default IndustryNewsComponent