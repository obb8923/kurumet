import { useState, useEffect } from "react";
import ListArticle from "./ListArticle";
import { useInView } from "react-intersection-observer";
import { useList, useActions } from "@/store/StateCon";
type listType = {
  name: string;
  food: string;
  stars: number;
  address: string;
  latlng: { lat: number; lng: number };
  youtube: string;
  youtubeEmbed: string;
};
export default function List() {
  const l = useList();
  const [items, setItems] = useState<listType[]>([]);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const [fragment, setFragment] = useState<React.ReactNode[]>([]);
  const [key, setKey] = useState<number>(0);

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
      setItems((prev) => data.listArray);
    }
    getincon();
  }, [l, ref]);

  useEffect(() => {
    if (inView && items.length > 0 && items[key]) {
      const newF = (
        <ListArticle
          key={`${key} - ${items[key].name}-${items[key].latlng}`}
          food={items[key].food}
          youtubeEmbedd={items[key].youtubeEmbed}
        ></ListArticle>
      );
      setKey((prev) => prev + 1);
      setFragment((prev) => [...prev, newF]);
    }
  }, [inView, fragment, items, key]);

  useEffect(() => {
    setFragment([]);
    setKey(0);
  }, [items]);

  return (
    <section className=" h-full w-full flex flex-col">
      {items.length == 0 && (
        <div
          className="bg-gray-200 w-96 h-96 flex justify-center items-center"
          style={{ width: "90vw", height: "90vh" }}
        >
          <small>선택된 프로그램이 없습니다.</small>
        </div>
      )}

      {items.length > 0 && (
        <>
          <div className="h-full w-full flex flex-wrap gap-8 justify-evenly">
            {fragment}
          </div>
          <div ref={ref} className="h-1"></div>
        </>
      )}
    </section>
  );
}
