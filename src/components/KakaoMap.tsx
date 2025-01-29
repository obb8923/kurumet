import { useEffect, useState } from "react";
import Script from "next/script";
import { useList } from "@/store/StateCon";
import { Map as KakaoMap, ZoomControl, MapMarker } from "react-kakao-maps-sdk";
import KaKaoMapInfoWindow from "./KaKaoMapInfoWindow";
import { listType } from "@/types/listType";
//프로필 이미지
import seongsikyeong from "../../public/profileImg/seongsikyeong.png";
import gonghyeokjun from "../../public/profileImg/gonghyeokjun.png";
import choeja from "../../public/profileImg/choeja.png";
import poongja from "../../public/profileImg/poongja.png";
import kimseki from "../../public/profileImg/kimseki.png";
import hongseokcheon from "../../public/profileImg/hongseokcheon.png";

function getProfileImg(program: string | undefined) :string {
  if (program === "seongsikyeong") return seongsikyeong.src;
  
  if (program === "gonghyeokjun") return gonghyeokjun.src;
  
  if (program === "choeja") return choeja.src;
  
  if (program === "poongja") return poongja.src;

  if (program === "kimseki") return kimseki.src;

  if (program === "hongseokcheon") return hongseokcheon.src;

  return seongsikyeong.src;
}

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

export default function KaKaoMap() {
  //전역 상태-선택된 유튭콘
  const l = useList();
  //마커를 만들 array
  const [items, setItems] = useState<listType[]>([]);
  //infowindow 열기 설정 array
  const [infoWindowState, setInfoWindowState] = useState(
    items?.map(() => ({ isOpen: false }))
  );

  //전역상태에 존재하는 유튭콘을 json파일과 비교하여
  //json파일의 list들을 가져옴
  //마커도 추가
  useEffect(() => {
    async function getincon() {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list: Array.from(l) }),
      };
      const res = await fetch("/api/inCon", options);
      const data = await res.json();
      console.log("listArray", data.listArray);
      setItems((prev) => data.listArray);
      setInfoWindowState(data.listArray.map(() => ({ isOpen: false })));
    }
    getincon();
  }, [l]);

  //인포윈도우 열기 닫기
  const handleMarkerClick = (index: number) => {
    setInfoWindowState((prev) =>
      prev.map((state, i) => ({
        ...state,
        isOpen: i === index ? !state.isOpen : false,
      }))
    );
  };

 
  return (
    <section className="w-full h-full">
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <KakaoMap
        center={{ lat: 37.574187, lng: 126.976882 }} //위도(latitude), 경도(longitude)
        style={{ width: "100%", height: "100%" }}
        level={10}
        
      >
       
        <ZoomControl position={"RIGHT"} />
        {items.map((position, index) => (
          <MapMarker
            key={`${position.name} - ${position.latlng} - ${position.youtubeEmbed}`}
            position={position.latlng}
            title={position.name}
            clickable={true} // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
            onClick={() => handleMarkerClick(index)}
            image={{
              src: getProfileImg(position.program),
              size: {
                width: 34,
                height: 34, 
              },
              options: {
                offset: {
                  x: 17, // 중앙 정렬을 위해 수정
                  y: 17, // 중앙 정렬을 위해 수정
                },
                shape: 'circle', // 원형 모양 지정
              },
            }}
          >
            {infoWindowState[index].isOpen && (
              <KaKaoMapInfoWindow position={position} setInfoWindowState={setInfoWindowState} index={index} />
            )}
          </MapMarker>
        ))}
      </KakaoMap>
    </section>
  );
}
