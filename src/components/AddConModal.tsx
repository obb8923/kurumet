import SelectedConList from "./SelectedConList";
import EveryConList from "./EveryConList";
import { useList } from "@/store/StateCon";
const AddConModal = ({setIsOpen}: {setIsOpen: (isOpen: boolean) => void}) => {
  const l = useList();
  return (
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
          <small className={`${l.size === 0 && 'animate-pulse'}`}>아래 유튜버를 클릭해 리스트에 추가해보세요</small>
          <EveryConList />
          <hr />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddConModal;
