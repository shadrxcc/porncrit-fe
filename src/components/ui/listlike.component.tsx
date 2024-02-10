import Image from "next/image";

const ListLikeComponent = () => {
  return (
    <div className="w-fit">
        <div className="flex items-center gap-x-2.5">
          <Image
            src={`/assets/images/user.png`}
            width={45}
            height={45}
            alt="user"
          />
          <div className="flex items-start gap-x-12">
            <div>
            <p className="text-sm">
              <span className="text-pink font-bold">Username</span> liked this
              list
            </p>
            <p className="text-mauve text-sm">2 mins ago</p>
          </div>

          <img src="/assets/icons/fav.svg" alt="" />
          </div>
          
        </div>
        

    </div>
  );
};

export default ListLikeComponent;
