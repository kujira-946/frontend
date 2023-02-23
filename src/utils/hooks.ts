import { useEffect, useRef } from "react";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

import { AppDispatch, RootState } from "@/store";

// Use these instead of react-redux's `useDispatch` and `useSelector`,
// as these come packed with the inferred types, found in @/store.ts.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: Function, delay: number) => {
  const savedCallback = useRef<Function>();
  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  // Set up the interval.
  useEffect(() => {
    const handler = (...args: any) => savedCallback.current?.(...args);

    if (delay !== null) {
      const id = setInterval(handler, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
