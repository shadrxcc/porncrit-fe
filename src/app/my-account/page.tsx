"use client"

import ButtonComponent from "@/components/shared/button.component";
import MyProfileTabComponent from "@/components/ui/my-profile-tab.component";

const page = () => {
  return (
    <div className='mx-auto mt-8 flex flex-col gap-y-8 md:w-standard'>
      <div className="flex flex-col sm:flex-row gap-y-5 sm:items-center justify-between">
        <div className="flex items-center gap-x-4">
          <img className="sm:w-[120px] object-cover" width={50} src="/assets/images/user.png" alt="user" />
          <div className="flex flex-col gap-y-1">
            <p className="text-pink text-xl font-extrabold">PlayDirty😉</p>
            <p className="text-sm">
              1.7k followers
            </p>
            <ButtonComponent className="w-full">Edit account</ButtonComponent>

          </div>
        </div>
        <div className="flex items-center justify-evenly gap-x-2.5 sm:gap-x-12">
          <div className="space-y-1">
            <p className="text-pink">Reviews</p>
            <p>18.5k</p>
          </div>

          <div className="space-y-1">
            <p className="text-pink">Lists</p>
            <p>177</p>
          </div>

          <div className="space-y-1">
            <p className="text-pink">Likes</p>
            <p>72.4k</p>
          </div>
        </div>
      </div>

      <div className="">
        <MyProfileTabComponent />
      </div>
    </div>
  );
};

export default page;
