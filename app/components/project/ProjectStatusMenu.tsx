"use client";
import React, { Fragment, useCallback } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { SafeProject } from "@/app/types";
import { STATUSES } from "@/app/statuses";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ProjectStatusMenuProps {
  project: SafeProject;
}

const ProjectStatusMenu: React.FC<ProjectStatusMenuProps> = ({ project }) => {
  const router = useRouter();
  const updateStatus = useCallback(
    (status: string) => {
      axios
        .put(`/api/project/${project.id}`, { status: status })
        .then((res) => res)
        .catch((error) => console.log(error))
        .finally(() => router.refresh());
    },
    [project, router]
  );
  return (
    <Menu as="div" className="relative flex-none">
      <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
        <span className="sr-only">Open options</span>
        <EllipsisVerticalIcon className="w-5 h-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-32 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
          {Object.keys(STATUSES).map((key) => {
            return (
              <Menu.Item key={key}>
                <a
                  href="#"
                  onClick={
                    //@ts-ignore
                    () => updateStatus(STATUSES[key])
                  }
                  className={` bg-gray-50 block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer
          `}
                >
                  {
                    //@ts-ignore
                    STATUSES[key]
                  }
                  <span className="sr-only">, {project.name}</span>
                </a>
              </Menu.Item>
            );
          })}
          {/* <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`
        ${active ? "bg-gray-50" : ""}
        block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer
      `}
              >
                Edit
                <span className="sr-only">, {project.name}</span>
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={`
        ${active ? "bg-gray-50" : ""}
        "block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
      `}
              >
                Delete
                <span className="sr-only">, {project.name}</span>
              </a>
            )}
          </Menu.Item> */}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProjectStatusMenu;
