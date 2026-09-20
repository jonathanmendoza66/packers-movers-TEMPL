import { useCallback, useEffect, useRef, useState } from "react";

interface AnimateOnScrollOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

interface AnimateOnScrollResult {
  ref: React.RefCallback<Element>;
  isInView: boolean;
}

export function useAnimateOnScroll(
  options: AnimateOnScrollOptions = {}
): AnimateOnScrollResult {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<Element | null>(null);

  const cleanup = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  const ref = useCallback(
    (node: Element | null) => {
      // Clean up previous observer
      cleanup();
      elementRef.current = node;

      if (!node) {
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setIsInView(true);
            if (triggerOnce) {
              cleanup();
            }
          } else if (!triggerOnce) {
            setIsInView(false);
          }
        },
        { threshold, rootMargin }
      );

      observerRef.current.observe(node);
    },
    [threshold, rootMargin, triggerOnce, cleanup]
  );

  return { ref, isInView };
}

interface CountUpOptions {
  end: number;
  duration?: number;
  start?: number;
  enabled?: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useCountUp(options: CountUpOptions): number {
  const { end, duration = 2000, start = 0, enabled = true } = options;

  const [count, setCount] = useState(start);
  const rafRef = useRef<number | null>(null);
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasRunRef.current) {
      return;
    }

    hasRunRef.current = true;
    const startTime = performance.now();
    const range = end - start;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = start + range * easedProgress;

      setCount(Math.round(currentValue));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [enabled, end, duration, start]);

  // Reset when disabled (allows re-triggering if enabled toggles)
  useEffect(() => {
    if (!enabled) {
      hasRunRef.current = false;
      setCount(start);
    }
  }, [enabled, start]);

  return count;
}
