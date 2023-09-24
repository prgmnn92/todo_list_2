import React from "react";
import { format } from "date-fns";
import { SafeTask } from "@/app/types";

interface TaskOverviewProps {
  tasks: SafeTask[];
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ tasks }) => {
  if (!tasks) {
    return <div>You do not have any open tasks</div>;
  }
  return (
    <ul className="flex flex-row gap-4">
      {tasks?.map((task) => (
        <li
          key={task.id}
          className={
            "opacity-100 flex items-start py-5 gap-x-6 p-4 bg-white shadow-sm rounded justify-start "
          }
        >
          <div className="min-w-0">
            <div className="flex items-start gap-x-3">
              <p className={"text-sm font-semibold leading-6 text-gray-900"}>
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
                Due{" "}
                <time dateTime={task.dueAt!}>
                  {format(new Date(task.dueAt!), "PPP")}
                </time>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskOverview;
