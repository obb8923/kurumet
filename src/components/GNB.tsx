"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function GNB() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginStatus = sessionStorage.getItem("id");
    console.log();
    if (loginStatus?.length != undefined) {
      setIsLogin(true);
    }
  }, []);

  return (
    <nav className="flex p-8 gap-10 shadow">
      <Link href="/">logo</Link>
      {isLogin ? (
        <Link href="/posting">글쓰기</Link>
      ) : (
        <Link href="/login">로그인</Link>
      )}
    </nav>
  );
}
