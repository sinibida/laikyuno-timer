/**
 * Leaves only the properties of T that extends P
 */
export type PickExtends<T, P> = {
  [K in keyof T as T[K] extends P ? K : never]: T[K];
};
/**
 * Leaves only the properties of T that does NOT extend P
 */
export type PickNotExtends<T, P> = {
  [K in keyof T as T[K] extends P ? never : K]: T[K];
};

type AnyFn = (...args: never[]) => unknown;
export type PickFunction<T> = PickExtends<T, AnyFn>;
export type PickNotFunction<T> = PickNotExtends<T, AnyFn>;
