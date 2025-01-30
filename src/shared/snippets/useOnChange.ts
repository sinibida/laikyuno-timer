"use client";

import { DependencyList, EffectCallback, useEffect, useRef } from "react";

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
export default function useOnChange(
  effect: EffectCallback,
  deps: DependencyList,
  target: unknown
) {
  const ref = useRef(target);
  useEffect(() => {
    if (ref.current === target) {
      return;
    }
    effect();
    ref.current = target;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, ...(deps ?? []), target]);
}
