"use client"

import ButtonComponent from "@/components/shared/button.component";
import LoaderComponent from "@/components/shared/loader.component";
import MyProfileTabComponent from "@/components/ui/my-profile-tab.component";
import { getUserProfile } from "@/services/auth-services/async-actions";
import { selectAuthUser, selectIsAuthenticated } from "@/services/auth-services/selector";
import { AppDispatchType } from "@/services/config-store";
import { asyncGetUserList, selectLists } from "@/services/list-services/async-actions";
import { asyncGetUserReviews, selectMyReviews } from "@/services/reviews-services/async-actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {

  const [isLoading, setIsLoading] = useState(false)
  const lists = useSelector(selectLists);
  const dispatch: AppDispatchType = useDispatch()
  const user = useSelector(selectAuthUser);
  const reviews = useSelector(selectMyReviews);
  const isAuthenticated = useSelector(selectIsAuthenticated); // selector to get the authentication status
  const router = useRouter();

  const [isLoadingProfile, setIsLoadingProfile] = useState(false);

  // Check if the user is not authenticated and redirect to the homepage
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);


  useEffect(() => {
    if (isAuthenticated) {
      setIsLoadingProfile(true);
      dispatch(asyncGetUserList())
      dispatch(asyncGetUserReviews())
      dispatch(getUserProfile()).finally(() => setIsLoadingProfile(false));
    }


  }, [dispatch, isAuthenticated]);  

  return (
    <div className='mx-auto md:w-standard'>
      {isLoadingProfile && <LoaderComponent />}
      {!isLoadingProfile && <div className='flex flex-col gap-y-8'>
        <div className="flex items-center gap-x-4">
          <Image className="object-cover w-20 h-20 rounded-full border-[2px] border-pink" width={110} src={user?.avatar || "/assets/images/user.png"} height={110} priority={true} alt="user" />
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
          <MyProfileTabComponent list={lists} reviews={reviews}/>
        </div>
      </div>}
    </div>

  );
};

export default page;
