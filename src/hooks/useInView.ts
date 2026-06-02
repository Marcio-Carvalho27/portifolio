"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
