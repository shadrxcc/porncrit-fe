import { Reviews } from "@/services/models/list.model";
import LinkVideoInput from "../shared/linkvideo-input";
import ReviewsComponent from "./myreview.component";
import { Form, Formik } from "formik";
import * as Yup from "yup";

type ReviewsType = {
  data: Reviews
}

const MyReviews = (props: ReviewsType) => {
  const { data } = props;
  return <div className="space-y-5">
    <Formik
      initialValues={{
        url: "",
      }}
      validationSchema={Yup.object({
        url: Yup
          .string()
          .url('Please enter a valid URL')
          .required('URL is required'),
      })}
      onSubmit={() => {

      }}
    >
      <Form className="w-full">
        <LinkVideoInput name="url" placeholder="Paste the link for a video you want to review. " />
      </Form>
    </Formik>
    <div className="flex mt-9 flex-col gap-y-9">
      {data?.reviews?.length === 0 ? <p className="text-sm text-center text-mauve">You haven't made any reviews yet.</p> : <>
        {data?.reviews?.map((review) => (
          <ReviewsComponent key={review?._id} {...review} />
        ))}
      </>}
    </div>
  </div>
}

export default MyReviews;