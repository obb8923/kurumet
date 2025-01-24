export const GA_CTA_EVENTS = {
    onClickBottomBannerCTA: "click_cta_bottom_banner",
    onClickListeningCTA: "click_cta_listening",
    onClickNavigationCTA: "click_cta_navigation",
    onClickGuideCTA: "click_cta_guide",
    onClickAppDownloadCTA: "click_cta_app_download",
  } as const;
  
  export type GA_CTA_EVENT = typeof GA_CTA_EVENTS[keyof typeof GA_CTA_EVENTS];

//   CTA는 "Call to Action"의 약자로, 
//   웹사이트나 앱에서 사용자를 특정 행동으로 유도하는 요소를 의미한다.
//   CTA는 보통 버튼, 링크, 배너 등의 형태로 나타나며, 
//   사용자가 원하는 목표를 달성하도록 유도하는 역할을 한다.