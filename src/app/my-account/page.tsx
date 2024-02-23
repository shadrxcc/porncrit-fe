"use client"

import ButtonComponent from "@/components/shared/button.component";
import MyProfileTabComponent from "@/components/ui/my-profile-tab.component";
import Link from "next/link";

const page = () => {
  return (
    <div className='mx-auto flex flex-col gap-y-8 md:w-standard'>
      <div className="flex items-center gap-x-4">
        <img className="object-cover" width={110} src="/assets/images/user.png" alt="user" />
        <div className="flex xs:flex-col gap-y-3 xs:items-start justify-between items-center flex-1">
          <div className="flex flex-col gap-y-2">
            <p className="text-pink text-xl font-extrabold">PlayDirty😉</p>
            <p className="text-sm">
              1.7k followers
            </p>
          </div>
          <Link href={`/my-account/edit-profile`}><ButtonComponent className="w-full">Edit account</ButtonComponent></Link>
        </div>
      </div>

      <div className="">
        <MyProfileTabComponent />
      </div>
    </div>
  );
};

export default page;
