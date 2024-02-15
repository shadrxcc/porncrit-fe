import Image from "next/image";

const VideoViewed = () => {
  return (
    <div className="w-fit space-y-8">
      <div className="flex items-center gap-x-2.5">
        <Image
          src={`/assets/images/user.png`}
          width={45}
          height={45}
          alt="user"
        />

        <div>
          <p className="text-sm">
            <span className="text-pink font-bold">Username</span> watched this
            video
          </p>
          <p className="text-mauve text-sm">2 mins ago</p>
        </div>
      </div>

      <div className="flex items-center gap-x-2.5">
        <Image
          src={`/assets/images/user.png`}
          width={45}
          height={45}
          alt="user"
        />

        <div>
          <p className="text-sm">
            <span className="text-pink font-bold">Username</span> watched this
            video
          </p>
          <p className="text-mauve text-sm">2 mins ago</p>
        </div>
      </div>

      <div className="flex items-center gap-x-2.5">
        <Image
          src={`/assets/images/user.png`}
          width={45}
          height={45}
          alt="user"
        />
        <div>
          <p className="text-sm">
            <span className="text-pink font-bold">Username</span> watched this
            video
          </p>
          <p className="text-mauve text-sm">2 mins ago</p>
        </div>
      </div>

      <div className="flex items-center gap-x-2.5">
        <Image
          src={`/assets/images/user.png`}
          width={45}
          height={45}
          alt="user"
        />
        <div>
          <p className="text-sm">
            <span className="text-pink font-bold">Username</span> watched this
            video
          </p>
          <p className="text-mauve text-sm">2 mins ago</p>
        </div>
      </div>
    </div>
  );
};

export default VideoViewed;
