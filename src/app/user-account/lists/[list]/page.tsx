import ButtonComponent from "@/components/shared/button.component";
import ListTabs from "@/components/ui/list-tabs.component";
import ListCommentsComponent from "@/components/ui/listcomments.component";
import ListedVideo from "@/components/ui/listedvideo-component";
import ListLikes from "@/components/ui/listlikes.component";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-10 lg:px-16 gap-x-16 mt-8">
      <div className="flex-[0.6_1_0]">
        <div className="flex flex-col gap-y-[18px]">
          <div className="flex items-center gap-x-4">
            <img width={50} src="/assets/images/user.png" alt="user" />
            <div className="flex flex-col gap-y-1">
              <p className="text-sm">List created by</p>
              <p className="text-sm text-pink">
                Username
                </p>
            </div>
          </div>

          <ButtonComponent className="!w-fit" variant="outline-pink"><img src="/assets/icons/white-like.svg" width={10} alt="like icon" /> Like list</ButtonComponent>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-medium">List description</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="flex flex-col gap-y-3">
            <p className="text-sm font-medium">List Tags</p>
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
            <p className="text-sm font-medium">Performers</p>
            <div className="flex items-center gap-x-2">
              <img width={50} src="/assets/images/tori.png" alt="tori" />
              <ButtonComponent className="rounded-[20px]" variant="tags">
                Tori Black
              </ButtonComponent>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-[1.5_1_0]">
      <ListTabs/>
      <ListedVideo/>
      <ListCommentsComponent/>
      <ListLikes/>
      </div>
    </div>
  );
};

export default page;
