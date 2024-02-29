"use client"

import ButtonComponent from "@/components/shared/button.component";
import MyProfileTabComponent from "@/components/ui/my-profile-tab.component";
import { getUserProfile } from "@/services/auth-services/async-actions";
import { selectAuthUser, selectIsAuthenticated } from "@/services/auth-services/selector";
import { AppDispatchType } from "@/services/config-store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const dispatch: AppDispatchType = useDispatch()
  const user = useSelector(selectAuthUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated) {
       router.push("/");
    }
}, [isAuthenticated, router]);

if (!isAuthenticated) {
    // You can render a loading state or a redirect message here if needed
    return null;
}



  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className='mx-auto flex flex-col gap-y-8 md:w-standard'>
      <div className="flex items-center gap-x-4">
        <img className="object-cover" width={110} src="/assets/images/user.png" alt="user" />
        <div className="flex xs:flex-col gap-y-3 xs:items-start justify-between items-center flex-1">
          <div className="flex flex-col gap-y-2">
            <p className="text-pink text-xl font-extrabold">{user?.username}</p>
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
