import Image from "next/image";

const LikeComponent = () => {
  return (
    <div className="flex gap-x-3.5 items-center">
      <Image className="rounded-sm"
        src={`/assets/images/4some.png`}
        width={130}
        height={75}
        alt="foursome"
      />
      <div className="space-y-2">
        <p className="text-sm">Title goes here cut short if need...</p>
        <div className="flex text-sm items-center gap-x-2">
          <img src="/assets/icons/fav.svg" width={20} alt="like-icon" />
          <p>1 min ago </p>
        </div>
      </div>
    </div>
  );
};

export default LikeComponent;
