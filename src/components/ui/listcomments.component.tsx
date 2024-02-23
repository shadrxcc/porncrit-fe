import ButtonComponent from "../shared/button.component"
import SecondaryInputComponent from "../shared/secondary-input.component"
import ListCommentComponent from "./listcomment.component"

const ListCommentsComponent = () => {
    return <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4 bg-box rounded-box px-2 sm:px-8 py-5">
            <SecondaryInputComponent placeholder="Add your comment..." />
            <ButtonComponent className="!w-fit place-self-end">Comment</ButtonComponent>
        </div>

        <div>
            <ListCommentComponent />
        </div>
    </div>
}

export default ListCommentsComponent