import LinkVideoInput from "../shared/linkvideo-input";
import ReviewsComponent from "./myreview.component";
import { Form, Formik } from "formik";
import * as Yup from "yup";


const MyReviews = () => {
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
      {[1, 2, 3, 4].map((e) => (
        <ReviewsComponent key={e} />
      ))}
    </div>
  </div>
}

export default MyReviews;