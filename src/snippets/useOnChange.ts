"use client";

import { DependencyList, useEffect, useRef } from "react";

/**
 * @param target Effect is called when this value changes.
 *
 * ---
 *
 * p.s. Add this to `eslint.config.mjs`
 * ```ts
 * rules: {
 *  "react-hooks/exhaustive-deps": [
 *    "warn",
 *    {
 *      additionalHooks: "...|useOnChange",
 *    },
 *  ],
 * },
 * ```
 */
export default function useOnChange<T>(
  effect: (before: T) => void | (() => void),
  deps: DependencyList,
  target: T
) {
  const ref = useRef(target);
  useEffect(() => {
    if (ref.current === target) {
      return;
    }
    effect(ref.current);
    ref.current = target;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, ...(deps ?? []), target]);
}
