"use client";
import React, { useState, useEffect, useRef } from "react";
import { useMapState, useActions } from "@/store/StateMap";

// 지도,리스트 상태를 정하는 드롭다운 컴포넌트
const Dropdown = () => {
  // 드롭다운 열림/닫힘 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  // 지도/리스트 상태값 가져오기
  const mapState = useMapState();
  // 상태 변경 액션 가져오기
  const { changeState } = useActions();
  // 드롭다운 요소에 대한 ref
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  
  // 드롭다운 외부 클릭 감지 핸들러
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // 외부 클릭 이벤트 리스너 등록 및 정리
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 드롭다운 토글 및 상태 변경 함수
  const toggleDropdown = (v: string) => {
    setIsOpen(!isOpen);
    if (v !== "") changeState(v);
  };

  return (
    <>
      {/* 드롭다운 버튼 */}
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className="relative my-2 bg-white hover:bg-gray-100 border border-gray-300 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => {
          toggleDropdown("");
        }}
      >
        {mapState}
        {/* 드롭다운 화살표 아이콘 */}
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        {/* 드롭다운 메뉴 */}
        {isOpen && (
          <div
            ref={dropdownRef}
            className="absolute text-start top-full right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              {/* 지도 메뉴 아이템 */}
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:textWhite"
                onClick={() => {
                  toggleDropdown("지도");
                }}
              >
                지도
              </li>
              {/* 리스트 메뉴 아이템 */}
              <li
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:textWhite"
                onClick={() => {
                  toggleDropdown("리스트");
                }}
              >
                리스트
              </li>
            </ul>
          </div>
        )}
      </button>
    </>
  );
};

export default Dropdown;
