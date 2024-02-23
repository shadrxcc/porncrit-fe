import ButtonComponent from "@/components/shared/button.component";
import ListTabs from "@/components/ui/list-tabs.component";

const page = () => {
  return (
    <div className="flex flex-col gap-y-10 md:w-standard mx-auto">
      <div className="flex xs:flex-col xs:items-start gap-y-3 items-center justify-between">
        <div className="space-y-2.5">
          <p className="text-xl font-extrabold">Ebony watchlist</p>
          <div className="flex items-center gap-x-4">
            <img width={50} src="/assets/images/user.png" alt="user" />
            <div className="flex flex-col gap-y-1">
              <p className="text-sm">List created by</p>
              <p className="text-sm text-pink">
                Username
              </p>
            </div>
          </div>
        </div>

        <ButtonComponent className="xs:w-full !w-fit" variant="outline-pink"><img src="/assets/icons/white-like.svg" width={10} alt="like icon" /> Like list</ButtonComponent>
      </div>

      <ListTabs />
    </div>
  );
};

export default page;
