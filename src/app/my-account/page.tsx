import ButtonComponent from "@/components/shared/button.component";
import ProfileTabComponent from "@/components/ui/profile-tab.component";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-10 gap-x-16 mt-8">
      <div className="flex-[0.6_1_0]">
        <div className="flex flex-col gap-y-[18px]">
          <div className="flex items-center gap-x-4">
            <img width={50} src="/assets/images/user.png" alt="user" />
            <div className="flex flex-col gap-y-1">
              <p className="text-pink text-sm">Username Goes here</p>
              <div className="flex items-center gap-x-5 justify-between">
                <p className="text-sm">
                  1.8k <span className="text-pink">followers</span>
                </p>
                <p className="text-sm">
                  1.4k <span className="text-pink">followers</span>
                </p>
              </div>
            </div>
          </div>

          <ButtonComponent className="w-full">Edit account</ButtonComponent>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-medium">Your bio</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="text-sm font-medium">Your favorite tags</p>
            <div className="flex flex-wrap items-center gap-4">
              <ButtonComponent className="rounded-[20px]" variant="tags">
                Big boobs
              </ButtonComponent>
              <ButtonComponent className="rounded-[20px]" variant="tags">
                Brunette
              </ButtonComponent>
              <ButtonComponent className="rounded-[20px]" variant="tags">
                Masturbation
              </ButtonComponent>
            </div>
            <div></div>
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="text-sm font-medium">Favorite performers</p>
            <div className="flex items-center gap-x-2">
              <img width={50} src="/assets/images/tori.png" alt="tori" />
              <ButtonComponent className="rounded-[20px]" variant="tags">
                Tori Black
              </ButtonComponent>
            </div>
          </div>

          <div className="flex flex-col gap-y-4">
            <p className="text-sm font-medium">Stats</p>
            <div className="text-sm flex flex-col gap-y-5">
              <p>654 videos films watched</p>
              <p>3 weeks longest streak (activity!)</p>
              <span className="flex flex-col gap-y-3">
                <p>Average rating based on 1.4k reviews</p>
                <img src="/assets/images/average.png" width={100} alt="" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[2_1_0]">
      <ProfileTabComponent/>
      </div>
    </div>
  );
};

export default page;
