"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { useList, useActions } from "@/store/StateCon";
import { Map as KakaoMap, ZoomControl, MapMarker } from "react-kakao-maps-sdk";
import gonghyeokjun from "@/../public/list/gonghyeokjun.json";
import seongsikyeong from "@/../public/list/seongsikyeong.json";
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;
type listType = {
  name: string;
  food: string;
  stars: number;
  latlng: { lat: number; lng: number };
  youtube: string;
  youtubeEmbed: string;
};
export default function KaKaoMap() {
  const { findList } = useActions();
  //전역 상태-선택된 유튭콘
  const l = useList();
  console.log(l);
  //마커를 만들 array
  const [items, setItems] = useState<listType[]>([]);
  //program명과 list로 구성된 Map - 비교용도
  const [list, setList] = useState<Map<string, listType[]>>();
  //infowindow 열기 설정 array
  const [infoWindowState, setInfoWindowState] = useState(
    items?.map(() => ({ isOpen: false }))
  );
  useEffect(() => {
    //initial 값으로 모든 program의 정보를 Map에 저장
    setList((prev) => {
      const tmpMap = new Map(prev);
      tmpMap.set(gonghyeokjun.program, gonghyeokjun.list);
      tmpMap.set(seongsikyeong.program, seongsikyeong.list);
      return tmpMap;
    });
  }, []);
  useEffect(() => {
    //모든 program의 이름으로 전역상태 검사, 같은게 있다면 items에 저장
    const newItems: listType[] = [];
    list?.forEach((value, key) => {
      if (findList(key)) {
        value.forEach((v) => {
          newItems.push(v);
        });
      }
    });
    setItems(newItems);
    //items 에 인포위도우 isOpen값 연결
    setInfoWindowState(newItems.map(() => ({ isOpen: false })));
  }, [l]);

  const handleMarkerClick = (index: number) => {
    setInfoWindowState((prev) =>
      prev.map((state, i) => ({
        ...state,
        isOpen: i === index ? !state.isOpen : false,
      }))
    );
  };
  return (
    <section>
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
          >
            {infoWindowState[index].isOpen && (
              <div className="p-3 h-auto">
                <p>이름: {position.name}</p>
                <p>음식: {position.food}</p>
                <p>별점: {position.stars}</p>
                <iframe
                  width="auto"
                  height="auto"
                  src={position.youtubeEmbed}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </MapMarker>
        ))}
      </KakaoMap>
    </section>
  );
}
