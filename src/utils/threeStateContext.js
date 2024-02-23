import { createContext, useContext } from 'react';

export const threeStateContext = createContext(null);

export function useThreeStateContext(selector, eqFn) {
  const context = useContext(threeStateContext);

  if (!context) throw new Error('Ups, threeStateContext not found');

  return context(selector, eqFn);
}
