import { useEffect, useState } from 'react';

// PWA 설치 프롬프트 이벤트 타입 정의
declare global {
  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
    prompt(): Promise<void>;
  }
}

const PWAInstallPrompt = () => {
  // PWA 설치 프롬프트 상태 관리
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // PWA 설치 프롬프트 이벤트 핸들러
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  // PWA 설치 버튼 클릭 핸들러
  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('사용자가 설치를 수락했습니다');
      } else {
        console.log('사용자가 설치를 거부했습니다');
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  return (
    showPrompt && (
      <div className="install-banner">
        <p>더 나은 사용 경험을 위해 앱을 설치해주세요.</p>
        <button onClick={handleInstallClick}>설치하기</button>
      </div>
    )
  );
};

export default PWAInstallPrompt;