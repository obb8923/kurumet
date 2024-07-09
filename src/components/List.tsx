import { useState, useEffect } from "react";
import ListArticle from "./ListArticle";
import { useInView } from "react-intersection-observer";

export default function List() {
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [fragment, setFragment] = useState<React.ReactNode[]>([]);
  const [key, setKey] = useState<number>(0);
  useEffect(() => {
    if (inView && key < 100) {
      console.log(key, inView);
      setKey((prev) => prev + 1);
      const newF = (
        <ListArticle
          key={key}
          food="된찌"
          youtubeEmbedd="https://www.youtube.com/embed/Tzyt91TYjLA?si=WXAhPcXBp9CN5Anf"
        ></ListArticle>
      );
      setFragment((prev) => [...prev, newF]);
    }
  }, [inView, fragment]);

  return (
    <section className="bg-gray-200 h-full w-full">
      <div className="h-full w-full flex flex-wrap justify-evenly">
        {fragment}
      </div>
      <div ref={ref} className="h-10"></div>
    </section>
  );
}
