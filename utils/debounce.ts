/**
 * Debounce utility function:
 * - Limits how often a function can be executed
 * - Ensures the function runs only after the user has stopped triggering it for a specified delay
 *
 * How it works:
 * - Each call resets the previous timer
 * - Function executes only after no new calls happen within the delay period
 *
  * Use cases:
 * - Search input API calls
 * - Live filtering / autocomplete
 * - Preventing repeated rapid events (click, resize, etc.)
 * 
 * Exmaple : 
 * <input onChange={(e) => handleSearch(e.target.value)} />
 *
 * Result:
 * - While typing, function keeps resetting
 * - API call happens only after user stops typing for 500ms
 */
export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
