import Script from "next/script";
import { Map, ZoomControl, MapMarker } from "react-kakao-maps-sdk";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

export default function KaKaoMap() {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 37.574187, lng: 126.976882 }} //위도(latitude), 경도(longitude)
        style={{ width: "100%", height: "100%" }}
        level={10}
      >
        <ZoomControl position={"RIGHT"} />
        <MapMarker // 마커를 생성합니다
          position={{
            // 마커가 표시될 위치입니다
            lat: 37.574187,
            lng: 126.976882,
          }}
        />
      </Map>
    </>
  );
}
