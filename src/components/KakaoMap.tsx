"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { useStore } from "@/store/StateCon";
import { Map as KakaoMap, ZoomControl, MapMarker } from "react-kakao-maps-sdk";
import hj from "@/../public/hj.json";
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
  const { findList } = useStore();
  const [listState, setListState] = useState(useStore.getState().list);
  const [items, setItems] = useState<listType[]>([]);
  const [list, setList] = useState<Map<string, listType[]>>();
  useStore.subscribe((state) => {
    console.log("!!", state);
  });
  useEffect(() => {
    console.log("2@", listState);
  }, [listState]);
  useEffect(() => {
    setList((prev) => new Map(prev).set(hj.program, hj.list));
    list?.forEach((value, key) => {
      if (findList(key)) setItems((prev) => [...prev, value[0]]);
    });
  }, []);
  useEffect(() => {
    console.log(">>\n", items, "\n", list);
  }, [items, list]);
  const [infoWindowState, setInfoWindowState] = useState(
    items.map(() => ({ isOpen: false }))
  );
  const handleMarkerClick = (index: number) => {
    setInfoWindowState((prev) =>
      prev.map((state, i) => ({
        ...state,
        isOpen: i === index ? !state.isOpen : false,
      }))
    );
  };
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <KakaoMap
        center={{ lat: 37.574187, lng: 126.976882 }} //위도(latitude), 경도(longitude)
        style={{ width: "100%", height: "100%" }}
        level={10}
      >
        <ZoomControl position={"RIGHT"} />
        {items.map((position, index) => (
          <MapMarker
            key={`${position.name} - ${position.latlng}`}
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
    </>
  );
}
