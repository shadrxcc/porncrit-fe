import Image from "next/image";
import ButtonComponent from "../shared/button.component";

import TextArea from "../shared/text-area.component";

const WriteReview = ({ closeModal }: { closeModal: () => void }) => {
  return (
    <div className="flex flex-col gap-y-3">
      <div className="space-y-3">
        <Image
          src={`/assets/images/4some.png`}
          alt=""
          width={350}
          height={196}
        />
        <p className="text-medium text-sm text-brown">Hot Lesbian Foursome</p>
      </div>

      <div className="space-y-1">
        <label htmlFor="watched" className="text-brown flex items-center gap-x-2.5 text-sm font-light">
          <input type="checkbox" name="watched" id="watched" />
          I’ve watched this videos
        </label>
        <p className="text-mauve text-xs font-light">
          Tick the box if you have watched the videos
        </p>
      </div>

      <div>
        <p className="text-brown text-sm leading-5 font-[350]">Rate</p>
        <p className="text-mauve text-xs leading-5 font-light">Add a rating for your review</p>
        <img src="/assets/images/rating.png" width={120} alt="" />
      </div>

      <div>
        <p className="text-brown text-sm leading-5 font-[350]">Review</p>

        <TextArea rows={3} placeholder="Let your fellow videos fans know what you think..." />

      </div>
      <div>
        <div className="flex justify-end">
          <ButtonComponent onClick={closeModal}
            variant="secondary"
            className="!w-fit !text-mauve place-self-end"
          >
            Cancel
          </ButtonComponent>
          <ButtonComponent className="!w-fit place-self-end">
            Publish review
          </ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
