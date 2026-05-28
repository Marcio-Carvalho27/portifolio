import { useEffect, useRef } from "react";

export function useCountUp(
  target: number | null,
  duration = 1200,
  delay = 800
) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (target === null || !ref.current) return;

    const el = ref.current;

    const timeout = setTimeout(() => {
      let start = 0;
      const step = target / (duration / 16);

      const timer = setInterval(() => {
        start += step;

        if (start >= target) {
          el.textContent = target > 9 ? `${target}+` : `${target}`;
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(start).toString();
        }
      }, 16);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, duration, delay]);

  return ref;
}