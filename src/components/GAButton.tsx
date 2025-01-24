"use client";

import { GA_CTA_EVENT } from "@/constants/GA_CTA_EVENTS";
import { sendGAEvent, sendGTMEvent } from "@next/third-parties/google";

type GAButtonProps = {
  children: React.ReactNode;
  eventLabel: GA_CTA_EVENT;
} & React.HTMLAttributes<HTMLButtonElement>;

export default function GACta({
  children,
  className,
  eventLabel,
  onClick,
  ...rest
}: GAButtonProps) {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    sendGAEvent("event", eventLabel);  // GA4에 이벤트 전송
    sendGTMEvent("event", eventLabel);  // GTM에 이벤트 전송
    if (onClick) {
      onClick(e);
    }
  }

  return (
    <button type="button" onClick={handleClick} className={className} {...rest}>
      {children}
    </button>
  );
}