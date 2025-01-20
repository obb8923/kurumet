'use client';

import { useEffect } from 'react';
import { analytics } from '../firebase.config';

export default function FirebaseAnalytics() {
  // Firebase 메시징 초기화 및 권한 요청 함수
  async function initializeMessaging() {
    try {
      // 런타임에서 필요한 모듈 동적 import
      const { getMessaging, getToken } = await import('firebase/messaging');
      const { getApps, initializeApp } = await import('firebase/app');

      // 환경 변수 유효성 검사
      const requiredEnvVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_VAPID_KEY'
      ];

      const missingEnvVars = requiredEnvVars.filter(key => !process.env[key]);
      if (missingEnvVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
      }

      // Firebase 설정
      const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
      };

      // 기존 앱이 없을 때만 초기화
      const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
      const messaging = getMessaging(app);

      // 알림 권한 요청
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        throw new Error('알림 권한이 거부되었습니다.');
      }

      // FCM 토큰 가져오기
      const token = await getToken(messaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
      });

      if (!token) {
        throw new Error('FCM 토큰을 가져올 수 없습니다.');
      }

      return token;

    } catch (error) {
      console.error('Firebase 메시징 초기화 실패:', error);
      // 에러 처리를 위한 사용자 피드백 로직 추가 가능
      return null;
    }
  }

  useEffect(() => {
    initializeMessaging();
  }, []);

  return null;
}
