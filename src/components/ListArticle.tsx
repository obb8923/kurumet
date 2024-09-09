type propsType = {
  name: string;
  food: string;
  youtubeEmbedd: string;
};

export default function ListArticle({ name, food, youtubeEmbedd }: propsType) {
  return (
    <article className="flex flex-col">
      <iframe
        src={youtubeEmbedd}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <p>{name}</p>
      <p>{food}</p>
    </article>
  );
}
