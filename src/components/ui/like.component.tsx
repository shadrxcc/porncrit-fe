import Image from "next/image";

const LikeComponent = () => {
  return (
    <div className="flex gap-x-3.5 bg-box rounded-box px-2 sm:px-8 py-10 items-center">
      <Image
        className="rounded-sm"
        src={`/assets/images/4some.png`}
        width={89}
        height={50}
        alt="foursome"
      />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col text-sm gap-y-2">
          <p className="text-sm text-pink font-bold">Five Sexy Beauties Fucking</p>
          <p className="text-sm font-light text-mauve">1 min ago </p>
        </div>

        <img src="/assets/icons/favred.svg" width={27} alt="like-icon" />
      </div>
    </div>
  );
};

export default LikeComponent;
