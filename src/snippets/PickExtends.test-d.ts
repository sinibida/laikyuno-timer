import { expectTypeOf, test } from "vitest";
import {
  PickExtends,
  PickFunction,
  PickNotExtends,
  PickNotFunction,
} from "./PickExtends";

type T = {
  a: number;
  b: string;
  c: {
    ca: number;
    cb: string;
  };
  d: (x: string) => number;
};

test("PickExtends<T,P>", () => {
  expectTypeOf<PickExtends<T, number>>().toMatchTypeOf<{ a: number }>();
  expectTypeOf<PickExtends<T, string>>().toMatchTypeOf<{ b: string }>();
  expectTypeOf<PickExtends<T, object>>().toMatchTypeOf<{
    c: {
      ca: number;
      cb: string;
    };
  }>();
  expectTypeOf<PickNotExtends<T, object>>().toMatchTypeOf<{
    a: number;
    b: string;
  }>();
});

test("PickFunction<T,P>", () => {
  expectTypeOf<PickFunction<T>>().toMatchTypeOf<{ d: (x: string) => number }>();
  expectTypeOf<PickNotFunction<T>>().toMatchTypeOf<{
    a: number;
    b: string;
    c: {
      ca: number;
      cb: string;
    };
  }>();
});
