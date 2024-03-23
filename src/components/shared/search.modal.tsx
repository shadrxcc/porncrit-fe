"use client"


import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import ButtonComponent from './button.component';
import ClosePinkSvg from './close-pink.component';
import SearchComponent from '../ui/search.component';
import SearchSvg from './searchsvg.component';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


type ModalProps = {
    children?: React.ReactNode
    isOpen: boolean
    closeModal: () => void
};

export default function SearchModal(props: ModalProps) {

    const { isOpen, closeModal } = props;
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = async (e: React.KeyboardEvent) => {
        e.preventDefault();
        if (e.key === 'Enter') {
            if (searchQuery.trim() === '') {
                toast.error('A search term must be provided.')
            } else {
                router.push(`/search/${searchQuery}`)
                closeModal()
                setSearchQuery('')
            }
        }
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/65" />
                    </Transition.Child>

                    <div className="fixed inset-0">
                        <div className="flex text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full gap-x-5 justify-between flex items-center transform space-y-2 overflow-hidden bg-body border-b border-mauve-30 pt-5 pb-6 px-5 sm:px-9 text-left align-middle shadow-xl transition-all">
                                    <div className="hidden lg:block"></div>
                                    <div className="w-full lg:w-2/4">
                                        <div className={`flex justify-between gap-y-2 pl-[19px] w-full pr-2.5 bg-whitealpha-10 border border-mauve py-2.5 rounded-primary`}>
                                            {" "}
                                            <input
                                                className={`bg-transparent text-[#BDA7B1] text-sm  !outline-none w-full focus:outline-none`}
                                                value={searchQuery}
                                                onKeyUp={handleSearch}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                           <ButtonComponent className='!w-fit' variant='secondary'><SearchSvg /></ButtonComponent>
                                            
                                        </div></div>
                                    <ButtonComponent onClick={closeModal} variant="secondary" className="!p-0 !w-fit !border-0 float-right place-self-end !justify-end"><ClosePinkSvg /></ButtonComponent>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
