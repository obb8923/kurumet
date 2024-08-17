"use client";
import { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useActions } from "@/store/StateCon";
import axios from "axios";
type searchType = {
  search: string;
};
export default function Search() {
  const { pushList, popList, findList } = useActions();
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [toggleSellected, setToggleSellected] = useState("카테고리");
  const [searchResult, setSearchResult] = useState("");
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);
  const [isSearchError, setIsSearchError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  // MouseEvent 타입으로 명시하고, event.target을 Node로 단언
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsToggleOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<searchType>();

  const onSubmit: SubmitHandler<searchType> = async (formData) => {
    if (toggleSellected === "카테고리") return;
    try {
      const response = await axios.post("/api/search", formData);
      setIsSearchError(false);
      setSearchResult(response.data.program);
    } catch (e) {
      setSearchResult("검색에 실패했습니다.");
      setIsSearchError(true);
      console.log(e);
    } finally {
      setIsSearchResultOpen(true);
    }
  };

  //   카테고리,검색결과 둘 중 하나만 열리도록 제어
  useEffect(() => {
    console.log("토글", isToggleOpen);
    if (isToggleOpen) setIsSearchResultOpen(false);
  }, [isToggleOpen]);
  useEffect(() => {
    console.log("검색", isSearchResultOpen);
    if (isSearchResultOpen) setIsToggleOpen(false);
  }, [isSearchResultOpen]);

  const toggleDropdown = (v: string) => {
    setIsToggleOpen(!isToggleOpen);
    if (v !== "") setToggleSellected(v);
  };
  return (
    <div className="w-full flex flex-col">
      <form className="w-full mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          ></label>
          {/* 카테고리 선택 */}
          <button
            id="dropdown-button"
            onClick={() => {
              toggleDropdown("");
            }}
            data-dropdown-toggle="#dropdown"
            className="relative flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200  focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            {toggleSellected}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
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
            {/* 카테고리 내용 */}
            {isToggleOpen && (
              <div
                id="dropdown"
                ref={dropdownRef}
                className="absolute top-full left-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdown-button"
                >
                  <li
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      toggleDropdown("프로그램 이름");
                    }}
                  >
                    프로그램 이름
                  </li>
                  <li
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      toggleDropdown("지역명");
                    }}
                  >
                    지역명
                  </li>
                </ul>
              </div>
            )}
          </button>

          <div className="relative w-full">
            {/* 검색 */}
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300  focus:outline-none  dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="검색"
              {...register("search", {
                required: "검색어를 입력해주세요",
              })}
              aria-invalid={
                isSubmitted ? (errors.search ? true : false) : undefined
              }
            />

            {/* 검색 결과 */}
            {isSearchResultOpen && (
              <div className="absolute top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 hover:rounded-lg dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setIsSearchResultOpen(false);
                    if (!isSearchError)
                      findList(searchResult)
                        ? popList(searchResult)
                        : pushList(searchResult);
                  }}
                >
                  {searchResult}
                </button>
              </div>
            )}
            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-white rounded-e-lg border border-gray-300 hover:bg-gray-100 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      {isSubmitted && toggleSellected === "카테고리" && (
        <small>카테고리를 선택해 주세요</small>
      )}
      {errors.search && toggleSellected !== "카테고리" && (
        <small role="alert">{errors.search.message}</small>
      )}
    </div>
  );
}
