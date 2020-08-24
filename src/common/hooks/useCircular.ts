import { useState } from 'react';

export function useCircular(size: number, initial = 0) {
  const [x, set] = useState(initial);

  return [x, () => set(t => (t + 1) % size)];
}
