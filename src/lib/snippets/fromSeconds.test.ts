import { describe, it, expect } from 'vitest';
import fromSeconds from './fromSeconds';
import { format } from 'date-fns';

describe('fromSeconds', () => {
  it('should provide a correct formatting', () => {
    const result = fromSeconds(98 + 3600 * 2);
    expect(format(result, "hh:mm:ss")).toEqual("02:01:38");
  });
});