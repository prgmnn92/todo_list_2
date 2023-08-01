"use client";
import React, { useCallback } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { SafeProject, SafeUser } from "@/app/types";
import { format } from "date-fns";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

const statuses = {
  Complete: "text-green-400 bg-green-400/10 ring-green-500/10",
  "In Progress": "text-orange-600 bg-orange-50 ring-orange-500/10",
  "Not Started": "text-zinc-600 bg-zinc-50 ring-zinc-500/10",
};

interface ProjectListingProps {
  project: SafeProject;
  user: SafeUser;
}

const ProjectListing: React.FC<ProjectListingProps> = ({ project, user }) => {
  const router = useRouter();

  const deleteTask = useCallback(() => {
    axios
      .delete(`/api/project/${project.id}`)
      .then((res) => res)
      .catch((error) => console.log(error))
      .finally(() => {
        setTimeout(() => {
          router.refresh();
        }, 300);
      });
  }, [project, router]);

  return (
    <li
      key={project.id}
      className={`${
        project.status === "Complete" ? "opacity-[.4]" : "opacity-100"
      } flex items-center justify-between py-5 gap-x-6`}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-x-3">
          <span>
            <Image
              height={200}
              width={200}
              className="inline-block object-cover w-8 h-8 rounded-full"
              src={project.image || "/images/placeholder-image.jpg"}
              alt=""
            />
          </span>
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {project.name}
          </p>
          <p
            className={`
                ${
                  //@ts-ignore
                  statuses[project.status]
                } 
          rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset
        `}
          >
            {project.status}
          </p>
        </div>
        <div className="flex items-center mt-1 text-xs leading-5 text-gray-500 gap-x-2">
          <p className="whitespace-nowrap">
            Created at{" "}
            <time dateTime={project.createdAt}>
              {format(new Date(project.createdAt), "PPP")}
            </time>
          </p>
          <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>
          <p className="flex truncate">Created by {user.name}</p>
        </div>
      </div>
      <div className="flex items-center flex-none gap-x-4">
        <Link
          href={`/projects/${project.id}`}
          className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block cursor-pointer"
        >
          View project<span className="sr-only">, {project.name}</span>
        </Link>
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
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={deleteTask}
                    className={`
                  ${active ? "bg-gray-50" : ""}
                  "block px-3 py-1 text-sm leading-6 text-gray-900"
                `}
                  >
                    Delete
                    <span className="sr-only">, {project.name}</span>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
};

export default ProjectListing;
