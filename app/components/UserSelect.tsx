"use client";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { SafeUser } from "@/app/types";
import Button from "./Button";

interface UserSelectProps {
  users: SafeUser[];
  addUserAction: () => void;
  selectUser: Dispatch<SetStateAction<SafeUser>>;
  selectedUser: SafeUser;
}

const UserSelect: React.FC<UserSelectProps> = ({
  users,
  addUserAction,
  selectUser,
  selectedUser,
}) => {
  if (!users) {
    return <></>;
  }
  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <Listbox value={selectedUser} onChange={selectUser}>
        {({ open }) => (
          <>
            {/* <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
              Assigned to
            </Listbox.Label> */}
            <div className="relative">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                <span className="flex items-center">
                  <Image
                    src={selectedUser.image || "/images/placeholder.jpg"}
                    alt={selectedUser.name || ""}
                    width={200}
                    height={200}
                    className="flex-shrink-0 w-5 h-5 rounded-full"
                  />
                  <span className="block ml-3 truncate">
                    {selectedUser.name}
                  </span>
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 ml-3 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>

              <Transition
                show={open}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {users.map((person) => (
                    <Listbox.Option
                      key={person.id}
                      className={({ active }) => `
                        ${active ? "bg-indigo-600 text-white" : "text-gray-900"}
                        relative cursor-default select-none py-2 pl-3 pr-9`}
                      value={person}
                    >
                      {({ selected, active }) => (
                        <>
                          <div className="flex items-center">
                            <Image
                              src={person.image || "/images/placeholder.jpg"}
                              alt={person.name || ""}
                              height={200}
                              width={200}
                              className="flex-shrink-0 w-5 h-5 rounded-full"
                            />
                            <span
                              className={`
                              ${selected ? "font-semibold" : "font-normal"}
                              ml-3 block truncate`}
                            >
                              {person.name}
                            </span>
                          </div>

                          {selected ? (
                            <span
                              className={`
                              ${active ? "text-white" : "text-indigo-600"}
                              absolute inset-y-0 right-0 flex items-center pr-4`}
                            >
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </>
        )}
      </Listbox>

      <Button small label="Add User" onClick={addUserAction} />
    </div>
  );
};

export default UserSelect;
