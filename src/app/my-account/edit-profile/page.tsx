"use client"

import ButtonComponent from "@/components/shared/button.component";
import Input from "@/components/shared/secondary-input.component";
import SelectPerformer from "@/components/ui/select-performer.component";
import SelectTagComponent from "@/components/ui/select-tag.component";
import { Form, Formik, FormikState } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useState } from "react";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";

type ChangePasswordProps = {
  currentPassword: string;
  newPassword: string;
}

const EditProfile = () => {
  const [isChangePassword, setChangePassword] = useState(false)


  function changePassword(props: ChangePasswordProps, resetForm: {
    (nextState?: Partial<FormikState<{
      currentPassword: string;
      newPassword: string;
    }>> | undefined): void; (): void;
  }) {
    setChangePassword(true)
    axiosInstance.patch(`${API_URL}/users/update-password`, { ...props })
      .then((res) => {
        resetForm()
        toast.success(res?.data?.message)
        setChangePassword(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Error Completing request. Try again later.')
        setChangePassword(false);
      })
  }
  return (
    <div className="flex mx-auto gap-y-8 flex-col md:w-standard">
      <div className="flex flex-wrap items-center gap-y-4 gap-x-11">
        <Image
          src={`/assets/images/user.png`}
          width={47}
          height={47}
          alt="user pfp"
        />
        <div className="flex items-center gap-x-6">
          <ButtonComponent>Change avatar</ButtonComponent>
          <p className="text-sm font-medium text-mauve underline cursor-pointer">
            Delete avatar
          </p>
        </div>
      </div>
      <Formik initialValues={{}}
        validationSchema={Yup.object({})}
        onSubmit={() => {}}>
        <Form className="space-y-7">
          <div className="flex flex-col gap-y-7 mt-4">
            <Input name="username" placeholder="@Current username" label="Username" />
            <Input name="bio"
              placeholder="Let your fellow videos fans know a bit about you..."
              label="Bio"
            />
            <div className="flex flex-col gap-y-4">
              <Input name="tags"
                placeholder="Start typing and pick your 3 favourite tags"
                label="Favorite Tags"
              />
              <SelectTagComponent />
            </div>
            <div className="flex flex-col gap-y-4">
              <Input name="performers"
                placeholder="Start typing and pick your 3 favourite performers"
                label="Favorite Performers"
              />
              <SelectPerformer />
            </div>
          </div>
          <ButtonComponent className="!w-fit m-auto">
            Save changes
          </ButtonComponent>
        </Form>
      </Formik>

      <Formik initialValues={{
        currentPassword: "",
        newPassword: "",
      }}
        validationSchema={Yup.object({
          currentPassword: Yup.string()
            .required("Required")
            .min(6, "Password must be 6 characters and above"),
          newPassword: Yup.string()
            .required("Required")
            .min(6, "Password must be 6 characters and above"),
        })}
        onSubmit={(values, { resetForm }) => {
          changePassword({ ...values }, resetForm);
        }}>
        <Form className="flex flex-col gap-y-4">
          <p className="text-sm text-center">Change password</p>
          <div className="space-y-7">
            <div className="flex flex-col gap-y-7">
              <Input type="password" name="currentPassword" placeholder="Current password" label="Current password" />
              <Input type="password" name="newPassword" placeholder="New password" label="New password" />
              {/* <Input placeholder="Confirm new password" label="Confirm new password" /> */}
            </div>
            <ButtonComponent loading={isChangePassword} disabled={isChangePassword} type="submit" className="!w-fit m-auto">
              Save changes
            </ButtonComponent>
          </div>
        </Form>
      </Formik>
      <div className="mt-20">
        <p className="text-sm text-mauve underline text-center">Delete your account</p>
      </div>
    </div>
  );
};

export default EditProfile;
