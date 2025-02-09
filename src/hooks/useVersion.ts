/**
 * use Vercel Dashboard to set Version (`VERSION` variable)
 *
 * @see https://www.reddit.com/r/nextjs/comments/1fzh470/comment/lr1a5x0
 */
export default function useVersion(): string {
  const version = process.env.VERSION;

  if (version === undefined) return "undefined";

  return version;
}
