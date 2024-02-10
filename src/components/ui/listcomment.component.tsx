import ArrowDropDown from "../shared/arrow-dropdown.component";
import ButtonComponent from "../shared/button.component";
import CommentLineSvg from "../shared/commentline.component";
import FavoriteLight from "../shared/favlight.component";

const ListCommentComponent = () => {
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
        <div className="flex items-center">
            <p className="text-sm text-pink">View 18 replies</p>
            <ArrowDropDown/>
        </div>

        <div className="flex items-center gap-x-7">
        <div className="flex items-center gap-x-1.5">
            <CommentLineSvg/>
            <p className="text-xs">Comment</p>
            
            </div>

             <div className="flex items-center gap-x-1.5">
            
            <FavoriteLight/>
            <p className="text-xs">Like</p>
            
        </div>     
        </div>
      </div>
    </div>
  );
};

export default ListCommentComponent;
