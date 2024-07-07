"use client";
import React, { useState } from "react";
import { useMapState, useActions } from "@/store/StateMap";
export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const mapState = useMapState();
  const { changeState } = useActions();
  const toggleDropdown = (v: string) => {
    setIsOpen(!isOpen);
    if (v !== "") changeState(v);
  };

  return (
    <>
      {/* 버튼 */}
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          toggleDropdown("");
        }}
      >
        {mapState}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* 내용 */}
      {isOpen && (
        <div
          id="dropdown"
          className="absolute top-24 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                toggleDropdown("지도");
              }}
            >
              지도
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                toggleDropdown("리스트");
              }}
            >
              리스트
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
