import { useState, useEffect } from "react";
import ListArticle from "./ListArticle";
import { useInView } from "react-intersection-observer";
import { useList } from "@/store/StateCon";

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

  // API에서 데이터 가져오는 함수
  const fetchItems = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list: Array.from(l) }),
      };
      const res = await fetch("/api/inCon", options);
      const data = await res.json();
      setItems(data.listArray);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [l]);

  useEffect(() => {
    if (inView && items.length > 0 && items[key]) {
      const newFragment = (
        <ListArticle
          key={`${key} - ${items[key].name}-${items[key].latlng}`}
          name={items[key].name}
          food={items[key].food}
          youtubeEmbedd={items[key].youtubeEmbed}
        />
      );
      setFragment((prev) => [...prev, newFragment]);
      setKey((prev) => prev + 1);
    }
  }, [inView, items, key]);

  useEffect(() => {
    setFragment([]);
    setKey(0);
  }, [items]);

  return (
    <section className="h-full w-full flex flex-col">
      {items.length === 0 && (
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
