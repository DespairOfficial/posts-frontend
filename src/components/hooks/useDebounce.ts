// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useDebounce(func: (...args: any) => any, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...a: unknown[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      return func(...a);
    }, delay);
  };
}
