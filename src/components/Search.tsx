"use client";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useActions } from "@/store/StateCon";

type searchType = {
  search: string;
};
export default function Search() {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [togleSelected, setTogleSelected] = useState("카테고리");
  const [searchResult, setSearchResult] = useState("");
  const [isSearchResultOpen, setIsSearchResultOpen] = useState(false);
  const { pushList, popList, findList } = useActions();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm<searchType>();
  const onSubmit: SubmitHandler<searchType> = async (formData) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/api/search", options);
    const data = await res.json();
    if (data.message === "found") setSearchResult(data.program);
    setIsSearchResultOpen(true);
  };
  //   카테고리,검색결과 둘 중 하나만 열리도록 제어
  useEffect(() => {
    if (isToggleOpen) setIsSearchResultOpen(false);
  }, [isToggleOpen]);
  useEffect(() => {
    if (isSearchResultOpen) setIsToggleOpen(false);
  }, [isSearchResultOpen]);
  return (
    <div className="flex flex-col">
      <form className="max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          ></label>
          {/* 카테고리 선택 */}
          <button
            id="dropdown-button"
            onClick={() => {
              setIsToggleOpen((prev) => !prev);
            }}
            data-dropdown-toggle="#dropdown"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200  focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            {togleSelected}
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
          </button>
          {/* 카테고리 토글 */}
          {isToggleOpen && (
            <div
              id="dropdown"
              className="absolute top-12 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={(e) => {
                      setIsToggleOpen((prev) => !prev);
                      setTogleSelected("프로그램 이름");
                    }}
                  >
                    프로그램 이름
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      setIsToggleOpen((prev) => !prev);
                      setTogleSelected("지역명");
                    }}
                  >
                    지역명
                  </button>
                </li>
              </ul>
            </div>
          )}

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
              disabled={isSubmitting && togleSelected === "카테고리"}
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
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
      {errors.search && <small role="alert">{errors.search.message}</small>}
    </div>
  );
}
