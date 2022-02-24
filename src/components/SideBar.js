import axios from "axios";
import React, { useEffect, useState, Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

export default function SideBar(props) {
  const { points, setCoordinates } = props;
  const [lastFetched, setLastFetched] = useState();
  const [selectedPoint, setselectedPoint] = useState(points[0]);
  const [query, setQuery] = useState("");

  const filteredPoints =
    query === ""
      ? points
      : points.filter((p) => {
          return p.country.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="flex flex-col justify-center space-y-10 p-10 mx-auto">
      <h1 className="text-6xl font-bold p-5 text-center">Hello World</h1>
      <div className="flex-1 mx-auto">
        <Combobox value={selectedPoint} onChange={setselectedPoint}>
          <div className="flex flex-row">
            <Combobox.Input
              className="w-full border-none focus:ring p-2 m-2 text-lg  bg-white rounded-lg shadow shadow-white text-gray-900"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(point) => point.country}
              placeholder="Go to..."
            />
            <Combobox.Button className="flex items-center pr-2">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <button
              className="p-2 bg-blue-400 self-center rounded-lg"
              onClick={() => setCoordinates(selectedPoint.coordinates)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className=" w-full p-2 m-2  text-lg bg-white rounded-lg shadow shadow-white ">
              {filteredPoints.length === 0 && query !== "" ? (
                <div className=" text-gray-900 p-2">No results</div>
              ) : (
                filteredPoints.map((point) => (
                  <Combobox.Option
                    key={point.id}
                    className={({ active }) =>
                      `  p-2  rounded-lg ${
                        active ? "text-black bg-blue-200" : "text-gray-900"
                      }`
                    }
                    value={point}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {point.country}
                        </span>
                        {selected ? (
                          <span
                            className={`flex items-center ${
                              active
                                ? "text-black bg-blue-200"
                                : "text-teal-600"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>
    </div>
  );
}
