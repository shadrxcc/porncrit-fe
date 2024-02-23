import List from "./general-list.component";

const MyLists = () => {
    return <div className="flex mt-9 flex-col gap-y-9">
        {[1, 2, 3, 4].map((e) => (
            <List key={e} />
        ))}

    </div>
}

export default MyLists;