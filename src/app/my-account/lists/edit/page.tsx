import ButtonComponent from "@/components/shared/button.component";
import CloseRoundSvg from "@/components/shared/closeround.component";
import CodeSvg from "@/components/shared/code.component";
import Input from "@/components/shared/secondary-input.component";
import SelectPerformer from "@/components/ui/select-performer.component";
import SelectTagComponent from "@/components/ui/select-tag.component";
import Image from "next/image";

const EditList = () => {
  return (
    <div className="flex lg:w-[50%] mt-8 mx-auto gap-y-8 flex-col">
      <h1 className="text-xl font-extrabold">Edit list</h1>

      <div className="space-y-7">
        <div className="flex flex-col gap-y-7 mt-4">
          <Input
            placeholder="Enter a title for your list..."
            label="List title"
          />
          <Input
            placeholder="Let your fellow videos fans know a bit about your list.."
            label="List description"
          />
          <div className="flex flex-col gap-y-4">
            <Input
              placeholder="Start typing and pick up to 5 tags that describe your list..."
              label="Favorite Tags"
            />
            <SelectTagComponent />
          </div>

          <div className="flex flex-col gap-y-4">
            <Input
              placeholder="Start typing and pick the videos you’d like to add..."
              label="Add videos"
            />
            <ButtonComponent className="!w-fit place-self-end">
              Add videos
            </ButtonComponent>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium">Videos</p>
           <div className="flex flex-col gap-y-3">
           {[1,2,3].map((e) => (
                <div key={e} className="flex items-center justify-between py-3 px-[18px] rounded-[3px] border border-white">
                <div className="flex items-center gap-x-3">
                  <Image
                    src={`/assets/images/3some.png`}
                    width={133}
                    height={75}
                    alt="threesome"
                  />
                  <p>Threesome</p>
                </div>
  
                <div className="flex items-center gap-x-3.5">
                  <ButtonComponent variant="secondary" className="!w-fit !p-0">
                    <CloseRoundSvg />
                  </ButtonComponent>
                  <ButtonComponent variant="secondary" className="!w-fit !p-0">
                    <CodeSvg />
                  </ButtonComponent>
                </div>
              </div>
            ))}
           </div>
          </div>
        </div>
        <ButtonComponent className="!w-fit place-self-end">
          Save list
        </ButtonComponent>
      </div>
    </div>
  );
};

export default EditList;
