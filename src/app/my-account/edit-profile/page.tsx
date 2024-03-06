"use client"

import ButtonComponent from "@/components/shared/button.component";
import Input from "@/components/shared/secondary-input.component";
import SelectPerformer from "@/components/ui/select-performer.component";
import SelectTagComponent from "@/components/ui/select-tag.component";
import { Form, Formik, FormikState } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser, selectIsAuthenticated } from "@/services/auth-services/selector";
import { getUserProfile } from "@/services/auth-services/async-actions";
import { PerformersType, TagsType } from "@/services/models/list.model";
import { UpdateProfile } from "@/services/models/user.model";
import { useRouter } from "next/navigation";

type ChangePasswordProps = {
  currentPassword: string;
  newPassword: string;
}

const EditProfile = () => {
  const [isChangePassword, setChangePassword] = useState(false)
  const [isAvatar, setAvatar] = useState(false)
  const dispatch: AppDispatchType = useDispatch()
  const user = useSelector(selectAuthUser);
  const [imgUrl, setUrl] = useState('');
  const inputFile = useRef<HTMLInputElement | null>(null);
  const [avatar, setDisplayImgUrl] = useState<string | undefined>('');
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<Array<TagsType>>([]);
  const [performer, setPerformer] = useState('');
  const [performers, setPerformers] = useState<Array<PerformersType>>([]);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)

  const isAuthenticated = useSelector(selectIsAuthenticated); // selector to get the authentication status
  const router = useRouter();

  // Check if the user is not authenticated and redirect to the homepage
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/'); 
    }
  }, [isAuthenticated, router]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tag) {
        const trimmedValue = tag.trim();
        if (trimmedValue !== '' && !tags.some((tags) => tags.tag === trimmedValue)) {
          setTags((prevValues) => [
            ...prevValues,
            { tag: String(trimmedValue) },
          ]);
          setTag('');
        }
      }

      if (performer) {
        const trimmedValue = performer.trim();
        if (trimmedValue !== '' && !performers.some((p) => p.performer === trimmedValue)) {
          setPerformers((prevPerformers) => [
            ...prevPerformers,
            { performer: String(trimmedValue) },
          ]);
          setPerformer('');
        }
      }
    }
  };

  const deleteInputCharacter = (e: { key: string }) => {
    if (e.key === 'Backspace') {
      if (tag) {
        setTag(tag.slice(0, -1));
      } else if (performer) {
        setPerformer(performer.slice(0, -1));
      }
    }
  };

  // handle input change
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (e.target.name === 'tags') {
      setTag(inputValue);
    } else if (e.target.name === 'performers') {
      setPerformer(inputValue);
    }
  };


  const onImagePickerClick = () => {
    inputFile && inputFile.current && inputFile.current.click();
  };

  const handleImageUpload = () => {
    if (inputFile.current && inputFile.current.files && inputFile.current.files[0]) {
      const file = inputFile.current.files[0];

      const maxFileSizeMB = 4;

      if (file.size <= maxFileSizeMB * 1024 * 1024) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onloadend = (event: ProgressEvent<FileReader>) => {
          const img = event.target?.result as string;
          setUrl(img);
        };
      } else {
      }
    }
  };


  function changeAvatar() {
    setAvatar(true)
    axiosInstance.patch(`${API_URL}/users/update-avatar`, { avatar: avatar?.split("base64,")[1] })
      .then((res) => {
        toast.success(res?.data?.message)
        setChangePassword(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message || 'Error Completing request. Try again later.')
        setAvatar(false);
      }).finally(() => {
        setAvatar(false);
      })
  }


  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (imgUrl) {
      setDisplayImgUrl(imgUrl);
    } else {
      setDisplayImgUrl(user?.avatar);
    }
  }, [user, imgUrl]);


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

  function updateProfile(props: UpdateProfile, resetForm: { (nextState?: Partial<FormikState<{ username: string; bio: string; }>> | undefined): void; (): void; }) {
    setIsUpdatingProfile(true)
    axiosInstance.patch(`${API_URL}/users/update-profile`, { ...props })
      .then((res) => {
        toast(res?.data?.message)
        resetForm()
        setTags([])
        setPerformers([])
        setIsUpdatingProfile(false);
      })
      .catch((err) => {
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
        setIsUpdatingProfile(false);
      })
  }


  return (
    <div className="flex mx-auto gap-y-8 flex-col md:w-standard">
      <div className="flex flex-wrap items-center gap-y-4 gap-x-11">
        <div className="relative flex items-center">
          <Image
            src={avatar || `/assets/images/user.png`}
            width={60}
            className="object-cover w-16 h-16 border-[2px] border-pink rounded-full"
            height={60}
            alt="user pfp"
            priority={true}
          />
          <ButtonComponent onClick={onImagePickerClick} className="!p-1 -right-3 !w-fit absolute bottom-2">
            <input type='file' ref={inputFile} id='file' style={{ display: 'none' }} name="avatar"
              accept="image/*" onChange={handleImageUpload} />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
          </ButtonComponent>
        </div>

        <div className="flex items-center gap-x-6">
          <ButtonComponent onClick={changeAvatar} loading={isAvatar} disabled={isAvatar}>Change avatar</ButtonComponent>
          <p className="text-sm font-medium text-mauve underline cursor-pointer">
            Delete avatar
          </p>
        </div>
      </div>
      <Formik initialValues={{
        username: "",
        bio: ""
      }}
        validationSchema={Yup.object({})}
        onSubmit={(values, { resetForm }) => {
          const params = {
            ...values,
            performers: performers.map((performer) => performer.performer),
            tags: tags.map((tag) => tag.tag)
          }
          updateProfile(params, resetForm);
        }}>
        <Form className="space-y-7">
          <div className="flex flex-col gap-y-7 mt-4">
            <Input name="username" placeholder={`@${user?.username}`} label="Username" />
            <Input name="bio"
              placeholder="Let your fellow videos fans know a bit about you..."
              label="Bio"
            />
            <div className="flex flex-col gap-y-4">
              <div className={`flex flex-col gap-y-3`}>
                <label className="text-lg font-bold text-white" htmlFor="tags">Favorite Tags</label>
                <input name="tags"
                  className={`px-4 bg-white text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                  placeholder="Start typing and pick your 3 favourite tags"
                  onChange={inputChange}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    handleKeyPress(e);
                    deleteInputCharacter(e);
                  }}
                  value={tag}
                />
              </div>

              {tags?.length > 0 && (

                <div className="flex items-center flex-wrap gap-3">
                  {tags.map((item: TagsType) => (
                    <SelectTagComponent key={item.tag} tag={item.tag} />
                  ))}
                </div>
              )}

            </div>
            <div className="flex flex-col gap-y-4">
              <div className={`flex flex-col gap-y-3`}>
                <label className="text-lg font-bold text-white" htmlFor="performers">Favorite Performers</label>
                <input name="performers"
                  className={`px-4 bg-white text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                  placeholder="Start typing and pick your 3 favourite performers"
                  onChange={inputChange}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    handleKeyPress(e);
                    deleteInputCharacter(e);
                  }}
                  value={performer}
                />
              </div>
              {performers?.length > 0 && (

                <div className="flex items-center flex-wrap gap-3">
                  {performers.map((item: PerformersType) => (
                    <SelectPerformer key={item.performer} performer={item.performer} />
                  ))}
                </div>
              )}
            </div>
          </div>
          <ButtonComponent loading={isUpdatingProfile} disabled={isUpdatingProfile} type="submit" className="!w-fit m-auto">
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
