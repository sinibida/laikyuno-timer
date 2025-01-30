import { SxProps } from "@mui/material";

/**
 * @param args array of following:
 * - array of sx object
 * - a single sx object
 * - `undefined`
 * @returns single, flattened array of sx object
 */
export default function mergeSx<T extends object>(
  ...args: Array<SxProps<T> | undefined>
): SxProps<T> {
  return args.filter((x) => x !== undefined).flat();
}
