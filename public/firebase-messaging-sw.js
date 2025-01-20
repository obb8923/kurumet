import { getMessaging, getToken } from "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  });
  
// Firebase Messaging 인스턴스를 가져와서
// 백그라운드 메시지를 처리할 수 있도록 합니다.
const messaging = getMessaging(firebaseApp);

// 등록 토큰을 가져옵니다. 처음에는 네트워크 호출이 발생하지만,
// 이후 getToken 호출은 캐시에서 반환됩니다.
getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY }).then((currentToken) => {
  if (currentToken) {
    // 필요한 경우 서버에 토큰을 보내고 UI를 업데이트합니다
    console.log('토큰: ', currentToken);
  } else {
    // 권한 요청 UI 표시
    console.log('사용 가능한 등록 토큰이 없습니다. 토큰 생성 권한을 요청하세요.');
  }
}).catch((err) => {
  console.log('토큰을 가져오는 중 오류가 발생했습니다. ', err);
});

// 수신 메시지 처리. 다음과 같은 경우에 호출됨:
// - 앱이 포커스를 가지고 있는 동안 메시지가 수신될 때
// - 사용자가 서비스 워커의 `messaging.onBackgroundMessage` 핸들러에 의해 
//   생성된 앱 알림을 클릭할 때
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});