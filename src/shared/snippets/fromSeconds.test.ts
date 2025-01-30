import { describe, it, expect } from 'vitest';
import fromSeconds from './fromSeconds';
import { format } from 'date-fns';

describe('fromSeconds', () => {
  it('should provide a correct formatting', () => {
    const result = fromSeconds(98);
    expect(format(result, "mm:ss")).toEqual("01:38");
  });
});