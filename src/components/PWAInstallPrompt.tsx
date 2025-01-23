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
      <div className="fixed left-1/2 top-[30%] -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 w-[90%] max-w-sm z-[1000]">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-medium">앱 설치 안내</p>
          <button 
            onClick={() => setShowPrompt(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <p className="text-gray-600 mb-4">더 나은 사용 경험을 위해 앱을 설치할 수 있습니다.</p>
        <button 
          onClick={handleInstallClick}
          className="w-full text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center"
        >
          설치하기
        </button>
      </div>
    )
  );
};

export default PWAInstallPrompt;