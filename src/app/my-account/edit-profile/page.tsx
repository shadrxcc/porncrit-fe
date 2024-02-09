import ButtonComponent from "@/components/shared/button.component";
import Input from "@/components/shared/secondary-input.component";
import SelectPerformer from "@/components/ui/select-performer.component";
import SelectTagComponent from "@/components/ui/select-tag.component";
import Image from "next/image";

const EditProfile = () => {
  return (
    <div className="flex lg:w-[40%] mt-8 mx-auto gap-y-8 flex-col">
      <div className="flex flex-wrap items-center gap-y-4 gap-x-11">
        <Image
          src={`/assets/images/user.png`}
          width={47}
          height={47}
          alt="user pfp"
        />
        <div className="flex items-center gap-x-6">
          <ButtonComponent>Change avatar</ButtonComponent>
          <p className="text-sm font-medium text-mauve underline cursor-pointer">
            Delete avatar
          </p>
        </div>
      </div>

      <div className="space-y-7">
        <div className="flex flex-col gap-y-7 mt-4">
          <Input placeholder="@Current username" label="Username" />
          <Input
            placeholder="Let your fellow videos fans know a bit about you..."
            label="Bio"
          />
          <div className="flex flex-col gap-y-4">
            <Input
              placeholder="Start typing and pick your 3 favourite tags"
              label="Favorite Tags"
            />
            <SelectTagComponent />
          </div>
          <div className="flex flex-col gap-y-4">
            <Input
              placeholder="Start typing and pick your 3 favourite performers"
              label="Favorite Performers"
            />
            <SelectPerformer />
          </div>
        </div>
        <ButtonComponent className="!w-fit m-auto">
          Save changes
        </ButtonComponent>
      </div>

      <div className="flex flex-col gap-y-4">
        <p className="text-sm text-center">Change password</p>
        <div className="space-y-7">
          <div className="flex flex-col gap-y-7">
            <Input label="Current password" />
            <Input label="New password" />
            <Input label="Confirm new password" />
          </div>
          <ButtonComponent className="!w-fit m-auto">
            Save changes
          </ButtonComponent>
        </div>
      </div>

      <div className="mt-20">
        <p className="text-sm text-mauve underline text-center">Delete your account</p>
      </div>
    </div>
  );
};

export default EditProfile;
