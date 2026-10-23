// Reusable debounce & throttle utilities/hooks
// src/hooks/usePerformance.js
import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Pure JS Debounce (delays execution until after `delay` ms of inactivity)
 */
export const debounce = (fn, delay = 300) => {
  let timerId;
  const debounced = (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
  debounced.cancel = () => clearTimeout(timerId);
  return debounced;
};

/**
 * Pure JS Throttle (executes immediately, then blocks subsequent calls for `limit` ms)
 */
export const throttle = (fn, limit = 1000) => {
  let inThrottle = false;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

/**
 * React Hook: Debounce a rapidly changing value (e.g., search bar or live input check)
 */
export const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * React Hook: Stable debounced callback
 */
export const useDebouncedCallback = (callback, delay = 300) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    debounce((...args) => callbackRef.current(...args), delay),
    [delay],
  );
};

/**
 * React Hook: Stable throttled callback (ideal for Submit, Login, and Resend OTP buttons)
 */
export const useThrottledCallback = (callback, limit = 1500) => {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  return useCallback(
    throttle((...args) => callbackRef.current(...args), limit),
    [limit],
  );
};
