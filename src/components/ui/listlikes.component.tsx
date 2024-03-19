import { LikesModel } from "@/services/models/list.model"
import ListLikeComponent from "./listlike.component"
type LikeProps = {
    like?: LikesModel[]
}

const ListLikes = (props:LikeProps) => {
    const{like}=props
    return <div><ListLikeComponent like={like} /></div>
}

export default ListLikes;