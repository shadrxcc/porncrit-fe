import React, { memo, useEffect, useState } from 'react'
import ButtonComponent from '../shared/button.component'
import AddSvg from '../shared/add.component'
import { AppDispatchType } from '@/services/config-store';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetUserList, selectLists } from '@/services/list-services/async-actions';
import LoaderComponent from '../shared/loader.component';
import { useRouter } from 'next/navigation';

const AddToListComponent = () => {
  const dispatch: AppDispatchType = useDispatch();
  const lists = useSelector(selectLists);
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setIsLoading(true)
    dispatch(asyncGetUserList()).finally(() => setIsLoading(false))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div className=''>
      <div className="flex items-center justify-between">
        <p className='text-brown text-sm font-extrabold'>Save video to...</p></div>
      {isLoading ? <LoaderComponent /> :
        <>
          <div className='flex flex-col gap-y-5'>
            <div className='flex mt-6 flex-col gap-y-[22px]'>
              <label htmlFor="watched" className="text-brown flex items-center gap-x-2.5 text-sm font-light">
                <input type="checkbox" name="watched" id="watched" />
                Watchlist
              </label>

              {lists?.map((list) => (
                <label htmlFor="watched" className="text-brown flex items-center gap-x-2.5 text-sm font-light"
                  key={list._id}>
                  <input type="checkbox" name="watched" id="watched" />
                  {list.title}
                </label>
              ))}
            </div>

            <hr className='border-none bg-mauve h-[1px]' />

            <div className='flex items-center justify-between'>
              <ButtonComponent onClick={() => router.push(`/lists/new`)} variant='secondary' className='!w-fit !text-pink !p-0'><AddSvg /> Create new list</ButtonComponent>
              <ButtonComponent className='!w-fit'>Done</ButtonComponent>
            </div>
          </div>
        </>}
    </div>
  )
}

export default memo(AddToListComponent);