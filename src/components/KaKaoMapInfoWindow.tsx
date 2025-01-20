interface KaKaoMapInfoWindowProps {
  position: any;
  setInfoWindowState: React.Dispatch<React.SetStateAction<{ isOpen: boolean }[]>>;
  index: number;
}
const KaKaoMapInfoWindow = ({position, setInfoWindowState, index}: KaKaoMapInfoWindowProps) => {
  return (<div className="flex flex-col pb-4 gap-1 rounded">
    <iframe
      src={position.youtubeEmbed}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
    <div className="flex justify-between pt-2">
      <p className="pl-4 text-lg font-medium">{position.name}</p>
      <button
        className="pr-4"
        onClick={() => {
          setInfoWindowState((prev) =>
            prev.map((v, i) =>
              i === index ? { isOpen: false } : v
            )
          );
        }}
      >
        닫기
      </button>
    </div>
    <p className="pl-4 font-normal">{position.food}</p>
    <p className="pl-4">
      <a
        href={`https://map.kakao.com/link/map/${position.name},${position.latlng.lat},${position.latlng.lng}`}
        target="_blank"
        rel="nooppener noreferrer"
        className="hover:bg-gray-100 rounded-full"
      >
        카카오 지도에서 보기
      </a>
      <span>{"  |  "}</span>
      <a
        href={`https://map.kakao.com/link/to/${position.name},${position.latlng.lat},${position.latlng.lng}`}
        target="_blank"
        rel="nooppener noreferrer"
        className="hover:bg-gray-100 rounded-full"
      >
        길찾기
      </a>
    </p>
  </div>);
};

export default KaKaoMapInfoWindow;
