import Link from "next/link";
import ButtonComponent from "../shared/button.component";
import List from "./general-list.component";

const MyLists = () => {
    return <>
    <div className="flex flex-col gap-y-5 items-center mt-9">
        <Link href={`/my-account/lists/new`}><ButtonComponent>Create new list</ButtonComponent></Link>
    <div className="flex flex-col gap-y-9">
        {[1, 2, 3, 4].map((e) => (
            <List key={e} />
        ))}

    </div>
    </div>
    </>
}

export default MyLists;