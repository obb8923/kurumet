import { useEffect } from "react";
import Router from "next/router";
import axios from "axios";

const LoginButton = () => {
  const handleLogin = () => {
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`;

    // 카카오 로그인 페이지로 리다이렉션
    window.location.href = KAKAO_AUTH_URL;
  };

  return <button onClick={handleLogin}>카카오로 로그인</button>;
};

export default LoginButton;
