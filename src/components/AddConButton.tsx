import { useState, useEffect } from "react";
import AddConModal from "./AddConModal";
import { useList } from "@/store/StateCon";
//유튜버 추가하기 버튼
const AddConButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const l  = useList();
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
    <div className="w-full h-full relative">
      <div className={`rounded-lg opacity-75 absolute inset-0 ${l.size === 0 && 'animate-ping-slow border border-red-500'}`} />
      <button
        className="relative w-full gap-2 text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        유튜버 추가하기
      </button>
      {/* modal section */}
      {/* <!-- Main modal --> */}
      {isOpen && (
        <AddConModal setIsOpen={setIsOpen}/>
      )}
    </div>
  );
};
export default AddConButton;
