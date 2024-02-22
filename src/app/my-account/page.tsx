"use client"

import ButtonComponent from "@/components/shared/button.component";
import ProfileTabComponent from "@/components/ui/my-profile-tab.component";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-y-10 gap-x-16 mt-8">
      <div className="flex-[0.6_1_0]">
        <div className="flex flex-col gap-y-[18px]">
          <div className="flex items-center gap-x-4">
            <img width={50} src="/assets/images/user.png" alt="user" />
            <div className="flex flex-col gap-y-1">
              <p className="text-pink text-sm">Username Goes here</p>
              <div className="flex items-center gap-x-5 justify-between">
                <p className="text-sm">
                  1.8k <span className="text-pink">followers</span>
                </p>
                <p className="text-sm">
                  1.4k <span className="text-pink">followers</span>
                </p>
              </div>
            </div>
          </div>

          <Link href={`/my-account/edit-profile`}><ButtonComponent className="w-full">Edit account</ButtonComponent></Link>
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-medium">Your bio</p>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>Your favorite tags</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-pink`}
                  />
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                ><Disclosure.Panel className="pb-2 pt-3" static>
                    <div className="flex flex-wrap items-center gap-4">
                      <ButtonComponent className="rounded-[20px]" variant="tags">
                        Big boobs
                      </ButtonComponent>
                      <ButtonComponent className="rounded-[20px]" variant="tags">
                        Brunette
                      </ButtonComponent>
                      <ButtonComponent className="rounded-[20px]" variant="tags">
                        Masturbation
                      </ButtonComponent>
                    </div>
                  </Disclosure.Panel></Transition>

              </>
            )}
          </Disclosure>

          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>Favorite performers</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-pink`}
                  />
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                ><Disclosure.Panel className="pb-2 pt-3" static>
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-x-2">
                        <img width={40} src="/assets/images/tori.png" alt="tori" />
                        <ButtonComponent className="rounded-[20px]" variant="tags">
                          Tori Black
                        </ButtonComponent>
                      </div>
                    </div>
                  </Disclosure.Panel></Transition>

              </>
            )}
          </Disclosure>

          <Disclosure>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex w-full justify-between text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                  <span>Stats</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''
                      } h-5 w-5 text-pink`}
                  />
                </Disclosure.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                ><Disclosure.Panel className="pb-2 pt-3" static>
                    <div className="text-sm flex flex-col gap-y-5">
                      <p>654 videos films watched</p>
                      <p>3 weeks longest streak (activity!)</p>
                      <span className="flex flex-col gap-y-3">
                        <p>Average rating based on 1.4k reviews</p>
                        <img src="/assets/images/average.png" width={100} alt="" />
                      </span>
                    </div>
                  </Disclosure.Panel></Transition>

              </>
            )}
          </Disclosure>
        </div>
      </div>
      <div className="flex-[2_1_0]">
      <ProfileTabComponent/>
      </div>
    </div>
  );
};

export default page;
