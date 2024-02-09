import ButtonComponent from "@/components/shared/button.component";
import Input from "@/components/shared/secondary-input.component";
import Image from "next/image";

const EditProfile = () => {
    return <div className="flex lg:w-[40%] mt-8 mx-auto flex-col">
        <div className="flex flex-wrap items-center gap-y-4 gap-x-11">
            <Image src={`/assets/images/user.png`} width={47} height={47} alt="user pfp"/>
            <div className="flex items-center gap-x-6">
                <ButtonComponent>Change avatar</ButtonComponent>
                <p className="text-sm font-medium text-mauve underline cursor-pointer">Delete avatar</p>
            </div>
        </div>

        <div className="flex flex-col gap-y-7 mt-4">
            <Input placeholder="@Current username" label="Username"/>
            <Input placeholder="Let your fellow videos fans know a bit about you..." label="Bio"/>
            <Input placeholder="Start typing and pick your 3 favourite tags" label="Favorite Tags"/>
        </div>
    </div>
}

export default EditProfile;