"use client";
import { Fragment, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { SafeTask } from "../types";

type DayType = {
  date: string;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  events: SafeTask[];
};

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface CalendarProps {
  tasks: SafeTask[];
  isWeek?: boolean;
}

const Calendar: React.FC<CalendarProps> = ({ tasks, isWeek }) => {
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMMM yyyy"));
  let firstDayOfMonth = parse(currMonth, "MMMM yyyy", new Date());

  const daysInMonth = isWeek
    ? eachDayOfInterval({
        start: startOfWeek(today),
        end: endOfWeek(today),
      })
    : eachDayOfInterval({
        start: startOfWeek(firstDayOfMonth),
        end: endOfWeek(endOfMonth(firstDayOfMonth)),
      });

  const getPrevMonth = () => {
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMMM yyyy"));
  };

  const getNextMonth = () => {
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMMM yyyy"));
  };

  const setCurrentMonthList = (daysInMonth: Date[]): DayType[] => {
    return daysInMonth.map((day: Date) => {
      const currentTasks = tasks.filter((task) =>
        isSameDay(new Date(task.dueAt || new Date()), day)
      );

      return {
        date: format(day, "yyyy-MM-dd"),
        isCurrentMonth: isSameMonth(
          day,
          parse(currMonth, "MMMM yyyy", new Date())
        ),
        isSelected: isToday(day) ? true : false,
        isToday: isToday(day),
        events: [...currentTasks],
      };
    });
  };
  const days = setCurrentMonthList(daysInMonth);
  const selectedDay = days.find((day) => day?.isSelected) || [];

  return (
    <div
      className={`
    ${isWeek ? "" : "lg:min-h-[90vh]"}
    ${isWeek ? "" : "lg:min-h-[90vh]"}
    lg:flex lg:h-full lg:flex-col`}
    >
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 lg:flex-none">
        {/* hide navigation for monthly view */}
        {!isWeek && (
          <>
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              <time dateTime="2022-01">{currMonth}</time>
            </h1>
            <div className="flex items-center">
              <div className="relative flex items-center bg-white rounded-md shadow-sm md:items-stretch">
                <div
                  className="absolute inset-0 rounded-md pointer-events-none ring-1 ring-inset ring-gray-300"
                  aria-hidden="true"
                />
                <button
                  type="button"
                  onClick={getPrevMonth}
                  className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-400 rounded-l-md hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setCurrMonth(() => format(today, "MMMM yyyy"))}
                  className="hidden px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
                >
                  Today
                </button>
                <span className="relative w-px h-5 -mx-px bg-gray-300 md:hidden" />
                <button
                  type="button"
                  onClick={getNextMonth}
                  className="flex items-center justify-center py-2 pl-4 pr-3 text-gray-400 rounded-r-md hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden md:ml-4 md:flex md:items-center">
                {/* <Menu as="div" className="relative">
              <Menu.Button
                type="button"
                className="flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Month view
                <ChevronDownIcon
                  className="w-5 h-5 -mr-1 text-gray-400"
                  aria-hidden="true"
                />
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
                <Menu.Items className="absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Day view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Week view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Month view
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700",
                            "block px-4 py-2 text-sm"
                          )}
                        >
                          Year view
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu> */}
                {/* <div className="w-px h-6 ml-6 bg-gray-300" />
            <button
              type="button"
              className="px-3 py-2 ml-6 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add event
            </button> */}
              </div>
              <Menu as="div" className="relative ml-6 md:hidden">
                <Menu.Button className="flex items-center p-2 -mx-2 text-gray-400 border border-transparent rounded-full hover:text-gray-500">
                  <span className="sr-only">Open menu</span>
                  <EllipsisHorizontalIcon
                    className="w-5 h-5"
                    aria-hidden="true"
                  />
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
                  <Menu.Items className="absolute right-0 z-10 mt-3 overflow-hidden origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Create event
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Go to today
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Day view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Week view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Month view
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            Year view
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </>
        )}
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px text-xs font-semibold leading-6 text-center text-gray-700 bg-gray-200 border-b border-gray-300 lg:flex-none">
          <div className="py-2 bg-white">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="py-2 bg-white">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="py-2 bg-white">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="py-2 bg-white">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="py-2 bg-white">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="py-2 bg-white">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="py-2 bg-white">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex text-xs leading-6 text-gray-700 bg-gray-200 lg:flex-auto">
          <div
            className={`
          ${isWeek ? "lg:grid-rows-1" : "lg:grid-rows-6"}
          hidden w-full lg:grid lg:grid-cols-7  lg:gap-px`}
          >
            {days.map((day) => (
              <div
                key={day.date}
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50 text-gray-500",
                  "relative px-3 py-2 min-h-[100px]"
                )}
              >
                <time
                  dateTime={day.date}
                  className={
                    day.isToday
                      ? "flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white"
                      : undefined
                  }
                >
                  {day.date.split("-").pop()?.replace(/^0/, "")}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <a
                          href={`/projects/${event.projectId}`}
                          className="flex group"
                        >
                          <p
                            className={`
                          ${
                            event.status === "Complete"
                              ? "text-green-600"
                              : "text-gray-900"
                          }
                          flex-auto font-medium  truncate group-hover:text-indigo-600`}
                          >
                            {event.name}
                          </p>
                          <time
                            //@ts-ignore
                            dateTime={event.dueAt}
                            className="flex-none hidden ml-3 text-gray-500 group-hover:text-indigo-600"
                          >
                            {event.dueAt}
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-gray-500">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div
            className={`
          ${isWeek ? "lg:grid-rows-1" : "lg:grid-rows-6"}
          grid w-full grid-cols-7 
          gap-px isolate lg:hidden`}
          >
            {days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={classNames(
                  day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                  (day.isSelected || day.isToday) && "font-semibold",
                  day.isSelected && "text-white",
                  !day.isSelected && day.isToday && "text-indigo-600",
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-900",
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    "text-gray-500",
                  "flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10"
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    day.isSelected &&
                      "flex h-6 w-6 items-center justify-center rounded-full",
                    day.isSelected && day.isToday && "bg-indigo-600",
                    day.isSelected && !day.isToday && "bg-gray-900",
                    "ml-auto"
                  )}
                >
                  {day.date.split("-").pop()?.replace(/^0/, "")}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-gray-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {
        //@ts-ignore
        selectedDay.events?.length > 0 && (
          <div className="px-4 py-10 sm:px-6 lg:hidden">
            <ol className="overflow-hidden text-sm bg-white divide-y divide-gray-100 rounded-lg shadow ring-1 ring-black ring-opacity-5">
              {
                //@ts-ignore
                selectedDay.events.map((event) => (
                  <li
                    key={event.id}
                    className="flex p-4 pr-6 group focus-within:bg-gray-50 hover:bg-gray-50"
                  >
                    <div className="flex-auto">
                      <p className="font-semibold text-gray-900">
                        {event.name}
                      </p>
                      <time
                        dateTime={event.datetime}
                        className="flex items-center mt-2 text-gray-700"
                      >
                        <ClockIcon
                          className="w-5 h-5 mr-2 text-gray-400"
                          aria-hidden="true"
                        />
                        {event.time}
                      </time>
                    </div>
                    <a
                      href={event.href}
                      className="self-center flex-none px-3 py-2 ml-6 font-semibold text-gray-900 bg-white rounded-md shadow-sm opacity-0 ring-1 ring-inset ring-gray-300 hover:ring-gray-400 focus:opacity-100 group-hover:opacity-100"
                    >
                      Edit<span className="sr-only">, {event.name}</span>
                    </a>
                  </li>
                ))
              }
            </ol>
          </div>
        )
      }
    </div>
  );
};

export default Calendar;
