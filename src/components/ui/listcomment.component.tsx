import { useState } from "react";
import ArrowDropDown from "../shared/arrow-dropdown.component";
import ButtonComponent from "../shared/button.component";
import CommentLineSvg from "../shared/commentline.component";
import FavoriteLight from "../shared/favlight.component";
import Replies from "./replies";
import Input from "../shared/secondary-input.component";

const ListCommentComponent = () => {
  const [replies, setReplies] = useState(false);
  const [comment, setComment] = useState(false);

  function openReplies() {
    setReplies(!replies);
  }

  function openComment() {
    setComment(true);
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex items-center gap-x-7">
        <div className="flex items-center gap-x-2">
          <img src="/assets/images/user.png" width={45} alt="" />
          <p className="text-sm">
            Written by <span className="text-pink font-bold">John</span>
          </p>
        </div>
        <img src="/assets/images/rating.png" width={70} alt="" />
      </div>

      <div>
        <p className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div onClick={openReplies} className="flex cursor-pointer items-center">
          <p className="text-sm text-pink">View 18 replies</p>
          <ArrowDropDown />
        </div>

        <div className="flex items-center gap-x-7">
          <ButtonComponent onClick={openComment} variant="secondary" className="!w-fit !p-0">
            <CommentLineSvg />
            <p className="text-xs">Comment</p>
          </ButtonComponent>

          <ButtonComponent variant="secondary" className="!w-fit !p-0">
          <FavoriteLight />
            <p className="text-xs">Like</p>
          </ButtonComponent>

          <div className="flex items-center gap-x-1.5">
            
          </div>
        </div>
      </div>

      {replies ? (
        <div className="flex justify-end">
          <div className="w-[85%] space-y-5">
            <Replies />
            <div className="flex cursor-pointer items-center">
              <p className="text-sm text-pink">View 18 replies</p>
              <ArrowDropDown />
            </div>
          </div>
        </div>
      ) : null}

      {comment ? <div className="flex flex-col gap-y-4">
        <Input placeholder="Add your comment..." />
        <div className="flex justify-end">
          <ButtonComponent onClick={() => setComment(false)}
            variant="secondary"
            className="!w-fit !text-mauve place-self-end"
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent className="!w-fit place-self-end">
            Comment
          </ButtonComponent>
        </div>
      </div> : null}
    </div>
  );
};

export default ListCommentComponent;
