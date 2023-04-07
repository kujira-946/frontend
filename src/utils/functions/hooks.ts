import { useRouter } from "next/router";
import { useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import { useSignal } from "@preact/signals-react";

import * as Constants from "@/utils/constants";
import * as Functions from "@/utils/functions";
import { SignalsStoreContext } from "@/pages/_app";
import { AppDispatch, RootState } from "@/store";
import Cookies from "js-cookie";

// Use these instead of react-redux's `useDispatch` and `useSelector`,
// as these come packed with the inferred types, found in @/store.ts.
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: Function, delay: number): void {
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
}

export function useDetectInView(
  threshold: number = 0.1,
  onlyOnce: boolean = true
) {
  const ref = useRef(null);
  const inView = useSignal(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (onlyOnce) {
          if (entry.isIntersecting) inView.value = true;
        } else {
          inView.value = entry.isIntersecting;
        }
      },
      {
        rootMargin: "0px",
        threshold,
      }
    );
    if (ref.current) observer.observe(ref.current);

    return function cleanUp(): void {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [threshold, inView]);

  return { ref, inView: inView.value };
}

export function useDetectAuthorizedUser(callback?: Function): void {
  const userId = Cookies.get("id");
  const jwtAccessToken = Cookies.get("token");
  const router = useRouter();
  useEffect(() => {
    const userNotLoggedIn = !userId && !jwtAccessToken;
    if (userNotLoggedIn) {
      router.push(Constants.ClientRoutes.LANDING);
    } else if (callback) {
      callback();
    }
  }, []);
}

export function useSignalsStore() {
  return useContext(SignalsStoreContext);
}
