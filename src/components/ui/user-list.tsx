import Link from "next/link";
import ButtonComponent from "../shared/button.component";
import List from "./general-list.component";

const UserLists = () => {
    return <>
        <div className="mt-9">
            <div className="flex flex-col gap-y-9">
                {[1, 2, 3, 4].map((e) => (
                    <List key={e} />
                ))}

            </div>
        </div>
    </>
}

export default UserLists;