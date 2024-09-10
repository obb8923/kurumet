import { useList } from "@/store/StateCon";
import YoutuberCon from "./youtuberCon";
import { useEffect } from "react";
const SelectedConList = () => {
  const l = useList();

  useEffect(() => {
    if (l.size == 0) {
    }
  }, [l]);
  return (
    <div className="w-full h-full flex gap-2 overflow-y-auto min-h-12 items-center">
      {l.size == 0 ? (
        <small>선택된 유튜버가 없습니다.</small>
      ) : (
        Array.from(l).map((item, index) => {
          return <YoutuberCon name={item} key={`${item}-${index}`} />;
        })
      )}
    </div>
  );
};
export default SelectedConList;
