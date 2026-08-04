import { useLayoutEffect, useRef, type DependencyList } from "react";

interface Options {
  minScale: number;
  step?: number;
}

export function useShrinkScale<T extends HTMLElement>(
  deps: DependencyList,
  { minScale, step = 0.02 }: Options,
) {
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scale = 1;
    el.style.setProperty("--shrink-scale", "1");
    while (el.scrollHeight > el.clientHeight && scale > minScale) {
      scale = Math.max(minScale, scale - step);
      el.style.setProperty("--shrink-scale", String(scale));
    }
    el.style.overflowY = el.scrollHeight > el.clientHeight ? "auto" : "hidden";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
