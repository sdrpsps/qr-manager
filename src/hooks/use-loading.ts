import { useState } from "react";

/**
 * 管理 loading 状态的 hook
 * @param initialValue 初始 loading 状态，默认为 false
 * @returns [isLoading, { start, stop }] - isLoading 状态值和控制函数
 */
export function useLoading(initialValue = false) {
  const [isLoading, setIsLoading] = useState(initialValue);

  const start = () => setIsLoading(true);
  const stop = () => setIsLoading(false);

  return [isLoading, { start, stop }] as const;
}

