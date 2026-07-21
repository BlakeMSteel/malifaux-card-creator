import { useLayoutEffect, useRef, type DependencyList } from "react";

interface Options {
  maxFontSize: number;
  minFontSize: number;
  step?: number;
}

// Shrinks an element's font size, starting from maxFontSize, only as far as
// needed to stop its content from overflowing its (fixed-height) box. Falls
// back to letting it overflow/scroll if it still doesn't fit at minFontSize.
export function useShrinkToFit<T extends HTMLElement>(
  deps: DependencyList,
  { maxFontSize, minFontSize, step = 0.25 }: Options,
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let size = maxFontSize;
    el.style.fontSize = `${size}px`;
    while (el.scrollHeight > el.clientHeight && size > minFontSize) {
      size = Math.max(minFontSize, size - step);
      el.style.fontSize = `${size}px`;
    }
    el.style.overflowY = el.scrollHeight > el.clientHeight ? "auto" : "hidden";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
