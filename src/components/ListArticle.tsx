import { useState } from "react";

type propsType = {
  name: string;
  food: string;
  youtubeEmbedd: string;
};

export default function ListArticle({ name, food, youtubeEmbedd }: propsType) {
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Extract the video ID from the YouTube embed URL
  const videoId = youtubeEmbedd.split("/").pop();
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  const handleThumbnailClick = () => {
    setIsVideoVisible(true);
  };

  return (
    <article className="flex flex-col w-full max-w-md">
      {isVideoVisible ? (
        <iframe
          src={youtubeEmbedd}
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="w-full h-64"
        />
      ) : (
        <img
          src={thumbnailUrl}
          alt="YouTube Thumbnail"
          onClick={handleThumbnailClick}
          className="w-full h-64 cursor-pointer object-cover"
        />
      )}
      <p>{name}</p>
      <p>{food}</p>
    </article>
  );
}
