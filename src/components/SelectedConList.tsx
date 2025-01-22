// StateCon에서 유튜버 리스트 상태를 가져오기 위한 훅을 임포트
import { useList } from "@/store/StateCon";
// 유튜버 컴포넌트 임포트
import YoutuberCon from "./youtuberCon";

const SelectedConList = () => {
  // 선택된 유튜버 리스트 상태 가져오기
  const l = useList();

  return (
    // 가로 스크롤이 가능한 유튜버 리스트 컨테이너
    <div className="w-auto h-full flex gap-4 overflow-y-auto min-h-12 items-center">
      {l.size == 0 ? (
        // 선택된 유튜버가 없을 경우 메시지 표시
        <small>선택된 유튜버가 없습니다.</small>
      ) : (
        // 선택된 유튜버 리스트를 매핑하여 YoutuberCon 컴포넌트로 렌더링
        Array.from(l).map((item, index) => {
          return <YoutuberCon program={item} programKor={item} key={`${item}-${index}`} isSelected={true}/>;
        })
      )}
    </div>
  );
};

export default SelectedConList;
