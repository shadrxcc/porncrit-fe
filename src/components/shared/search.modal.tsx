
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ButtonComponent from './button.component';
import ClosePinkSvg from './close-pink.component';
import SearchComponent from '../ui/search.component';


type ModalProps = {
    children?: React.ReactNode
    isOpen: boolean
    closeModal: () => void
};

export default function SearchModal(props: ModalProps) {

    const { isOpen, closeModal } = props;

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                <Dialog.Panel className="w-full gap-x-5 justify-between flex items-center transform space-y-2 overflow-hidden bg-body p-6 text-left align-middle shadow-xl transition-all">
                                    <div className="hidden lg:block"></div>
                                    <div className="w-full lg:w-2/4"><SearchComponent /></div>
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
