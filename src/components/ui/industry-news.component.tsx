import Image from "next/image"

const IndustryNewsComponent = () => {
  return (
    <div className="col-span-1 flex w-full flex-col">
      <Image className="rounded-t-box w-full" src={`/assets/images/avn.png`} width={223} height={180} alt="avn news" />
      <div className="py-5 px-3.5 bg-box rounded-b-box">
      <p className="text-sm ">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...</p>
      </div>
    </div>
  )
}

export default IndustryNewsComponent