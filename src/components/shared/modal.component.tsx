
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import ButtonComponent from './button.component';
import ClosePinkSvg from './close-pink.component';


type ModalProps = {
  children: React.ReactNode
  isOpen: boolean
  closeModal: () => void
};

export default function MyModal(props: ModalProps) {

  const { children, isOpen, closeModal } = props;

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
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-sm w-full transform mx-2.5 space-y-2 overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <ButtonComponent onClick={closeModal} variant="secondary" className="!p-0 !w-fit float-right place-self-end !justify-end"><ClosePinkSvg /></ButtonComponent>
                  {children}

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
