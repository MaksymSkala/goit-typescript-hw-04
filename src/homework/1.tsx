import React, { useEffect, useRef, ReactNode } from "react";

// Визначте типи для пропсів
type Props = {
  children: ReactNode;
  onContentEndVisible: () => void;
};

// Ваш компонент
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef
  const endContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}