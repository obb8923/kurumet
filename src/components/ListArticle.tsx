type propsType = {
  food: string;
  youtubeEmbedd: string;
};

export default function ListArticle({ food, youtubeEmbedd }: propsType) {
  return (
    <article className="flex flex-col">
      <iframe
        src={youtubeEmbedd}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <p>{food}</p>
    </article>
  );
}
