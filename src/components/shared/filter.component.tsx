import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';
import { FC, Fragment } from 'react';

export type Data = {
    name: string;
    icon: React.ReactNode;
}

export type FilterProps = {
    data: Data[];
}

const FilterComponent: FC<FilterProps> = ({ data }) => {

    return (
        <div className="w-full">
            <Listbox>
                <div className="flex flex-col gap-y-2">
                    <div className="relative flex">
                        <Listbox.Button className="relative cursor-pointer text-left focus:outline-none text-sm">
                            <img src={`/assets/icons/Sort.svg`} height={24} width={24} alt='sort' />
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute max-h-60 w-40 z-20 overflow-auto  border border-mauve top-8 text-xs flex-col gap-y-4 bg-box rounded-box pl-3 pr-6 py-6">
                                {data.map((Data, DataIdx) => (
                                    <Listbox.Option
                                        key={DataIdx}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 ${active ? 'text-pink' : 'text-white'
                                            }`
                                        }
                                        value={Data.name}
                                    >
                                        {({ selected }) => (
                                            <>
                                                <div className='flex items-center justify-between'>
                                                    <div className='flex items-center gap-x-2'>
                                                        <span>
                                                            {Data.icon}
                                                        </span>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium text-pink' : 'font-normal'
                                                                }`}
                                                        >
                                                            {Data.name}
                                                        </span>
                                                    </div>

                                                    {selected ? (
                                                        <span className=" flex items-center pl-3 text-pink">
                                                            <CheckIcon
                                                                className="h-4 w-4"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </div>


                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </div>
            </Listbox>
        </div>
    );
};

export default FilterComponent;