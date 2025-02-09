"use client";

import { DependencyList, EffectCallback, useEffect, useRef } from "react";

const DELAY = 1;

/**
 * @param effect Effect is called only when it is mounted.
 *
 * ---
 *
 * p.s. Add this to `eslint.config.mjs`
 * ```ts
 * rules: {
 *  "react-hooks/exhaustive-deps": [
 *    "warn",
 *    {
 *      additionalHooks: "...|useOnMount",
 *    },
 *  ],
 * },
 * ```
 */
export default function useOnMount(
  effect: EffectCallback,
  deps: DependencyList
) {
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) {
      return;
    }
    // LATER: This seems very unsafe...
    // But it works!
    setTimeout(() => effect(), DELAY);
    ref.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect, ...deps]);
}
