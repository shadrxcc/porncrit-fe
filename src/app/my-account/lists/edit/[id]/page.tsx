"use client"

import ButtonComponent from "@/components/shared/button.component";
import CodeSvg from "@/components/shared/code.component";
import Input from "@/components/shared/secondary-input.component";
import SelectTagComponent from "@/components/ui/select-tag.component";
import Image from "next/image";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { EditList, SearchVideo, TagsType, VideoType } from "@/services/models/list.model";
import axiosInstance from "@/services/httpClient";
import { API_URL } from "@/services/utils";
import { toast } from "react-toastify";
import TextArea from "@/components/shared/text-area.component";
import { AppDispatchType } from "@/services/config-store";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetList, asyncGetListVideos, selectList, selectListVideos } from "@/services/list-services/async-actions";
import { useRouter } from "next/navigation";
import { asyncGetAllTags, selectAllTags } from "@/services/tags-services/async-actions";


type SuggestedTags = {
  createdAt?: string
  title?: string
  updatedAt?: string
  __v?: string
  _id?: string
}

const EditList = ({ params }: { params: { id: string } }) => {
  const [tag, setTag] = useState('');
  const [tagError, setTagError] = useState('');
  const [tags, setTags] = useState<Array<TagsType>>([]);
  const [suggestions, setSuggestions] = useState<SuggestedTags[]>([]);
  const [video, setVideo] = useState('');
  const [videos, setVideos] = useState<Array<VideoType>>([]);
  const [videoSuggestions, setVideoSuggestions] = useState<Array<Partial<SearchVideo>>>([]);
  const [isUpdating, setUpdating] = useState(false)
  const [noTags, setNoTags] = useState("");
  const [searchTag, setSearchTag] = useState(false)

  const dragVideo = useRef<number>(0)
  const dragOver = useRef<number>(0)



  function handleSort() {
    const newVideos = [...videos]
    const temp = newVideos[dragVideo.current]
    newVideos[dragVideo.current] = newVideos[dragOver.current]
    newVideos[dragOver.current] = temp
    setVideos(newVideos)
  }

  const id = params.id

  const dispatch: AppDispatchType = useDispatch();
  const list = useSelector(selectList);
  const listvideos = useSelector(selectListVideos);
  const alltags = useSelector(selectAllTags)
  const navigate = useRouter()

  useEffect(() => {
    dispatch(asyncGetList({ id }))
    dispatch(asyncGetListVideos({ id }))
    dispatch(asyncGetAllTags())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    const updatedVideos = listvideos?.map(video => ({
      id: video?._id,
      title: video?.title,
      image: video?.image,
    }));

    const updatedTags = list?.tags?.map(tag => ({
      tag: tag
    }));

    setTags(updatedTags);
    setVideos(updatedVideos);
  }, [listvideos]); //

  const deleteInputCharacter = (e: { key: string }) => {
    if (e.key === 'Backspace') {
      if (tag) {
        setTag(tag.slice(0, -1));
      }
    }
  };

  async function fetchVideos(searchTerm: string) {
    try {
      const res = await axiosInstance.get(`${API_URL}/videos/get-videos/${searchTerm}`);
      const videos = res?.data?.data
      return videos;
    } catch (err) {
      toast.error('Error fetching videos. Try again later.');
      throw err;
    }
  }

  const fetchVideosAndSetSuggestions = async (searchTerm: string) => {
    try {
      const fetchedVideos = await fetchVideos(searchTerm);
      setVideoSuggestions(fetchedVideos);
    } catch (error) {
      setVideoSuggestions([]);
    }
  };


  // handle input change
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (e.target.name === 'tags') {
      setTag(inputValue);
      setTagError('');
      setNoTags("")
      setSuggestions([]);
      if (inputValue.length > 0 && inputValue.trim() !== '') {
        setSearchTag(true)
        const filteredSuggestions = alltags.filter(tag => tag.title.toLowerCase().includes(inputValue.toLowerCase()));
        setSuggestions(filteredSuggestions);

        if (filteredSuggestions.length === 0) {
          setNoTags("Oooops! Looks like we couldn't find that tag.");
        }
      } else {
        setTag("")
        setSearchTag(false)
        setSuggestions([]);
      }
    }
  };

  const handleVideoSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (e.target.name === 'videos') {
      setVideo(inputValue);
      if (inputValue.length > 2) {
        fetchVideosAndSetSuggestions(inputValue);
      } else {
        setVideoSuggestions([]);
      }
    }
  };

  const handleSuggestionClick = (tag: string | undefined) => {
    if (tag) {
      setTags((prevTags) => [...prevTags, { tag }]);
      setTag('');
      setSuggestions([]);
    }
  };

  const handleVideoSuggestionClick = (video: Partial<SearchVideo>) => {
    if (video.title && video.image && video._id) {
      const newVideo = {
        title: video.title,
        image: video.image,
        id: video._id
      };

      setVideos((prevVideos) => [...prevVideos, newVideo]);
      setVideo('');
      setVideoSuggestions([]);
    }
  };

  const deleteVideo = (videoId: string) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== videoId));
  };

  const deleteTag = (tagtoDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.tag !== tagtoDelete));
  };

  function updateList(props: EditList) {
    setUpdating(true)
    axiosInstance.patch(`${API_URL}/list/update`, { ...props })
      .then((res) => {
        toast(res?.data?.message)
        navigate.back()
      })
      .catch((err) => {
        toast(err?.response?.data?.message || 'Error Completing request. Try again later.')
      }).finally(() => {
        setUpdating(false)
      })
  }


  return (
    <div className="flex md:w-standard mx-auto gap-y-8 flex-col">
      <h1 className="text-xl font-extrabold">Edit list</h1>
      <Formik initialValues={{
        title: list?.title,
        description: list?.description,
      }}
        validationSchema={Yup.object({
        })}
        onSubmit={(values) => {
          const params = {
            ...values, tags: tags.map((tag) => tag.tag), videos: videos.map((video) => video.id), listId: id
          };
          updateList(params);
        }}>
        <Form>
          <div className="space-y-7">
            <div className="flex flex-col gap-y-7 mt-4">
              <Input name="title"
                placeholder={list.title}
                label="List title"
              />
              <TextArea
                name="description"
                rows={4}
                placeholder={list.description}
                label="List description" />
              <div className="flex flex-col gap-y-4">
                <div className={`flex flex-col gap-y-3`}>
                  <label className="text-lg font-bold text-white" htmlFor="tags">Tags</label>
                  <input name="tags"
                    className={`px-4 bg-white text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}
                    placeholder="Start typing and pick up to 5 tags that describe your list..."
                    onChange={inputChange}
                    onKeyDown={(e) => {
                      deleteInputCharacter(e);
                    }}
                    value={tag}
                  />

                  {suggestions?.length > 0 ? <div className="bg-box mt-1 max-h-60 w-full flex flex-col gap-y-2 z-9 overflow-auto rounded-md py-2.5 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {suggestions.map((suggestion, index) => (
                      <div key={index} className="cursor-pointer p-2 hover:bg-gray-200" onClick={() => handleSuggestionClick(suggestion.title)}>
                        {suggestion?.title}
                      </div>
                    ))}
                  </div> : null}

                  {tag.trim() !== "" && noTags ? (
                    <div className="bg-box mt-1 w-full flex flex-col gap-y-2 z-9 overflow-auto rounded-md p-2.5 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      <p className="text-sm">{noTags}</p>
                    </div>
                  ) : null}

                  {tagError && <p className="text-red-500 text-sm">{tagError}</p>}
                </div>


                {tags?.length > 0 && (
                  <div className="flex items-center flex-wrap gap-3">
                    {tags.map((item: TagsType) => (
                      <SelectTagComponent key={item.tag} tag={item.tag} remove={() => deleteTag(item.tag)} />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-y-4">
                <div className={`flex flex-col gap-y-3`}>
                  <label className="text-lg font-bold text-white" htmlFor="tags">Add videos</label>
                  <input name="videos"
                    placeholder="Start typing and pick the videos you’d like to add..."
                    className={`px-4 bg-white text-mauve placeholder:text-mauve border-opacity-10 border border-white text-sm !outline-none focus:outline-none py-2.5 rounded-lg`}

                    onChange={handleVideoSearchChange}
                    onKeyDown={(e) => {
                      deleteInputCharacter(e);
                    }}
                    value={video}
                  />
                  {videoSuggestions?.length > 0 ?
                    <div className="bg-box mt-1 max-h-60 w-full flex flex-col gap-y-2 z-9 overflow-auto rounded-md py-2.5 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {videoSuggestions.map((suggestion) => (
                        <div key={suggestion._id} className="cursor-pointer flex items-center gap-2 p-2 hover:bg-gray-200" onClick={() => handleVideoSuggestionClick(suggestion)}>
                          <Image src={suggestion?.image || ""} width={100} height={100} alt={suggestion?.title || "loading"} />
                          <p className="text-sm text-mauve">{suggestion.title}</p>
                        </div>
                      ))}
                    </div> : null}

                  {tagError && <p className="text-red-500 text-sm">{tagError}</p>}
                </div>

                {videos?.length > 0 && (

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Videos</p>
                    <div className="flex flex-col gap-y-3">
                      {videos.map((video, index) => (
                        <div onDragStart={() => dragVideo.current = index}
                          onDragEnter={() => dragOver.current = index}
                          onDragEnd={handleSort}
                          onDragOver={(e) => e.preventDefault()} key={video?.id} className="flex flex-col py-3 gap-y-5 rounded-box bg-box px-[18px]">
                          <div className="flex items-center gap-x-3">
                            <Image
                              src={video?.image}
                              width={88}
                              height={50}
                              alt="threesome"
                            />
                            <p className="text-sm">{video?.title}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            <ButtonComponent type="button" onClick={() => deleteVideo(video.id)} className="xs:w-full !w-fit" variant="outline-pink">
                              Delete</ButtonComponent>
                            <ButtonComponent
                              draggable type="button" variant="secondary" className="!w-fit !p-0">
                              <CodeSvg />
                            </ButtonComponent>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
              <ButtonComponent loading={isUpdating} disabled={isUpdating} type="submit" className="!w-fit place-self-end">
                Save list
              </ButtonComponent>
            </div>
          </div>
        </Form>
      </Formik>


    </div>
  );
};

export default EditList;
