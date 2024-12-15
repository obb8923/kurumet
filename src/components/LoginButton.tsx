"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

const LoginButton = () => {
  const [id, setId] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setImage(localStorage.getItem("profile_image"));
  }, []);

  const handleLogin = () => {
    if(id) {
      // 로그인된 상태에서의 동작
    } else {
      // 카카오 로그인 페이지로 리다이렉션
      const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;
      window.location.href = KAKAO_AUTH_URL;
    }
  };

  return (id ? <div onClick={handleLogin} className="hover:cursor-pointer">
    <Image src={image || ''} alt="profile" 
    className="rounded-full w-8 h-8 bg-gray-300 object-cover"
    width={32} height={32} />
  </div> : <button onClick={handleLogin}>카카오로 로그인</button>);
};

export default LoginButton;
