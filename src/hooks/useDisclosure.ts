import { useState } from "react";

type UseDisclosureOptions = boolean | undefined;
type ReturnStatement = [
  disclosure: boolean,
  {
    toggle: () => void;
    open: () => void;
    close: () => void;
  }
];
/**
 * Returns the average of two numbers.
 *
 * @param initialState default  false
 * @returns  [disclosure, {functions inside: close, open, toggle}]
 *
 */
export const useDisclosure = (
  initialState?: UseDisclosureOptions
): ReturnStatement => {
  const [disclosure, setDisclosure] = useState(initialState ?? false);

  const toggle = () => setDisclosure(!disclosure);
  const open = () => setDisclosure(true);
  const close = () => setDisclosure(false);

  return [disclosure, { close, open, toggle }];
};
