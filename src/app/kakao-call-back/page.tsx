"use client";
import { Suspense, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const KakaoCallbackComponent = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      const fetchAccessToken = async () => {
        try {
          const authorizationCode = code;

          // 액세스 토큰 요청
          const params = new URLSearchParams();
          params.append("grant_type", "authorization_code");
          params.append("client_id", process.env.NEXT_PUBLIC_KAKAO_RESTAPI_KEY || "");
          params.append("redirect_uri", process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || "");
          params.append("code", authorizationCode || "");

          const tokenResponse = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            params.toString(),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          const accessToken = tokenResponse.data.access_token;
          console.log("Access Token:", accessToken);

          // 사용자 정보 요청
          const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log("User Info:", userResponse.data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error(
              "Failed to fetch access token or user info:",
              error.response?.data || error.message
            );
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      };

      fetchAccessToken();
    }
  }, [code]);

  return <div>로그인 중...</div>;
};

const KakaoCallback = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KakaoCallbackComponent />
    </Suspense>
  );
};

export default KakaoCallback;
