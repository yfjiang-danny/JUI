import { useRef } from "react";
import { BasicTarget, getTargetElement } from "./types";
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

/**
 * UseResizeObserverOptions
 *
 * callback: ResizeObserver 的回调
 *
 * target: 待监听的目标元素
 */
interface UseResizeObserverOptions {
  callback: ResizeObserverCallback;
  target: BasicTarget<HTMLElement>;
}

function useResizeObserver({
  callback: cb,
  target,
}: UseResizeObserverOptions): void {
  const observerRef = useRef<ResizeObserver | null>(null);

  // 确保 callback 是最新的
  const callbackRef = useRef<ResizeObserverCallback>(cb);
  callbackRef.current = cb;

  useIsomorphicLayoutEffect(() => {
    const element = getTargetElement(target);
    if (!element) {
      return;
    }
    observerRef.current = new ResizeObserver(callbackRef.current);
    observerRef.current.observe(element);

    return () => {
      observerRef.current?.unobserve(element);
      observerRef.current?.disconnect();
    };
  }, [target]);
}

export { useResizeObserver };
