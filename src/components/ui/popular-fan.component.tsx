import Link from "next/link";
import ButtonComponent from "../shared/button.component";

const PopularFanComponent = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-7">
          <img width={65} src="/assets/images/user.png" alt="user" />
          <div className="flex flex-col gapp-y-3">
            <Link href={`/user-account`}><p className="text-pink text-sm">Username</p></Link>
            <p className="text-sm">177 followers</p>
          </div>
        </div>
        <div className="flex items-center gap-x-12">
          <div>
            <p className="leading-[25px] text-sm text-pink">Reviews</p>
            <p className="text-sm leading-[25px]">18.5k</p>
          </div>

          <div>
            <p className="leading-[25px] text-sm text-pink">Lists</p>
            <p className="text-sm leading-[25px]">652</p>
          </div>

          <div>
            <p className="leading-[25px] text-sm text-pink">Likes</p>
            <p className="text-sm leading-[25px]">72.4k</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-3">
          <p className="text-sm">Average rating based on 1.4k reviews</p>
          <img src="/assets/images/average.png" width={100} alt="" />
        </div>
      </div>

      <ButtonComponent className="rounded-[20px]">Follow</ButtonComponent>
    </div>
  );
};

export default PopularFanComponent;
