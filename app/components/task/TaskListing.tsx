"use client";
import React, { useCallback, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { SafeTask } from "@/app/types";
import { format } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
import Skeleton from "../Skeleton";
import useTaskEditModal from "@/app/hooks/useTaskEditModal";

//TODO: add loading state

interface TaskListingProps {
  task: SafeTask;
}

const TaskListing: React.FC<TaskListingProps> = ({ task }) => {
  const router = useRouter();
  const taskEditModal = useTaskEditModal();

  const [isLoading, setIsLoading] = useState(false);

  const toggleTaskStatus = useCallback(() => {
    setIsLoading(true);
    axios
      .put(`/api/task/${task.id}`, {
        status: task.status === "Complete" ? "Not started" : "Complete",
      })
      .then((res) => res)
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      });
  }, [task, router]);

  const deleteTask = useCallback(() => {
    setIsLoading(true);
    axios
      .delete(`/api/task/${task.id}`)
      .then((res) => res)
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
        router.refresh();
      });
  }, [task, router]);

  if (isLoading) {
    return (
      <div className="py-5">
        <Skeleton />
      </div>
    );
  }

  return (
    <>
      <li
        key={task.id}
        className={`${
          task.status === "Complete" ? "opacity-[.4]" : "opacity-100"
        } flex items-center justify-between py-5 gap-x-6`}
      >
        <div className="min-w-0">
          <div className="flex items-start gap-x-3">
            <p
              className={`${
                task.status === "Complete" ? "line-through" : ""
              } text-sm font-semibold leading-6 text-gray-900`}
            >
              {task.name}
            </p>
          </div>
          <div className="flex items-start gap-x-3">
            <p className={`text-sm font-normal leading-6 text-gray-900`}>
              {task.description}
            </p>
          </div>
          <div className="flex items-center mt-1 text-xs leading-5 text-gray-500 gap-x-2">
            <p className="whitespace-nowrap">
              Created at{" "}
              <time dateTime={task.createdAt}>
                {format(new Date(task.createdAt), "PPP")}
              </time>
            </p>
          </div>
        </div>
        <div className="flex items-center flex-none gap-x-4">
          <div
            onClick={toggleTaskStatus}
            className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block cursor-pointer"
          >
            {task.status === "Complete"
              ? "Mark as unfinished"
              : "Mark as complete"}
            <span className="sr-only">, {task.name}</span>
          </div>
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
                      onClick={() => taskEditModal.onOpen(task)}
                      className={`
                  ${active ? "bg-gray-50" : ""}
                  block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer
                `}
                    >
                      Edit
                      <span className="sr-only">, {task.name}</span>
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      onClick={deleteTask}
                      className={`
                  ${active ? "bg-gray-50" : ""}
                  "block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer"
                `}
                    >
                      Delete
                      <span className="sr-only">, {task.name}</span>
                    </a>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </li>
    </>
  );
};

export default TaskListing;
