import { useState, useEffect } from "react";
import SelectedConList from "./SelectedConList";
import EveryConList from "./EveryConList";
const AddConButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 모달이 열리면 바깥 스크롤이 작동하지 않도록 한다.
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // 컴포넌트가 언마운트될 때 overflow 속성을 원래대로 돌려놓기
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="w-full h-full">
      <button
        className=" w-full gap-2 text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        유튜버 추가하기
      </button>
      {/* modal section */}
      {/* <!-- Main modal --> */}
      {isOpen && (
        <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="fixed inset-0 flex justify-center items-center w-full bg-black bg-opacity-50">
            {/* <!-- Modal content --> */}
            <div className="bg-white rounded-lg shadow dark:bg-gray-700 w-4/5 lg:w-3/5">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  유튜버 리스트에 추가하기
                </h3>
                <button
                  type="button"
                  className="text-gray-800 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {/* <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg> */}
                  완료
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed ">선택된 유튜버 리스트</p>
                <SelectedConList />
                <hr />
                <p className="text-base leading-relaxed"> 전체 리스트 </p>
                <small>아래 유튜버를 클릭해 리스트에 추가해보세요</small>
                <EveryConList />
                <hr />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddConButton;
