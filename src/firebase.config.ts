'use client';

import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  // ... existing config ...
};

// 클라이언트 사이드에서만 초기화
let analytics = null;

if (typeof window !== 'undefined' && !getApps().length) {
  const app = initializeApp(firebaseConfig);
  // analytics 초기화를 조건부로 실행
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { analytics }; 