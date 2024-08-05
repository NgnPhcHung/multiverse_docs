import { useCallback, useEffect, useRef } from "react";

type CallbackFunction<Args extends unknown[] = unknown[]> = (
  ...args: Args
) => void;

function useDebouncedCallback<T extends CallbackFunction>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [delay]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay] 
  );

  return debouncedCallback;
}

export default useDebouncedCallback;
