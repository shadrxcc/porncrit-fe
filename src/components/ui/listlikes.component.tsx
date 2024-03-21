import { LikesModel } from "@/services/models/list.model"
import ListLikeComponent from "./listlike.component"
type LikeProps = {
    like?: LikesModel[]
}

const ListLikes = (props: LikeProps) => {
    const { like } = props
    return <div className="flex flex-col gap-y-8"><ListLikeComponent like={like} /></div>
}

export default ListLikes;