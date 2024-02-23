"use client"

import ButtonComponent from "@/components/shared/button.component";
import ProfileTabComponent from "@/components/ui/user-profile-tab.component";

const page = () => {
  return (
    <div className='mx-auto mt-8 flex flex-col gap-y-8 md:w-standard'>
      <div className="flex xs:flex-col xs:items-start gap-y-5 items-center justify-between">
        <div className="flex items-center gap-x-4">
          <img className="object-cover" width={110} src="/assets/images/user.png" alt="user" />
          <div className="flex flex-col gap-y-2">
            <p className="text-pink text-xl font-extrabold">PlayDirty😉</p>
            <p className="text-sm">
              1.7k followers
            </p>
            <ButtonComponent className="w-full">Follow</ButtonComponent>
          </div>
        </div>
      </div>

      <div className="">
        <ProfileTabComponent />
      </div>
    </div>
  );
};

export default page;
